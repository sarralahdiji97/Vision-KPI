// For App version in navBar component
export const version = '1.0.0';

// For Material Date Picker Format 'DD/MM/YYYY'
export const MY_DATE_FORMAT = {
    parse: {
      dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
      dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    }
  };
  export enum dateFormat {
    dateFormatIn = 'DD/MM/YYYY',
    dateFormatInWithTime = 'DD/MM/YYYY hh:mm:ss',
    dateFormatOut = 'YYYYMMDD',
    dateFormatOut2 = 'YYYY-MM-DD'
  }

  export enum LocalStorageKeys {
    TOKEN = 'VIS-KPI-TOKEN',
    GRID_FILTER = 'KANBAN-GRID-FILTER'
  }

  export enum AgGridCellColors {
    Warning = "#ffeb3b75",
    Failed = "#f443364f",
    Success = "#2cd52c47",
    Blue = "#3BB7FF75"
  }

    export enum Modules{
    PRODUCTION = 'Vision-Prod',
    QUALITY= 'Vision-QM',
    LOGISTIC = 'Vision-Logistic',
    RH = 'Vision-RH',
    MAINTENANCE = 'Vision-Maintenance',
    STOCK = 'Vision-Stock',
    ACHAT = 'Vision-Purchase',
    FACTURATION='Vision-Fact',
  }

  export enum OverviewName{
    Efficience='Efficiency',
    Min_Prod='MinProd',
    Qty_Prod='QtyProd',
    Temps_Arret='Downtime'
  }

    export enum ServiceCode {
    Production = 'Production',
    PPS ='PPS'
  }

    export enum UserRole {
    Admin = 1,
    SuperVisor = 2,
    Agent = 3,
  }
  
  export enum IntervalFilterTypes {
  Day = 1,
  KW = 2,
  Month = 3,
  Quarter = 4,
  Year = 5,
}

export enum PeriodTypes {
  Day = "days",
  KW = "weeks",
  Month = "months",
  Quarter = "quarters",
  Year = "years",
}

export const AllServices: ServiceCode[] = [
ServiceCode.Production, ServiceCode.PPS];