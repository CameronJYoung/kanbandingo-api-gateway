import { Response, Request, NextFunction } from 'express';
import BaseController, { Methods } from './BaseController';


export default class NotFoundController extends BaseController {
	path = '*';
	routes = [
		{
			path: '',
			method: Methods.GET,
			handler: this.getNotFound,
			localMiddleware: []
		}
	];

	getNotFound(req: Request, res: Response, next: NextFunction): void {
		res.status(404).send('ERROR 404: this is not the content youre looking for...');
	}
}