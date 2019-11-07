import config from '../config';
import { knexLOG } from '../config/database';
import { LogNerusApi, DataLog } from '../interfaces';
import moment from 'moment-timezone';

class Logger {
  public readonly ERROR_LOG = 'ERROR';
  public readonly DEBUG_LOG = 'DEBUG';
  public readonly INFO_LOG = 'INFO';
  public readonly FULL_LOG = 'FULL';
  public readonly WARN_LOG = 'WARN';

  public readonly REGISTER_IN_DB = 0;
  public readonly REGISTER_IN_CONSOLE = 1;
  public readonly REGISTER_IN_BOTH = 2;

  private readonly YELLOW = '\x1b[33m%s\x1b[0m';
  private readonly RED = '\x1b[31m%s\x1b[0m';
  private readonly GREEN = '\x1b[32m%s\x1b[0m';

  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName || 'systemLog';
  }

  public async error(dataLog: DataLog, registerIn: number = this.REGISTER_IN_DB) {
    const data = this.buildDataLog(dataLog, this.ERROR_LOG);
    await this.registerLog(registerIn, data);
  }

  public async warn(dataLog: DataLog, registerIn: number = this.REGISTER_IN_DB) {
    if (this.WARN_LOG === config.levelLog || config.levelLog === 'FULL') {
      const data = this.buildDataLog(dataLog, this.WARN_LOG);
      await this.registerLog(registerIn, data);
    }
  }

  public async info(dataLog: DataLog, registerIn: number = this.REGISTER_IN_DB) {
    if (this.INFO_LOG === config.levelLog || config.levelLog === 'FULL') {
      const data = this.buildDataLog(dataLog, this.INFO_LOG);
      await this.registerLog(registerIn, data);
    }
  }

  public async debug(dataLog: DataLog, registerIn: number = this.REGISTER_IN_DB) {
    if (this.DEBUG_LOG === config.levelLog || config.levelLog === 'FULL') {
      const data = this.buildDataLog(dataLog, this.DEBUG_LOG);
      await this.registerLog(registerIn, data);
    }
  }

  private buildDataLog = (dataLog: DataLog, levelLog: string): LogNerusApi => {
    let { res, result, status, query, report } = dataLog;
    let infoLog = {};
    let endpoint = '';
    infoLog = { date: moment().tz(config.timezone).format('DD/MM/YYYY HH:mm:ss') };
    if (res) {
      let { originalUrl } = res.req;
      const infoApi = {
        userId: res.req.userId ? res.req.userId : 0,
        method: res.req.method,
        endpoint: originalUrl
      };
      endpoint = originalUrl;
      infoLog = { ...infoLog, ...infoApi };
    }

    if (result) {
      const response = {
        response:
          typeof result == 'object' && result.hasOwnProperty('stack') ? result.toString() : JSON.stringify(result)
      };
      infoLog = { ...infoLog, ...response };
    }

    if (status) {
      infoLog = { ...infoLog, status };
    }

    if (query) {
      infoLog = { ...infoLog, query };
    }

    if (report) {
      const fullReport = {
        report: report
      };
      infoLog = { ...infoLog, ...fullReport };
    }

    if (endpoint !== '') {
      const data = {
        lvlLog: levelLog,
        log: infoLog,
        endpoint
      };

      return data;
    }

    const data = {
      lvlLog: levelLog,
      log: infoLog
    };

    return data;
  };

  public async registerLog(registerIn: number, data: LogNerusApi) {
    if (registerIn === 0) {
      await this.saveLogInDataBase(this.stringifyData(data), this.tableName);
    } else if (registerIn === 1) {
      this.saveLogInConsole(data);
    } else {
      this.saveLogInConsole(data);
      await this.saveLogInDataBase(this.stringifyData(data), this.tableName);
    }
  }

  public async saveLogInDataBase(data: LogNerusApi, tableName: string) {
    await knexLOG(tableName)
      .insert(data)
      .then((success:any) => {
        console.log(this.GREEN, `[${success}] Log salvo com sucesso no banco ${config.log_database.name}!`);
      })
      .catch((error:any) => {
        console.log(this.RED, '\n [ERRO] Error ao salvar log. \n');
        console.log(error);
      });
  }

  public stringifyData(data: LogNerusApi) {
    return {
      ...data,
      log: JSON.stringify(data.log)
    };
  }

  public saveLogInConsole(data: LogNerusApi) {
    console.log(this.YELLOW, '[LOGGER] [   ================ LOG ================   ]');
    console.log(data);
  }
}

export default Logger;
