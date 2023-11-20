import axios, { Axios, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import * as fs from "fs";

class Logger {
  private appInfo: Record<string, any>;

  public levels = {
    TRACE: "TRACE",
    INFO: "INFO",
    DEBUG: "DEBUG",
    WARN: "WARN",
    ERROR: "ERROR",
    FATAL: "FATAL",
  };

  constructor(appInfo: any) {
    this.appInfo = appInfo;
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  public logToUrl(
    level: string,
    logData: Record<string, any>,
    // API Configs 👇
    method: Method = "POST",
    config: AxiosRequestConfig
  ) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = {
      ...this.appInfo,
      date: timestamp,
      level,
      ...logData,
    };

    return axios({
      method,
      data: {
        ...logMessage,
      },
      ...config,
    });
  }

  public standard(level: string, logData: Record<string, any>) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = JSON.stringify({
      ...this.appInfo,
      date: timestamp,
      level,
      ...logData,
    });

    console.log(logMessage);
  }

  public file(
    level: string,
    logData: Record<string, any>,
    logFilePath: string = "./app.log"
  ) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = JSON.stringify({
      ...this.appInfo,
      date: timestamp,
      level,
      ...logData,
    });

    fs.appendFile(logFilePath, logMessage + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  }
}

export default Logger;
