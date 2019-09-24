export interface LogNerusApi{
  lvlLog: string,
  log: string,
  endpoint?:string
}
  
export interface DataLog {
  res?: any;
  result?: object | string;
  status?: number;
  query?: string;
  report?: string | object;
} 