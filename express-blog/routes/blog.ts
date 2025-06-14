import { Router } from "express";

const blogRouter = Router();

blogRouter.get("/", (req, res) => {
    res.render("list");
});

blogRouter.get("/:id", (req, res) => {
    res.render("view");
});

blogRouter.get("/new", (req, res) => {
    res.render("new");
});

blogRouter.get("/:id/edit", (req, res) => {
    res.render("edit");
});

export default blogRouter;