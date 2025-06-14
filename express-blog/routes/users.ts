import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/:id", (req, res) => {
    res.render("public-profile");
});

export default usersRouter;