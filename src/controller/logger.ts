import {knexLOG} from '../config/database';
import {LogNerusApi, DataLog} from '../interfaces';
import moment from 'moment';

class Logger{
    
    public readonly ERROR_LOG = 'ERROR';
    public readonly DEBUG_LOG = 'DEBUG';
    public readonly INFO_LOG = 'INFO';
    public readonly FULL_LOG = 'FULL';
    public readonly WARN_LOG = 'WARN';
    public readonly REGISTER_IN_DB = 0;
    public readonly REGISTER_IN_CONSOLE = 1;
    public readonly REGISTER_IN_BOTH = 2;
    private readonly tableName:string;

    public constructor(tableName:string){
        this.tableName = tableName || "systemLog";
    };

    public error(dataLog:DataLog, registerIn:number = this.REGISTER_IN_DB){
        const data = this.buildDataLog(dataLog, this.ERROR_LOG);
        this.registerLog(registerIn, data);
    };

    public warn(dataLog:DataLog, registerIn:number = this.REGISTER_IN_DB){
        if(this.WARN_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL'){
            const data = this.buildDataLog(dataLog, this.WARN_LOG);
            this.registerLog(registerIn, data);
        }
    };

    public info(dataLog:DataLog, registerIn:number = this.REGISTER_IN_DB){
        if(this.INFO_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL'){
            const data = this.buildDataLog(dataLog, this.INFO_LOG);
            this.registerLog(registerIn, data);
        }
    };

    public debug(dataLog:DataLog, registerIn:number = this.REGISTER_IN_DB){
        if(this.DEBUG_LOG === process.env.LVL_LOG || process.env.LVL_LOG === 'FULL'){
            const data = this.buildDataLog(dataLog, this.DEBUG_LOG);
            this.registerLog(registerIn, data);
        }
    };

    private buildDataLog = (dataLog:DataLog, levelLog:string):LogNerusApi => {
        let {res, result, status, query, report} = dataLog; 
        let infoLog = {};
        let endpoint = "";
        infoLog={date: moment().format('DD/MM/YYYY HH:mm:ss')};
        if(res){
            let { originalUrl } = res.req;
            const infoApi = {
                userId: res.req.userId ? res.req.userId : 0,
                method: res.req.method,
                endpoint: originalUrl
            };
            endpoint = originalUrl;
            infoLog = {...infoLog, ...infoApi};
        }

        if(result){
            const response = {
                response: (typeof result == 'object' && result.hasOwnProperty('stack')) ? result.toString() : JSON.stringify(result)
            };
            infoLog = {...infoLog, ...response};
        }

        if(status){
            infoLog = {...infoLog, status};
        }

        if(query){
            infoLog = {...infoLog, query};
        }

        if(report){
            const fullReport = {
                report: JSON.stringify(report)
            };
            infoLog = {...infoLog, ...fullReport};
        }

        if(endpoint !== ""){
            const data = {
                lvlLog: levelLog,
                log: JSON.stringify(infoLog),
                endpoint
            };

            return data;
        }

        const data = {
            lvlLog: levelLog,
            log: JSON.stringify(infoLog),
        };

        return data;
    };

    public registerLog(registerIn: number, data: LogNerusApi){
        if(registerIn === 0){
            this.saveLogInDataBase(data, this.tableName);
        } else if(registerIn === 1){
            this.saveLogInConsole(data);
        } else {
            this.saveLogInConsole(data);
            this.saveLogInDataBase(data, this.tableName);
        }
    };

    public saveLogInDataBase(data:LogNerusApi, tableName:string){
        knexLOG(tableName)
        .insert(data)
        .then( success => {
            console.log("Log salvo com sucesso!");
            console.log(success);
        }).catch( error => {
            console.log("Error ao salvar log.");
            console.log(error);
        });
    };

    public saveLogInConsole(data:LogNerusApi){
        console.log('======== LOG ========');
        console.log(data);
    };

}

export default Logger;