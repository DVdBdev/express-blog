import { Router } from "express";

const profileRouter = Router();

profileRouter.get("/", (req, res) => {
    res.render("profile");
});

export default profileRouter;