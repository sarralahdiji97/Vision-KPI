import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../../../shared/services/dashboard-service/dashboard-service';
import moment from 'moment';
import { dateFormat, Modules, OverviewName, PeriodTypes } from '../../../../../shared/enums/general.enum';
import { DataChartDetail } from '../../../../../shared/models/client/dataChartDetailFront';
import { ChartOptions, Period } from '../dashboard';
import { ChartComponent } from 'ng-apexcharts';
import { MultiSelectComponent } from '../../../../../shared/components/multi-select/multi-select/multi-select/multi-select.component';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  @ViewChild('detailsChart') detailsChart!: ChartComponent;
  @ViewChild('selectedAnnee') selectedAnnee!: MultiSelectComponent;
  public detailsChartOptions!: Partial<ChartOptions>;
  public yearPeriodsFiltred!: Period[];
  public yearOfDateTime!: string;
  public drillValue!:string;
  public indicator!:string;
  public project!:string;
  public detailData:DataChartDetail[]=[];
  public selectedYear: Period | undefined;
  public yearPeriods!: Period[];
  public hasObjective!:boolean;
  public titleChart!:string;
  public titleToal!:string;
  public unit!:string;
  // KPI de la période
  public totalEff = 0;
  public totalObj = 0;
  constructor(
    private activatedRoute:ActivatedRoute,
    private dashboardService:DashboardService,
    private router:Router
  ){
    this.detailsChartOptions = {
     chart: {
        type: 'bar',
        height: 500,
        animations: {
            enabled: false
           },
           toolbar: {
           show: true,
           tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
              },
           }
       },
    
     stroke: {
    width: 0,
  },
fill: {
  type: 'solid',
  opacity: 1
},
  plotOptions: {
    bar: {
        horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
      distributed:true,
        dataLabels: {
    position:'top'
  },
    }
  },



  xaxis: {
    categories: []
  },

  /*yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
  },*/

    tooltip: {
    y: {
      formatter: (value: number) =>
        this.indicator === OverviewName.Efficience
          ? `${value}%`
          : `${value}`
    }
  },
legend: {
  show: false
},

  series: [
       {
      name: 'Efficience',
      type: 'column',
      data: []
    },
  ],
      }
  }

get ecart(): number {
  return +(this.totalEff - this.totalObj).toFixed(2);
 }
 get atteint(): boolean {
  return this.totalEff >= this.totalObj;
 }

