import { DataChartDetailFront } from "../backend/dataChartDetailFront";
import { DowntimeCauseDetail, mapToDowntimeCauseDetail } from "./downtimeCauseDetail";

export interface DataChartDetail { 
    name: string;
    value: number;
    obj: number;
    details?: DowntimeCauseDetail[];
}

export function mapToDataChartDetail(data: DataChartDetailFront): DataChartDetail {
    return {
      name: data.name,
      value: data.value,
      obj:data.obj,
      details: data && data.details && data.details.length && data.details.map(x => mapToDowntimeCauseDetail(x)) || [],
    };
  }