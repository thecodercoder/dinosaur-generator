const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, printf } = format;

const logsdir = './logs';
if (!fs.existsSync(logsdir)) {
  fs.mkdirSync(logsdir);
}

//define the time format
const timeFormatFn = () => {
  let now = new Date();
  return now.toUTCString();
};

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'node-js' }),
    timestamp({
      format: timeFormatFn,
    }),
    prettyPrint(),
  ),

  defaultMeta: { service: 'nodejs-service' },
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  const simpleFormat = printf(
    ({ level, message, label, timestamp }) => `[${timestamp}] ${level.toUpperCase()} - ${message}`,
  );

  logger.add(
    new transports.Console({
      format: simpleFormat,
      level: 'debug',
    }),
  );
}

module.exports = {
  debug: (message, meta = '') => {
    console.log('debug', message, meta);
    logger.log('debug', message, meta);
  },

  info: (message, meta = '') => {
    console.log('debug', message, meta);
    logger.log('info', message, meta);
  },

  warn: (message, meta = '') => {
    console.log('debug', message, meta);
    logger.log('warn', message, meta);
  },

  error: (message, meta = '') => {
    console.log('debug', message, meta);
    logger.log('error', message, meta);
  },
};