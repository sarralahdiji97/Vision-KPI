import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http-service/base-http.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DashboardProd, mapToDashboardProd } from '../../models/client/dashboardProdFront';
import { ResponseApi } from '../../models/client/ResponseApi';
import { DashboardServicesURL } from '../../enums/services-url.enum';
import { PeriodTypes } from '../../enums/general.enum';
import { Period } from '../../../main/layout/production/dashboard/dashboard';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    constructor(
    private baseHttpService: BaseHttpService,
  ) { }

    public getDashboardProd(startDate: string, endDate: string, project: string, indicator: string, drillValue?:string ): Observable<DashboardProd> {
    return this.baseHttpService
      .get<ResponseApi>(`${DashboardServicesURL.Get_Prod}`, {
        queryParams: {
          Indicator:indicator,
          Project:project,
          StartDate: startDate,
          EndDate: endDate,      
          DrillValue: drillValue ? drillValue : ''
        },
      })
      .pipe(
        map((res) => {
          return mapToDashboardProd(res.data);
        }),
        catchError((error: ResponseApi) => throwError(() => error.message))
      );
  }

  
    public extractAvailablePeriods(
    startDate: string,
    endDate: string,
    intervalType: PeriodTypes
  ): Period[] {
    const start = moment(startDate);
    const end = moment(endDate);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return [];
  
    // Détermine les unités Moment à utiliser
    const boundaryUnit =
      intervalType === PeriodTypes.KW ? 'isoWeek'
      : intervalType === PeriodTypes.Month ? 'month'
      : 'year';
  
    // Unité pour avancer le curseur (isoWeek n'est pas accepté par add, on utilise week)
    const stepUnit = intervalType === PeriodTypes.KW ? 'week' : boundaryUnit as moment.unitOfTime.DurationConstructor;
  
    // Aligne le curseur sur le début de la première période
    let cursor = start.clone().startOf(boundaryUnit as moment.unitOfTime.StartOf);
  
    const periods: Period[] = [];
  
    while (cursor.isSameOrBefore(end, 'day')) {
      const periodStart = cursor.clone();
      const periodEnd = cursor.clone().endOf(boundaryUnit as moment.unitOfTime.StartOf);
  
      let name: string;
      switch (intervalType) {
        case PeriodTypes.KW:
          // GG = année ISO (évite les soucis à la frontière d'année)
          name = 'KW' + periodStart.isoWeek() + ' ' + periodStart.format('GG');
          break;
        case PeriodTypes.Month:
          name = periodStart.format('MMMM YY'); // ex: "mars 25"
          break;
        default:
          name = periodStart.format('YYYY');
          break;
      }
  
      periods.push({
        name,
        startDate: periodStart.format('YYYY/MM/DD'),
        endDate: periodEnd.format('YYYY/MM/DD'),
      });
  
      // Avance d'une période
      cursor = cursor.add(1, stepUnit).startOf(boundaryUnit as moment.unitOfTime.StartOf);
    }
  
    return periods;
  }
  
}
