import { DashboardProdFront } from "../backend/dashboardProdFront";
import { DataChartDetail, mapToDataChartDetail } from "./dataChartDetailFront";

export interface DashboardProd { 
    affect?: DataChartDetail[];
    line?: DataChartDetail[];  
    sect?: DataChartDetail[];
    proj?: DataChartDetail[];
    total?: DataChartDetail[];
}

export function mapToDashboardProd(data: DashboardProdFront): DashboardProd {
    return {
       affect: data && data.affect && data.affect.length && data.affect.map(x => mapToDataChartDetail(x)) || [],
       line: data && data.line && data.line.length && data.line.map(x => mapToDataChartDetail(x)) || [],
       sect: data && data.sect && data.sect.length && data.sect.map(x => mapToDataChartDetail(x)) || [],
       proj: data && data.proj && data.proj.length && data.proj.map(x => mapToDataChartDetail(x)) || [],
       total: data && data.total && data.total.length && data.total.map(x => mapToDataChartDetail(x)) || [],
    }
}