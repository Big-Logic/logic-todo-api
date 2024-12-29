import winston, {format} from "winston";

winston.configure({
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logger/appLog.log" }),
  ],
});

export default winston;