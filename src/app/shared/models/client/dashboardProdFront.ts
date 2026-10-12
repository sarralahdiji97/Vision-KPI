import { DashboardProdFront } from "../backend/dashboardProdFront";
import { DataChartDetail, mapToDataChartDetail } from "./dataChartDetailFront";

export interface DashboardProd { 
    affect?: DataChartDetail[];
    line?: DataChartDetail[];  
    sect?: DataChartDetail[];
    proj?: DataChartDetail[];
    total?: DataChartDetail[];
    byWeek?: DataChartDetail[];
    byMonth?: DataChartDetail[];
}

export function mapToDashboardProd(data: DashboardProdFront): DashboardProd {
    return {
       affect: data && data.affect && data.affect.length && data.affect.map(x => mapToDataChartDetail(x)) || [],
       line: data && data.line && data.line.length && data.line.map(x => mapToDataChartDetail(x)) || [],
       sect: data && data.sect && data.sect.length && data.sect.map(x => mapToDataChartDetail(x)) || [],
       proj: data && data.proj && data.proj.length && data.proj.map(x => mapToDataChartDetail(x)) || [],
       total: data && data.total && data.total.length && data.total.map(x => mapToDataChartDetail(x)) || [],
       byWeek: data && data.byWeek && data.byWeek.length && data.byWeek.map(x => mapToDataChartDetail(x)) || [],
       byMonth: data && data.byMonth && data.byMonth.length && data.byMonth.map(x => mapToDataChartDetail(x)) || [],
    }
}