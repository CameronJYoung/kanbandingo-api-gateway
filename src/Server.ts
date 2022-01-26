import { Application, RequestHandler } from 'express';
import { Logger } from 'pino';
import http from 'http';

import Controller from './controllers/BaseController';


export default class Server {
	private app: Application;
	private logger: Logger;
	private readonly port: number;

	constructor(app: Application, port: number, logger: Logger) {
		this.app = app;
		this.port = port;
		this.logger = logger;
	}

	public run(): http.Server {
		return this.app.listen(this.port, () => {
			this.logger.info(`server started on ${this.port}`);
		});
	}

	public loadMiddleware(middleWares: Array<RequestHandler>): void {
		const middleWaresLength = middleWares.length;
		middleWares.forEach((mw, i) => {
			this.logger.info(`Middlewares loaded: ${i + 1}/${middleWaresLength}`);
			this.app.use(mw);
		});
	}

	public loadControllers(controllers: Array<Controller>): void {
		const controllersLength = controllers.length;
		controllers.forEach((c, i) => {
			this.logger.info(`Controllers loaded: ${i + 1}/${controllersLength}`);
			this.app.use(c.path, c.setRoutes());
		});
	}
}