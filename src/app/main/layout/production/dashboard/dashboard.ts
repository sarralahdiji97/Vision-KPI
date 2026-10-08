import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { dateFormat, IntervalFilterTypes, Modules, OverviewName, PeriodTypes } from '../../../../shared/enums/general.enum';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../../shared/services/dashboard-service/dashboard-service';
import { MultiSelectComponent } from '../../../../shared/components/multi-select/multi-select/multi-select/multi-select.component';
import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { DataChartDetail } from '../../../../shared/models/client/dataChartDetailFront';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  colors: any[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
  markers: ApexMarkers;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  annotations: ApexAnnotations;
};

export interface MainProject {
  id?: number;
  name: string;
}

export interface Period {
  name: string;
  startDate: string;
  endDate: string;
}
interface ObjectiveMarker {
  left: number;
  top: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @ViewChild('efficiencyOfAffectChart') efficiencyOfAffectChart!: ChartComponent;
  @ViewChild('efficiencyOfLineChart') efficiencyOfLineChart!: ChartComponent;
  @ViewChild('efficiencyOfSectChart') efficiencyOfSectChart!: ChartComponent;
  @ViewChild('efficiencyMSPEChart') efficiencyMSPEChart!: ChartComponent;
  public efficiencyOfAffectChartOptions!: Partial<ChartOptions>;
  public efficiencyOfLineChartOptions!: Partial<ChartOptions>;
  public efficiencyOfSectChartOptions!: Partial<ChartOptions>;
  public efficiencyMSPEChartOptions!: Partial<ChartOptions>;
  public selectedIntervalType: IntervalFilterTypes = IntervalFilterTypes.Day;
  public mainProjectList!:MainProject[];
  public interval = IntervalFilterTypes;
  public selectedMainProject!: MainProject;
  @ViewChild('SelectedSemaine') SelectedSemaine!: MultiSelectComponent;
  @ViewChild('selectedMois') selectedMois!: MultiSelectComponent;
  @ViewChild('selectedAnnee') selectedAnnee!: MultiSelectComponent;
  public selectedDay!: Date;
  public selectedWeek: Period | undefined;
  public selectedMonth: Period | undefined;
  public selectedYear: Period | undefined;
  public kwPeriods!: Period[];
  public monthPeriods!: Period[];
  public yearPeriods!: Period[];
  public yearPeriodsFiltred!: Period[];
  public yearOfDateTime!: string;
  public overviewName!:string;
  public titleAff!:string;
  public titleLigne!:string;
  public titleSect!:string;
  public titleProj!:string;
  public effOfAffectData:DataChartDetail[]=[];
  public effOfLineData:DataChartDetail[]=[];
  public effOfSectData:DataChartDetail[]=[];
  public effMSPEData:DataChartDetail[]=[];
 private lastClickTime = 0;
 public hasObjective!:boolean;
 public objectiveMarkers: ObjectiveMarker[] = [];
 public indicatorName!:string;

