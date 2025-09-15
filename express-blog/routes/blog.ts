import { Router } from "express";
import path, { parse } from "path";
import fs from "fs";
import edjsHTML from "editorjs-html";
import { parseEditorJs } from "../middleware/parseEditorJs";
import { v4 as uuidv4 } from 'uuid';

const blogRouter = Router();

blogRouter.get("/new", (req, res) => {
    const filePath = path.join(__dirname, "../public/data/journeys.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const journeys = JSON.parse(rawData);
    res.render("new", { journeys });
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
    const parsedBlocks = parseEditorJs(blog.content);
    res.render("view", { blog , blogContent: parsedBlocks });
});

blogRouter.get("/:id/edit", (req, res) => {
    res.render("edit");
});

export default blogRouter;