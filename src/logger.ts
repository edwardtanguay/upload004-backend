import express from 'express';
import fs from 'fs';
import * as config from './config.js';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const date = new Date();
	const logLine = `${date.toISOString()} - ${req.originalUrl}`;
	fs.appendFileSync(config.logPathAndFileName, logLine + '\n');
	next();
}

export default logger;