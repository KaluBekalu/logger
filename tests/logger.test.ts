import axios from "axios";
import * as fs from "fs";
import Logger from "../src";

jest.mock("axios");

describe("Logger", () => {
  const url = "https://example.com/log";
  const token = "your-token";
  const appInfo = { appName: "TestApp" };
  const logger = new Logger(url, token, appInfo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('logToUrl', () => {
  //   it('should log to Splunk successfully', async () => {
  //     const level = logger.levels.INFO;
  //     const message = 'Test message';
  //     const expectedTimestamp = '2023-11-16T12:34:56.789Z';

  //     jest.spyOn(logger, 'getCurrentTimestamp').mockReturnValueOnce(expectedTimestamp);

  //     const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: 'Splunk response' });

  //     await logger.logToUrl(level, message);

  //     expect(mockAxiosPost).toHaveBeenCalledWith(url, expect.any(String), {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `${token}`,
  //       },
  //     });

  //     expect(console.log).toHaveBeenCalledWith('Log sent to Splunk:', 'Splunk response');
  //   });

  //   it('should handle errors when logging to Splunk', async () => {
  //     const level = logger.levels.ERROR;
  //     const message = 'Error message';

  //     jest.spyOn(logger, 'getCurrentTimestamp').mockReturnValueOnce('2023-11-16T12:34:56.789Z');

  //     const mockAxiosPost = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network error'));

  //     await logger.logToUrl(level, message);

  //     expect(mockAxiosPost).toHaveBeenCalledWith(url, expect.any(String), {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `${token}`,
  //       },
  //     });

  //     expect(console.error).toHaveBeenCalledWith('Error sending log to Splunk:', expect.any(Error));
  //   });
  // });

  describe("standard", () => {
    it("should log to console", () => {
      const level = logger.levels.DEBUG;
      const message = "Console message";
      const expectedTimestamp = "2023-11-16T12:34:56.789Z";

      jest
        .spyOn(logger as any, "getCurrentTimestamp")
        .mockReturnValueOnce(expectedTimestamp);

      const spyConsoleLog = jest.spyOn(console, "log");

      logger.standard(level, message);

      expect(spyConsoleLog).toHaveBeenCalledWith(expect.any(String));
      expect(spyConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining(expectedTimestamp)
      );
      expect(spyConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining(level)
      );
      expect(spyConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining(message)
      );
    });
  });

  //  describe('file', () => {
  //   it('should write to a file', () => {
  //     const level = logger.levels.WARN;
  //     const message = 'File message';
  //     const logFilePath = './test.log';
  //     const expectedTimestamp = '2023-11-16T12:34:56.789Z';

  //     jest.spyOn(logger, 'getCurrentTimestamp').mockReturnValueOnce(expectedTimestamp);

  //     // The entire fs module is now mocked, so there's no need to use spyOn on fs.appendFile
  //     (fs as any).appendFile.mockImplementationOnce((path, data, callback) => {
  //       expect(path).toBe(logFilePath);
  //       expect(data).toContain(expectedTimestamp);
  //       expect(data).toContain(level);
  //       expect(data).toContain(message);
  //       callback(null); // Simulate successful file write
  //     });

  //     logger.file(level, message, logFilePath);

  //     expect(mockAppendFile).toHaveBeenCalled();
  //     expect(console.error).not.toHaveBeenCalled(); // Ensure no error is logged
  //   });

  //   it("should handle errors when writing to a file", () => {
  //     const level = logger.levels.ERROR;
  //     const message = "Error message";
  //     const logFilePath = "./test.log";

  //     jest
  //       .spyOn(logger as any, "getCurrentTimestamp")
  //       .mockReturnValueOnce("2023-11-16T12:34:56.789Z");

  //     const mockAppendFile = jest
  //       .spyOn(fs, "appendFile")
  //       .mockImplementationOnce((path, data, callback) => {
  //         callback(new Error("File write error")); // Simulate file write error
  //       });

  //     logger.file(level, message, logFilePath);

  //     expect(mockAppendFile).toHaveBeenCalled();
  //     expect(console.error).toHaveBeenCalledWith(
  //       "Error writing to log file:",
  //       expect.any(Error)
  //     );
  //   });
  // });
});
