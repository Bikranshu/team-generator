import { Request, Response, NextFunction } from 'express';
import { decodeToken } from './token';

export default function permit(...allowed: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    let token: any;

    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    let permissions: Array<string>;

    if (allowed.some((r: any) => permissions.includes(r))) {
      next();
    } else {
      return res.status(403).json({ message: "You don't have enough permission to perform this action" });
    }
  };
}
