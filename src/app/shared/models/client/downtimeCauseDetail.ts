import { DowntimeCauseDetailFront } from "../backend/downtimeCauseDetail";

export interface DowntimeCauseDetail { 
    cause?: string;
    label?: string;
    service?: string;
    causeType?:string;
    duration?:number;
}
export function mapToDowntimeCauseDetail(data: DowntimeCauseDetailFront): DowntimeCauseDetail {
    return {
      cause: data.cause,
      label: data.label,
      service:data.service,
      causeType:data.causeType,
      duration:data.duration
    };
  }