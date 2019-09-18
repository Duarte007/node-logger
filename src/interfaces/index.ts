export interface LogNerusApi{
    lvlLog: string,
    log: string
  }
  
  export interface DataLog{
    res?:any,
    result?:string|object,
    status?:number,
    query?:string,
    report?:string|object
  }