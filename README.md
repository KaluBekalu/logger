# Logger

Logger is a simple logging library for JavaScript applications. It provides an easy way to log messages to the console, send logs to Remote, or write them to a log file.

## Features

- Log messages with different severity levels: TRACE, INFO, DEBUG, WARN, ERROR, FATAL.
- Option to log messages to the console.
- Option to send logs to Remote for centralized monitoring.
- Option to write logs to a log file.

## Installation

You can install the library using npm:

```bash
npm install @kalbekalu/logger
```

# Usage
1. Import the logger class:
```js
import Logger from "@kalbekalu/logger";
```

2. Create an instance of the Logger class:
```js
   const logger = new Logger(remoteUrl, token, appInfo);
```
'url': The URL of your host server for logging. eg: Splunk
'token': The token to authenticate with server.
'appInfo': Information about your application, such as name, version, etc. 
eg: 
```js
{ "name" : "App Name", "version" : "V1.2"}
```


3. Log messages using different methods:

   3.1. To log to the console: 
      
      ```js
      logger.standard(Logger.levels.INFO, "This is an informational message");
      ```
      
   3.2. To log to remote: 
      
      ```js
      logger.logToUrl(Logger.levels.ERROR, "An error occurred in the application");
      ```
      
   3.3. To log to file: 
      
      ```js
      logger.file(Logger.levels.INFO, "This is an informational message");
      ```


4. Use the different severity levels available:
```js
Logger.levels.TRACE
Logger.levels.INFO
Logger.levels.DEBUG
Logger.levels.WARN
Logger.levels.ERROR
Logger.levels.FATAL
```


## Exmple 
```js
const logger = new Logger("https://your-server-url", "your-server-auth-token", {
  appName: "MyApp",
  appVersion: "1.0.0",
});

logger.standard(Logger.levels.INFO, "Application started");
logger.logToUrl(Logger.levels.ERROR, "Critical error occurred");
logger.file(Logger.levels.DEBUG, "Debugging information", "./app.log");

```