private computeKpi(data: { value?: number; obj?: number }[]) {
  const n = data.length || 1;
  // Moyenne simple. Si le backend fournit déjà le total, utilisez-le directement.
  this.totalEff = +(data.reduce((s, d) => s + (d.value ?? 0), 0) / n).toFixed(2);
  this.totalObj = +(data.reduce((s, d) => s + (d.obj ?? 0), 0) / n).toFixed(2);
}

  ngOnInit(){
   this.activatedRoute.params.subscribe(
    (params)=>{
     this.drillValue = params['drillValue'];
     this.indicator = params['indicator'];
     this.project = params['project'];
     this.titleChart = 'Evolution ' + this.drillValue.substring(2) + ' Par KW';
     this.indicator == OverviewName.Efficience ?
       this.titleToal ='Efficience' :
     this.indicator == OverviewName.Min_Prod ?
       this.titleToal = 'Min Produite'  :
     this.indicator == OverviewName.Qty_Prod ?
       this.titleToal = 'Qté Produite' :
       this.titleToal = 'Temps d\'arrêt';    
     this.hasObjective =
        this.indicator === OverviewName.Efficience ||
        this.indicator === OverviewName.Min_Prod; 

     this.indicator == OverviewName.Efficience ? this.unit ='%' : this.unit='';   
     //-----------------------------------------
      const now = new Date();
      const availablePeriod = {
        firstDate: new Date(2026, 0, 1),
        lastDate: now
      };
      let startDate = moment(
        availablePeriod.firstDate,
        dateFormat.dateFormatIn
      ).format('YYYY/MM/DD');
      let endDate = moment(
        availablePeriod.lastDate,
        dateFormat.dateFormatIn
      ).format('YYYY/MM/DD');  
      this.yearPeriods = this.dashboardService.extractAvailablePeriods(
          startDate,
          endDate,
          PeriodTypes.Year
        ).reverse();
       this.yearOfDateTime = moment(new Date()).format('YYYY');
       this.yearPeriodsFiltred = this.yearPeriods.filter(
          (year) => year.name <= this.yearOfDateTime
        );
        this.selectedYear = this.yearPeriodsFiltred.find(
                  (year) => year.name == this.yearOfDateTime
          );    
     this.loadData(startDate, endDate,  this.indicator,this.drillValue, this.project);      
    }
   )
  }

  loadData(startDate:string, endDate:string, indicator:string, drillValue:string, project:string){
      this.dashboardService.getDashboardProd(startDate, endDate, project, indicator, drillValue).subscribe(
        (data)=>{
          switch(this.drillValue.charAt(0)){
            case 'A':
              //----------------------------------Affectation---------------------------------------
               this.detailData = data.affect as DataChartDetail[];
              break;
            case 'L':
              //-----------------------------ligne --------------------------------------------- 
              this.detailData = data.line as DataChartDetail[];
              break;
            case 'S':
              //----------------------------secteur----------------------------------------------
              this.detailData = data.sect as DataChartDetail[];
              break;
            case 'P':
              //----------------------------project----------------------------------------------
              this.detailData = data.proj as DataChartDetail[];
              break;    
          }
          this.computeKpi(data.total as DataChartDetail[])
               const unit =
                    this.indicator === OverviewName.Efficience
                      ? ' %'
                       : '';
                const tooltipValue =  this.indicator == OverviewName.Efficience ? 
                    'Efficience' : 
                     this.indicator == OverviewName.Min_Prod ?
                    'Min Produite' :
                    this.indicator == OverviewName.Qty_Prod ?
                    'Qté Produite':
                    'Temps d\'arrêt';     
               //traitement commun--------------
                const categories = this.detailData.map(x => x.name ?? '');
               // Valeur affichée au-dessus du plus haut entre la barre et le trait
              const valueLabels = this.detailData.map(item => {
                const value = item.value ?? 0;
                const obj = item.obj ?? 0;

                return {
                  x: item.name,
                  y: this.hasObjective ? Math.max(value, obj) : value,
                  marker: { size: 0 },
                  label: {
                    text: this.indicator === OverviewName.Efficience ? `${value}%` : `${value}`,
                    offsetY: -7,
                    borderWidth: 0,
                      cssClass: 'value-label-vertical',
                    style: {
                      background: 'transparent',
                      color: '#333333',
                      fontSize: '14px',
                      fontWeight: 600,
                    },
              
                  },
                };
              });

              const barColors = this.detailData.map(item => {
                    const value = item.value ?? 0;
                    const obj = item.obj ?? 0;

                    // Avec objectif
                    if (this.hasObjective) {
                      return value < obj
                        ? '#F59E0B'
                        : '#16A34A';
                    }

                    // Sans objectif
                    return '#1976D2';
                    })
                ;
             const maxData = Math.max(
              ...this.detailData.map(d => Math.max(d.value ?? 0, d.obj ?? 0))
            );
            const yMax = Math.ceil((maxData * 1.1) / 10) * 10; // +10 % arrondi à la dizaine
             this.detailsChartOptions = {
                ...this.detailsChartOptions,

                xaxis: {
                  categories: categories
                },

                yaxis: {
                ...this.detailsChartOptions.yaxis,
                min: 0,
                max: yMax,
              },
              tooltip: {
                enabled: true,

                custom: ({ series, seriesIndex, dataPointIndex, w }) => {

                  const data = this.detailData[dataPointIndex];

                  if (!data) {
                    return '';
                  }

                const value = data.value ?? 0;
                const obj = data.obj ?? 0;

              return `
                <div class="apexcharts-tooltip-custom">

                  <div class="tooltip-title">
                    ${data.name}
                  </div>

                  <div class="tooltip-row">

                    <span class="tooltip-label">
                      ${tooltipValue}
                    </span>

                    <span class="tooltip-value">
                      ${value}${unit}
                    </span>

                  </div>

                  ${
                    this.hasObjective
                      ? `
                        <div class="tooltip-row">

                          <span class="tooltip-label">
                            Objectif
                          </span>

                          <span class="tooltip-value">
                            ${obj}${unit}
                          </span>

                        </div>
                      `
                      : ''
                    }

                 </div>
                `;
               }
               },
              colors: barColors,
            /*  dataLabels: {
                enabled: false
              },*/
               // ✅ les valeurs sont maintenant des annotations
             /* annotations: {
                points: valueLabels,
              },*/
              dataLabels: {
    enabled: true,

    formatter: (value: number) => {
        return this.indicator === OverviewName.Efficience
            ? `${value}%`
            : `${value}`;
    },

    offsetY: -6,
    style: {
           colors: ['#000000'],
          fontSize: '14px',
          fontWeight: 600,
    }
},

              // place pour que le texte ne soit pas coupé en haut
              grid: {
                ...this.detailsChartOptions.grid,
                padding: {
                  ...this.detailsChartOptions.grid?.padding,
                  top: 30,
                },
              },
              series: [
                  {
                    type: 'bar',

                    data: this.detailData.map(data => {

                      const barData: any = {
                        x: data.name,
                        y: data.value,
                      };

                      // Ajouter l'objectif UNIQUEMENT
                      // pour Efficience / Min Prod

                      if (this.hasObjective) {

                        barData.goals = [
                          {
                            name: "Objectif de l'affectation",
                            value: data.obj,

                            strokeHeight: 3,
                            strokeWidth: 10,
                            strokeLineCap: 'butt',
                            strokeColor: '#ee3d3d',
                          }
                        ];

                      }

                      return barData;
                    }),
                  }
                ],
              };
        }
      )
  }

  onPeriodChange(event:any){
  this.loadData(
          event.value?.startDate as string,
          event.value?.endDate as string,
          this.indicator,
          this.drillValue,
          this.project
        );
  }

  back(){
     this.router.navigate(['/main/management/'+Modules.PRODUCTION+'/dashboard/'+this.indicator])
  }

  exportToExcel(){

  }
}
