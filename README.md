# Logger README

A simple logging utility for Node.js applications, designed to log messages to various destinations, including a remote API endpoint, console, and a local log file.

## Installation

```bash
npm install @kalbekalu/logger
```

## Usage

### Importing the Logger

```javascript
import Logger from "./Logger";
```

### Creating an instance of Logger

```javascript
const logger = new Logger(url, token, appInfo);
```

- `url` (string): The URL of the remote API endpoint where logs will be sent.
- `token` (string): The authentication token required for the remote API endpoint.
- `appInfo` (any): Additional information about the application (e.g., name, version) to include in each log entry.

### Logging to a Remote API Endpoint

```javascript
logger.logToUrl(level, logData, method, config);
```

- `level` (string): Log level (TRACE, INFO, DEBUG, WARN, ERROR, FATAL).
- `logData` (Record<string, any>): Additional data to be logged - can be any valid object record.
- `method` (string, optional, default: "POST"): HTTP method for the API request.
- `config` (AxiosRequestConfig, optional): Additional Axios configuration options for the API request.

### Logging to Console

```javascript
logger.standard(level, logData);
```

- `level` (string): Log level (TRACE, INFO, DEBUG, WARN, ERROR, FATAL) - Required.
- `logData` (Record<string, any>): Additional data to be logged - can be any valid object record - Required.

### Logging to a Local File

```javascript
logger.file(level, logData, logFilePath);
```

- `level` (string): Log level (TRACE, INFO, DEBUG, WARN, ERROR, FATAL) - Required.
- `logData` (Record<string, any>): Additional data to be logged - can be any valid object record - Required.
- `logFilePath` (string, optional, default: "./app.log"): Path to the local log file - Required.

## Example

```javascript
const logger = new Logger({
  appName: "MyApp",
  appVersion: "1.0.0",
});

logger
  .logToUrl("INFO", { message: "Application started" })
  .then((response) => console.log("Log sent successfully"))
  .catch((error) => console.error("Error sending log:", error));

logger.standard("DEBUG", { message: "Debugging information" });

logger.file("ERROR", { message: "An error occurred" }, "./errors.log");
```

In this example, logs are sent to a remote API endpoint, printed to the console, and appended to a local log file.

## License

This code is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
