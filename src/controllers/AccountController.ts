import { Response, Request } from 'express';

import BaseController, { Methods } from './BaseController';
import KafkaClient from '../singletons/KafkaClient';

interface IAccount {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export default class AccountController extends BaseController {
	path = '/account';
	routes = [
		{
			path: '',
			method: Methods.POST,
			handler: this.createAccount,
			localMiddleware: []
		}
	];

	async createAccount(req: Request , res: Response) {
		KafkaClient.produceMessage(req.body, 'POST.account.createAccount');
		res.status(200).send('KANBANDINGO-V2-API!!!!!');
	}
}