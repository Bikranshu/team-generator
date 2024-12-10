import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';

import constant from '../config/directory';
import path from "node:path";

const app = express();

require('dotenv').config();

app.set('port', (process.env as any).PORT || 3000);
app.set('host', (process.env as any).HOST || '0.0.0.0' || 'localhost');

app.use(express.static(constant.reactAppDir));
app.use(express.static(constant.distDir));

app.disable('x-powered-by');
app.disable('etag');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

export default app;