 constructor(  
  private activatedRoute: ActivatedRoute,
  private dashboardService: DashboardService,
  private router:Router,
  private cdr: ChangeDetectorRef

){

this.efficiencyOfAffectChartOptions = {
 chart: {
    type: 'bar',
      events: {
            dataPointSelection: (event, chartContext, config) => {
            const index = config?.dataPointIndex;
            const selectedData = this.effOfAffectData[index as number];
            const now = Date.now();
            if (now - this.lastClickTime < 300) {
                    // DOUBLE CLICK
                    this.onBarClick(selectedData, 'A');
             }
            this.lastClickTime = now;
          },
        },
     animations: {
      enabled: false
    },
    height: 500,
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
        this.overviewName === OverviewName.Efficience
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
  this.efficiencyOfLineChartOptions = {
 chart: {
    type: 'bar',
        events: {
            dataPointSelection: (event, chartContext, config) => {
            const index = config?.dataPointIndex;
            const selectedData = this.effOfLineData[index as number];
            const now = Date.now();
            if (now - this.lastClickTime < 300) {
                    // DOUBLE CLICK
                    this.onBarClick(selectedData, 'L');
             }
            this.lastClickTime = now;
          }
        },
      animations: {
      enabled: false
    },
       height: 500,
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

    tooltip: {
    y: {
      formatter: (value: number) =>
        this.overviewName === OverviewName.Efficience
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
  this.efficiencyOfSectChartOptions = {
 chart: {
    type: 'bar',
        events: {
            dataPointSelection: (event, chartContext, config) => {
            const index = config?.dataPointIndex;
            const selectedData = this.effOfSectData[index as number];
            const now = Date.now();
            if (now - this.lastClickTime < 300) {
                    // DOUBLE CLICK
                    this.onBarClick(selectedData, 'S');
             }
            this.lastClickTime = now;
          }
        },
    animations: {
      enabled: false
    },
    height: 500,
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

    tooltip: {
    y: {
      formatter: (value: number) =>
        this.overviewName === OverviewName.Efficience
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
  this.efficiencyMSPEChartOptions = {
 chart: {
    type: 'bar',
        events: {
            dataPointSelection: (event, chartContext, config) => {
            const index = config?.dataPointIndex;
            const selectedData = this.effMSPEData[index as number];
            const now = Date.now();
            if (now - this.lastClickTime < 300) {
                    // DOUBLE CLICK
                    this.onBarClick(selectedData, 'P');
             }
            this.lastClickTime = now;
          }
        },
    animations: {
      enabled: false
    },
    height: 500,
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

    tooltip: {
    y: {
      formatter: (value: number) =>
        this.overviewName === OverviewName.Efficience
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

 ngOnInit(){
  this.mainProjectList = [
  {
    id: 1,
    name: 'MSPE'
  },
  {
    id: 2,
    name: 'BX8'
  },
  {
    id: 3,
    name: 'M282',
  },
];
   this.activatedRoute.params.subscribe(params=>{
   this.overviewName = params['indicator'];
   this.hasObjective =
        this.overviewName === OverviewName.Efficience ||
        this.overviewName === OverviewName.Min_Prod;    
        this.indicatorName =  this.overviewName == OverviewName.Efficience ? 
                    'l\'efficience' : 
                     this.overviewName == OverviewName.Min_Prod ?
                    'Min Produite' :
                    this.overviewName == OverviewName.Qty_Prod ?
                    'Qté Produite':
                    'Temps d\'arrêt';   
   // Réinitialiser le projet à chaque changement d'indicator
   this.selectedMainProject =
   this.mainProjectList.find(x => x.name === 'MSPE')!;
   this.getAvailablePeriods(this.selectedMainProject.name, this.overviewName)

 })
 }

  onBarClick(data:any, graph:string){    
      this.router.navigate(['/main/management/'+Modules.PRODUCTION+'/dashboard/'+this.overviewName+'/details/'+graph+':'+data.name+'/'+this.selectedMainProject.name])
  }

  private getAvailablePeriods(mainProject:string, indicator:string) {    
    this.selectedIntervalType = IntervalFilterTypes.Day;
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
        this.monthPeriods = this.dashboardService.extractAvailablePeriods(
          startDate,
          endDate,
          PeriodTypes.Month
        ).reverse();
        this.kwPeriods = this.dashboardService.extractAvailablePeriods(
          startDate,
          endDate,
          PeriodTypes.KW
        ).reverse();
        this.yearPeriods = this.dashboardService.extractAvailablePeriods(
          startDate,
          endDate,
          PeriodTypes.Year
        ).reverse();
        //Add the filter to remove the year if higher than current year
        this.yearOfDateTime = moment(new Date()).format('YYYY');
        this.yearPeriodsFiltred = this.yearPeriods.filter(
          (year) => year.name <= this.yearOfDateTime
        );
        this.selectedDay = new Date(endDate);
        this.selectedWeek = this.kwPeriods.find(
          (week) =>
            week.name ==
            'KW' +
              moment(this.selectedDay).add(1, PeriodTypes.Day).isoWeek() +
              ' ' +
              moment(this.selectedDay).format('YY')
        );
        this.selectedMonth = this.monthPeriods.find(
          (month) => month.name == moment(this.selectedDay).format('MMMM YY')
        );
        this.selectedYear = this.yearPeriodsFiltred.find(
          (year) => year.name == moment(this.selectedDay).format('YYYY')
        );        
        const yesterday = moment().subtract(1, 'day').toDate();
        this.selectedDay = yesterday;
        this.loadData(
          moment(yesterday).format('YYYY/MM/DD'),
          moment(yesterday).format('YYYY/MM/DD'),
          mainProject,
          indicator
        );
  }

    private loadData(
    startDate: string,
    endDate: string,
    mainProj: string,
    indicator:string
  ) {
   this.dashboardService.getDashboardProd(startDate, endDate, mainProj, indicator).subscribe(
    (dashboardData)=>{
               const unit =
                    this.overviewName === OverviewName.Efficience
                      ? ' %'
                      : '';
               const tooltipValue =  this.overviewName == OverviewName.Efficience ? 
                    'Efficience' : 
                     this.overviewName == OverviewName.Min_Prod ?
                    'Min Produite' :
                    this.overviewName == OverviewName.Qty_Prod ?
                    'Qté Produite':
                    'Temps d\'arrêt';       

          // ----------------------- Efficiency Of Affectation ---------------------------

          this.effOfAffectData =
            dashboardData.affect as DataChartDetail[];

           this.overviewName === OverviewName.Efficience
                  ? this.titleAff = 'Efficience Par Affectation'
                  : this.overviewName === OverviewName.Min_Prod
                    ? this.titleAff = 'Min Produite Par Affectation'
                    : this.overviewName === OverviewName.Qty_Prod
                      ? this.titleAff ='Qté Produite Par Affectation'
                      : this.titleAff = 'Temps d’arrêt Par Affectation';

          const categories = this.effOfAffectData.map(item => [
            item.name
          ]);

          // Valeur affichée au-dessus du plus haut entre la barre et le trait
          const valueLabels = this.effOfAffectData.map(item => {
            const value = item.value ?? 0;
            const obj = item.obj ?? 0;

            return {
              x: item.name,
              y: this.hasObjective ? Math.max(value, obj) : value,
              marker: { size: 0 ,  strokeWidth: 0, fillColor: 'transparent', strokeColor: 'transparent'},
              label: {
                text: this.overviewName === OverviewName.Efficience ? `${value}%` : `${value}`,
                offsetY: -6,
                borderWidth: 0,
                style: {
                  background: 'transparent',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 600,
                },
              },
            };
          });

          const barColors = this.effOfAffectData.map(item => {
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
        const maxDataAff = Math.max(
          ...this.effOfAffectData.map(d => Math.max(d.value ?? 0, d.obj ?? 0))
        );
        const yMaxAff = Math.ceil((maxDataAff * 1.1) / 10) * 10; // +10 % arrondi à la dizaine
          this.efficiencyOfAffectChartOptions = {

            ...this.efficiencyOfAffectChartOptions,

              xaxis: {
                ...this.efficiencyOfAffectChartOptions.xaxis,
               categories: categories,
              },
              yaxis: {
                ...this.efficiencyOfAffectChartOptions.yaxis,
                min: 0,
                max: yMaxAff,
              },
              tooltip: {
                enabled: true,

                custom: ({ series, seriesIndex, dataPointIndex, w }) => {

                  const data = this.effOfAffectData[dataPointIndex];

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
              dataLabels: {
                enabled: false
              },
               // ✅ les valeurs sont maintenant des annotations
              annotations: {
                points: valueLabels,
              },

              // place pour que le texte ne soit pas coupé en haut
              grid: {
                ...this.efficiencyOfAffectChartOptions.grid,
                padding: {
                  ...this.efficiencyOfAffectChartOptions.grid?.padding,
                  top: 30,
                },
              },
              series: [
                  {
                    type: 'bar',

                    data: this.effOfAffectData.map(data => {

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

                            strokeHeight: 4,
                            strokeWidth: 17,
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

          //----------------------------------Efficiency Of Ligne------------------------------------
            this.effOfLineData = dashboardData.line as DataChartDetail[];

            this.overviewName === OverviewName.Efficience
                  ? this.titleLigne = 'Efficience Par Ligne'
                  : this.overviewName === OverviewName.Min_Prod
                    ? this.titleLigne = 'Min Produite Par Ligne'
                    : this.overviewName === OverviewName.Qty_Prod
                      ? this.titleLigne ='Qté Produite Par Ligne'
                      : this.titleLigne = 'Temps d’arrêt Par Ligne';
                      
            const categoriesLine = this.effOfLineData.map(x => x.name ?? '');
          // Valeur affichée au-dessus du plus haut entre la barre et le trait
          const valueLabelsLigne = this.effOfLineData.map(item => {
            const value = item.value ?? 0;
            const obj = item.obj ?? 0;

            return {
              x: item.name,
              y: this.hasObjective ? Math.max(value, obj) : value,
              marker: { size: 0, strokeWidth: 0, fillColor: 'transparent', strokeColor: 'transparent'},
              label: {
                text: this.overviewName === OverviewName.Efficience ? `${value}%` : `${value}`,
                offsetY: -6,
                borderWidth: 0,
                style: {
                  background: 'transparent',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 600,
                },
              },
            };
          });

          const barColorsLigne = this.effOfLineData.map(item => {

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
            const maxDataLine = Math.max(
              ...this.effOfLineData.map(d => Math.max(d.value ?? 0, d.obj ?? 0))
            );
            const yMaxLine = Math.ceil((maxDataLine * 1.1) / 10) * 10; // +10 % arrondi à la dizaine
            this.efficiencyOfLineChartOptions = {
                ...this.efficiencyOfLineChartOptions,

               xaxis: {
                ...this.efficiencyOfLineChartOptions.xaxis,
               categories: categoriesLine,
              },
              yaxis: {
                ...this.efficiencyOfLineChartOptions.yaxis,
                min: 0,
                max: yMaxLine,
              },

               tooltip: {
                enabled: true,

                custom: ({ series, seriesIndex, dataPointIndex, w }) => {

                  const data = this.effOfLineData[dataPointIndex];

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
              colors: barColorsLigne,
              dataLabels: {
                enabled: false
              },
               // ✅ les valeurs sont maintenant des annotations
              annotations: {
                points: valueLabelsLigne,
              },

              // place pour que le texte ne soit pas coupé en haut
              grid: {
                ...this.efficiencyOfLineChartOptions.grid,
                padding: {
                  ...this.efficiencyOfLineChartOptions.grid?.padding,
                  top: 30,
                },
              },
                  series: [
                  {
                    type: 'bar',

                    data: this.effOfLineData.map(data => {

                      const barData: any = {
                        x: data.name,
                        y: data.value,
                      };

                      // Ajouter l'objectif UNIQUEMENT
                      // pour Efficience / Min Prod

                      if (this.hasObjective) {

                        barData.goals = [
                          {
                            name: "Objectif de ligne",
                            value: data.obj,

                            strokeHeight: 4,
                            strokeWidth: 20,
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
           //-------------------------------------Efficiency Of Secteur---------------------------
            this.effOfSectData = dashboardData.sect as DataChartDetail[];

            
            this.overviewName === OverviewName.Efficience
                  ? this.titleSect = 'Efficience Par Secteur'
                  : this.overviewName === OverviewName.Min_Prod
                    ? this.titleSect = 'Min Produite Par Secteur'
                    : this.overviewName === OverviewName.Qty_Prod
                      ? this.titleSect ='Qté Produite Par Secteur'
                      : this.titleSect = 'Temps d’arrêt Par Secteur';

           const categoriesSect = this.effOfSectData.map(x => x.name ?? '');

           // Valeur affichée au-dessus du plus haut entre la barre et le trait
           const valueLabelsSect = this.effOfSectData.map(item => {
            const value = item.value ?? 0;
            const obj = item.obj ?? 0;

            return {
              x: item.name,
              y: this.hasObjective ? Math.max(value, obj) : value,
              marker: { size: 0, strokeWidth: 0, fillColor: 'transparent', strokeColor: 'transparent' },
              label: {
                text: this.overviewName === OverviewName.Efficience ? `${value}%` : `${value}`,
                offsetY: -6,
                borderWidth: 0,
                style: {
                  background: 'transparent',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 600,
                },
              },
            };
          });

          const barColorsSect = this.effOfSectData.map(item => {

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
            const maxDataSect = Math.max(
              ...this.effOfSectData.map(d => Math.max(d.value ?? 0, d.obj ?? 0))
            );
            const yMaxSect = Math.ceil((maxDataSect * 1.1) / 10) * 10; // +10 % arrondi à la dizaine
            this.efficiencyOfSectChartOptions = {
                ...this.efficiencyOfSectChartOptions,

                xaxis: {
                  categories: categoriesSect
                },
                yaxis: {
                  ...this.efficiencyOfSectChartOptions.yaxis,
                  min: 0,
                  max: yMaxSect,
                },
              tooltip: {
                enabled: true,

                custom: ({ series, seriesIndex, dataPointIndex, w }) => {

                  const data = this.effOfSectData[dataPointIndex];

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
              colors: barColorsSect,
              dataLabels: {
                enabled: false
              },
               // ✅ les valeurs sont maintenant des annotations
              annotations: {
                points: valueLabelsSect,
              },

              // place pour que le texte ne soit pas coupé en haut
              grid: {
                ...this.efficiencyOfSectChartOptions.grid,
                padding: {
                  ...this.efficiencyOfSectChartOptions.grid?.padding,
                  top: 30,
                },
              },
                  series: [
                  {
                    type: 'bar',

                    data: this.effOfSectData.map(data => {

                      const barData: any = {
                        x: data.name,
                        y: data.value,
                      };

                      // Ajouter l'objectif UNIQUEMENT
                      // pour Efficience / Min Prod

                      if (this.hasObjective) {

                        barData.goals = [
                          {
                            name: "Objectif de ligne",
                            value: data.obj,

                            strokeHeight: 4,
                            strokeWidth: 24,
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

           //----------------------------------Efficiency MSPE---------------------------
            this.effMSPEData = dashboardData.proj as DataChartDetail[];

            
            this.overviewName === OverviewName.Efficience
                  ? this.titleProj = 'Efficience MSPE'
                  : this.overviewName === OverviewName.Min_Prod
                    ? this.titleProj = 'Min Produite MSPE'
                    : this.overviewName === OverviewName.Qty_Prod
                      ? this.titleProj ='Qté Produite MSPE'
                      : this.titleProj = 'Temps d’arrêt MSPE';

            const categoriesProj = this.effMSPEData.map(x => x.name ?? '');

            // Valeur affichée au-dessus du plus haut entre la barre et le trait
            const valueLabelsProj = this.effMSPEData.map(item => {
            const value = item.value ?? 0;
            const obj = item.obj ?? 0;

            return {
              x: item.name,
              y: this.hasObjective ? Math.max(value, obj) : value,
              marker: { size: 0, strokeWidth: 0, fillColor: 'transparent', strokeColor: 'transparent' },
              label: {
                text: this.overviewName === OverviewName.Efficience ? `${value}%` : `${value}`,
                offsetY: -6,
                borderWidth: 0,
                style: {
                  background: 'transparent',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 600,
                },
              },
            };
          });

          const barColorsProj = this.effMSPEData.map(item => {

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
              ...this.effMSPEData.map(d => Math.max(d.value ?? 0, d.obj ?? 0))
            );
            const yMax = Math.ceil((maxData * 1.1) / 10) * 10; // +10 % arrondi à la dizaine
            this.efficiencyMSPEChartOptions = {
                ...this.efficiencyMSPEChartOptions,

                xaxis: {
                  categories: categoriesProj
                },
                yaxis: {
                  ...this.efficiencyMSPEChartOptions.yaxis,
                  min: 0,
                  max: yMax,
                },
                 tooltip: {
                enabled: true,

                custom: ({ series, seriesIndex, dataPointIndex, w }) => {

                  const data = this.effMSPEData[dataPointIndex];

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
              colors: barColorsProj,
              dataLabels: {
                enabled: false
              },
               // ✅ les valeurs sont maintenant des annotations
              annotations: {
                points: valueLabelsProj,
              },

              // place pour que le texte ne soit pas coupé en haut
              grid: {
                ...this.efficiencyMSPEChartOptions.grid,
                padding: {
                  ...this.efficiencyMSPEChartOptions.grid?.padding,
                  top: 30,
                },
              },
              series: [
                  {
                    type: 'bar',

                    data: this.effMSPEData.map(data => {

                      const barData: any = {
                        x: data.name,
                        y: data.value,
                      };

                      // Ajouter l'objectif UNIQUEMENT
                      // pour Efficience / Min Prod

                      if (this.hasObjective) {

                        barData.goals = [
                          {
                            name: "Objectif de ligne",
                            value: data.obj,

                            strokeHeight: 4,
                            strokeWidth: 40,
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
            this.cdr.detectChanges();

    })

  }

  public onIntervalTypeChange(event:any) {
     setTimeout(() => {
    switch (event.value) {
      case IntervalFilterTypes.Day:
          this.loadData(
            moment(this.selectedDay).format('YYYY/MM/DD'),
            moment(this.selectedDay).format('YYYY/MM/DD'),
            this.selectedMainProject.name,
            this.overviewName
          );
        break;
      case IntervalFilterTypes.KW:
        let selectedweek = this.SelectedSemaine['formControl'].value;        
        if (this.selectedWeek) {
            this.loadData(
              selectedweek?.startDate as string,
              selectedweek?.endDate as string,
              this.selectedMainProject.name,
              this.overviewName
            );
        }
        break;
      case IntervalFilterTypes.Month:
        let selectedMonth = this.selectedMois['formControl'].value;
        if (this.selectedMonth) {
            this.loadData(
              selectedMonth?.startDate as string,
              selectedMonth?.endDate as string,
              this.selectedMainProject.name,
             this.overviewName
            );
        }
        break;
      default:
        let selectedYear = this.selectedAnnee['formControl'].value;
        if (this.selectedYear) {
            this.loadData(
              selectedYear?.startDate as string,
              selectedYear?.endDate as string,
              this.selectedMainProject.name,
              this.overviewName
            );
        }
        break;
    }
    }, 0);
  }

   public onMainProjectChange(event:any) {
        this.selectedMainProject = event.value;
      switch (this.selectedIntervalType) {
      case IntervalFilterTypes.Day:
          this.loadData(
            moment(this.selectedDay).format('YYYY/MM/DD'),
            moment(this.selectedDay).format('YYYY/MM/DD'),
            this.selectedMainProject.name,
            this.overviewName
          );
        break;
      case IntervalFilterTypes.KW:
        let selectedweek = this.SelectedSemaine['formControl'].value;
        if (this.selectedWeek) {          
            this.loadData(
              selectedweek?.startDate as string,
              selectedweek?.endDate as string,
              this.selectedMainProject.name,
            this.overviewName
            );
          }
       // }
        break;
      case IntervalFilterTypes.Month:
        let selectedMonth = this.selectedMois['formControl'].value;        
        if (this.selectedMonth) {
          if (this.selectedWeek) {
              this.loadData(
                selectedMonth?.startDate as string,
                selectedMonth?.endDate as string,
                this.selectedMainProject.name,
                this.overviewName
              );
          }
        }
        break;
      default:
        let selectedYear = this.selectedAnnee['formControl'].value;
        if (this.selectedYear) {
            this.loadData(
              selectedYear?.startDate as string,
              selectedYear?.endDate as string,
              this.selectedMainProject.name,
             this.overviewName
            );
        }
        break;
    }
  }

  public onPeriodChange(event:any, intervalFilterType: IntervalFilterTypes) { 
    if (
      this.selectedIntervalType == intervalFilterType &&
      intervalFilterType == IntervalFilterTypes.Day
    ) {
        this.loadData(
          moment(event).format('YYYY/MM/DD'),
          moment(event).format('YYYY/MM/DD'),
          this.selectedMainProject.name,
          this.overviewName
        );
    }
    if (
      this.selectedIntervalType == intervalFilterType &&
      intervalFilterType != IntervalFilterTypes.Day
    ) {
        this.loadData(
          event.value?.startDate as string,
          event.value?.endDate as string,
          this.selectedMainProject.name,
          this.overviewName
        );
    //  }
    }
  }
}
