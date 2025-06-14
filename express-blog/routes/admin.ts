import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/", (req, res) => {
    res.render("index");
});

adminRouter.get("/users", (req, res) => {
    res.render("users");
});

adminRouter.get("/blogs", (req, res) => {
    res.render("blogs");
});

export default adminRouter;