import { NextFunction, Request, Response } from "express";

export function addUserToLocals(req: Request, res: Response, next: NextFunction) {
    if (req.session.user && typeof req.session.user !== "undefined") {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
}