import { NextFunction, Request, Response } from "express";

export function guestOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.session.user && typeof req.session.user !== "undefined" && typeof req.session.user._id !== "undefined") {
        return res.redirect("/");
    }
    next();
}