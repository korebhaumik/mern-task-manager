import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "hostname",
      customColors: "error:red,warn:yellow,info:blue",
      // translateTime: false,
    },
  },
  timestamp: true,
});
