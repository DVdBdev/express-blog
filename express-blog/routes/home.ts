import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    const mockJourneys = [
    {
        _id: "1",
        title: "Internship 2024: My First Real Job",
        description: "Follow my journey interning at a fast-paced startup where I learned more than just coding.",
        author: {
            username: "devSarah"
        }
    },
    {
        _id: "2",
        title: "Backpacking Through Southeast Asia",
        description: "A personal travel series through Thailand, Vietnam, and Cambodia — all on a budget!",
        author: {
            username: "wanderLiam"
        }
    },
    {
        _id: "3",
        title: "Building My First SaaS Product",
        description: "An idea, some sleepless nights, a lot of bugs — and eventually, a working MVP.",
        author: {
            username: "juliaCode"
        }
    },
    {
        _id: "4",
        title: "Internship 2025: Remote Life at BigTech",
        description: "I worked remotely at one of the biggest tech companies in the world — here’s what I learned.",
        author: {
            username: "techAlex"
        }
    }
    ];
    res.render("home", { featuredJourneys : mockJourneys });
});

export default homeRouter;