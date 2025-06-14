import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import dashboardRouter from "./routes/dashboard";
import profileRouter from "./routes/profile";
import blogRouter from "./routes/blog";
import homeRouter from "./routes/home";
import usersRouter from "./routes/users";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);

app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/dashboard", dashboardRouter);
app.use("/profile", profileRouter);
app.use("/blogs", blogRouter);
app.use("/", homeRouter);
app.use("/users", usersRouter);

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get("port"));
});