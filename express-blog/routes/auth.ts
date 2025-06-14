import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
    res.render("login");
});

authRouter.get("/register", (req, res) => {
    res.render("register");
});

export default authRouter;