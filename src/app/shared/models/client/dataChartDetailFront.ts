import { DataChartDetailFront } from "../backend/dataChartDetailFront";

export interface DataChartDetail { 
    name: string;
    value: number;
    obj: number;
}

export function mapToDataChartDetail(data: DataChartDetailFront): DataChartDetail {
    return {
      name: data.name,
      value: data.value,
      obj:data.obj
    };
  }