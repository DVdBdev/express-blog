import { Router } from "express";
import { createUser, login } from "../database";
import { User } from "../interfaces";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
    const error = req.query.error as string | undefined;
    res.render("login", { error });
});

authRouter.post("/login", async (req, res) => {
    const email : string = req.body.email;
    const password : string = req.body.password;
    try {
        let user : User = await login(email, password);
        delete user.password;
        req.session.user = user;
        res.redirect("/");
    } catch (error: any) {
        console.log(`login error for user ${email}:`, error.message);
        res.redirect("/login?error=" + encodeURIComponent(error.message));
    }
});

authRouter.get("/register", (req, res) => {
    const error = req.query.error as string | undefined;
    res.render("register", { error });
});

authRouter.post("/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        if (!username || !email || !password || !confirmPassword) {
            return res.redirect("/register?error=missing-fields");
        }
        if (password !== confirmPassword) {
            return res.redirect("/register?error=passwords+do+not+match");
        }
        await createUser(username, email, password);
        res.redirect("/login");
    } catch (error: any){
        console.error("register error:", error.message);
        res.redirect("/register?error=" + encodeURIComponent(error.message));
    }
});

export default authRouter;