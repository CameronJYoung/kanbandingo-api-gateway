import dotenv from 'dotenv';
import express, { RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
dotenv.config();

import Logger from './singletons/Logger';
import Server from './Server';
import Controller from './controllers/BaseController';
import HomeController from './controllers/HomeController';
import NotFoundController from './controllers/NotFoundController';
import AccountController from './controllers/AccountController';

const app = express();
const server = new Server(app, parseInt(process.env.PORT as string), Logger);

const controllers: Array<Controller> = [
	new HomeController(),
	new NotFoundController(),
	new AccountController()
];

const globalMiddleware: Array<RequestHandler> = [
	express.json(),
	express.urlencoded({extended: false}),
	helmet(),
	cors()
];

Promise.resolve().then(() => {
	server.loadMiddleware(globalMiddleware);
	server.loadControllers(controllers);
	server.run();
});