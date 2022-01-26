import { Response, Request } from 'express';

import BaseController, { Methods } from './BaseController';

export default class HomeController extends BaseController {
	path = '/';
	routes = [
		{
			path: '',
			method: Methods.GET,
			handler: this.getHome,
			localMiddleware: []
		}
	];

	async getHome(req: Request, res: Response) {
		res.status(200).send('KANBANDINGO-V2-API!!!!!');
	}
}