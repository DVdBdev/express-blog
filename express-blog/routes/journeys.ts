import { Router } from "express";
import { Journey } from "../interfaces";
import path from "path";
import fs from "fs";

const journeysRouter = Router();

journeysRouter.get("/", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 12;
  const offset = (page - 1) * limit;

  const filePath = path.join(__dirname, "../public/data/journeys.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Internal Server Error");

    try {
      const allJourneys: Journey[] = JSON.parse(data);
      const paginatedJourneys = allJourneys.slice(offset, offset + limit);

      const totalPages = Math.ceil(allJourneys.length / limit);

      res.render("journeys", {
        journeys: paginatedJourneys,
        currentPage: page,
        totalPages,
      });
    } catch (e) {
      res.status(500).send("Invalid data format");
    }
  });
});

journeysRouter.get("/:id", (req, res) => {
  const journeyId = req.params.id;

  const filePath = path.join(__dirname, "../public/data/journeys.json");
  const blogsPath = path.join(__dirname, "../public/data/blogs.json");

  const rawData = fs.readFileSync(filePath, "utf-8");
  const blograwData = fs.readFileSync(blogsPath, "utf-8");

  const journeys = JSON.parse(rawData);
  const blogs = JSON.parse(blograwData);

  const journey = journeys.find((j: any) => String(j._id) === String(journeyId));
  const blogsFromJourney = blogs.filter((blog: any) => String(blog.journeyId) === String(journeyId));


  if (!journey) {
    return res.status(404).send("Journey not found");
  }

  res.render("journey", { journey, blogs: blogsFromJourney });
});

// journeysRouter.get("/", (req, res) => {
//     const journeys = [{...}];
//     res.render("journeys", { journeys });
// });


export default journeysRouter;