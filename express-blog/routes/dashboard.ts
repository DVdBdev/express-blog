import { Router } from "express";

const dashboardRouter = Router();

dashboardRouter.get("/", (req, res) => {
    res.render("index");
});

export default dashboardRouter;