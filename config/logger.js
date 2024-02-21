import winston, { format } from "winston"
const { combine, timestamp, label, printf } = format;

const myformat = printf(({ level, message, label, timestamp }) =>{
    return `${timestamp} [${label}] ${label}: ${message}`;
});

const logger = winston.createLogger({
    level:'info',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myformat
    ),
    defaultMeta:{service: 'user-service'},
    transport:[
        new winston.transports.File({filename: 'error.log', level:'error'}),

        new winston.transports.File({filename: 'logs.log'})
    ],
});

export default logger;