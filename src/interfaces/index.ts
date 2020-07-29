export interface LogNerusApi {
  lvl_log: string,
  log: string | object,
  endpoint?: string,
  api_version: string,
  date: string,
}
  
export interface DataLog {
  res?: any;
  result?: object | string;
  status?: number;
  query?: string;
  report?: string | object;
  version?: string;
  endpointApi?: string;
}