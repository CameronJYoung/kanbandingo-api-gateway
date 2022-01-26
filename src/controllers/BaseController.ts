import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export interface IRoute {
	path: string;
	method: Methods;
	handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
	localMiddleware: ((req: Request, res: Response, next: NextFunction) => void)[];
}

export default abstract class Controller {
	public router: Router = Router();
	public abstract path: string;
	protected abstract readonly routes: Array<IRoute>;

	public setRoutes = (): Router => {
		for (const route of this.routes) {
			for (const mw of route.localMiddleware) {
				this.router.use(route.path, mw);
			}
			switch (route.method) {
				case Methods.GET:
					this.router.get(route.path, route.handler);
					break;
				case Methods.POST:
					this.router.post(route.path, route.handler);
					break;
				case Methods.PUT:
					this.router.post(route.path, route.handler);
					break;
				case Methods.DELETE:
					this.router.post(route.path, route.handler);
					break;
				default:
					break;
			}
		}

		return this.router;
	};

	protected sendSuccess(res: Response, data: object, message?: string): Response {
		return res.status(200).json({
			message: message || 'success',
			data: data
		});
	}

	protected sendError(res: Response, message?: string): Response {
		return res.status(500).json({
			message: message || 'internal server error'
		});
	}
}