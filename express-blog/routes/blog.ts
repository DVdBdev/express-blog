import { Router } from "express";
import path from "path";
import fs from "fs";

const blogRouter = Router();

blogRouter.get("/new", (req, res) => {
    res.render("new");
});

blogRouter.get("/:id", (req, res) => {
    const blogId = req.params.id;

    const filePath = path.join(__dirname, "../public/data/blogs.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const blogs = JSON.parse(rawData);
    const blog = blogs.find((b: any) => String(b._id) === String(blogId));
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    res.render("view", { blog });
});

blogRouter.get("/:id/edit", (req, res) => {
    res.render("edit");
});

export default blogRouter;