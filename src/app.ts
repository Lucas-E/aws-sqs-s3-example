import express from "express";
import "dotenv/config";
import { createServer } from "http";
import { AppDataSource } from "./data-source";
import { userRoutes } from "./routes/user.route";
import { auth } from "./routes/auth.route";

async function startApp() {
  try {
    //configuring express
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/user', userRoutes())
    app.use('/auth', auth())
    //-------------------

    //configuring server with http
    const server = createServer(app);
    server.listen(process.env.PORT);
    console.log("server running at", process.env.PORT);

    //----------------------------

    //configuring database conn
    await AppDataSource.initialize();
    console.log("Database connected");
    console.log("Database name:", process.env.DATABASE_NAME);

  } catch (error) {
    console.log(error);
    return;
  }
}

startApp()
  .then(() => {
    console.log("Everything up to date");
  })
  .catch((err) => {
    console.log(err);
  });
