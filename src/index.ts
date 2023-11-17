import axios from "axios";
import * as fs from "fs";

class Logger {
  private url: string;
  private token: string;
  private appInfo: any;

  public levels = {
    TRACE: "TRACE",
    INFO: "INFO",
    DEBUG: "DEBUG",
    WARN: "WARN",
    ERROR: "ERROR",
    FATAL: "FATAL",
  };

  constructor(url: string, token: string, appInfo: any) {
    this.url = url;
    this.token = token;
    this.appInfo = appInfo;
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  public logToUrl(level: string, message: string) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = JSON.stringify({
      ...this.appInfo,
      date: timestamp,
      level,
      message,
    });

    axios
      .post(this.url, logMessage, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.token}`,
        },
      })
      .then((response) => {
        console.log("Log sent to Splunk:", response.data);
      })
      .catch((error) => {
        console.error("Error sending log to Splunk:", error);
      });
  }

  public standard(level: string, message: string) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = JSON.stringify({
      ...this.appInfo,
      date: timestamp,
      level,
      message,
    });

    console.log(logMessage);
  }

  public file(
    level: string,
    message: string,
    logFilePath: string = "./app.log"
  ) {
    const timestamp = this.getCurrentTimestamp();
    const logMessage = JSON.stringify({
      ...this.appInfo,
      date: timestamp,
      level,
      message,
    });

    fs.appendFile(logFilePath, logMessage + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  }
}

export default Logger;
