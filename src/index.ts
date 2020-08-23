import cors from "cors";
import express from "express";
import http from "http";
import moment from "moment-timezone";
import Mongoose from "mongoose";
import path from "path";
import apolloServer from "./graphql/apolloServer";
import publicRouter from "./routes/publicRoutes";

moment.tz.setDefault("Europe/Paris");
Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: process.env.DB_NAME,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/", publicRouter);
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const port = process.env.SERVER_PORT;
httpServer.listen(port, async () => {
  console.log(" 🚀 Server is running on: " + port);
  console.log(process.env.NODE_ENV);
  // const fillDB = async num => {
  //   const models = [];
  //   for (let i = 0; i < num; i += 1) {
  //     const password = faker.internet.password();
  //     const user = new UserModel({
  //       username: faker.internet.userName(),
  //       email: faker.internet.email(),
  //       password: await bcrypt.hash(password, 10)
  //     });
  //     await user.save();
  //     user.password = password;
  //     models.push(user);
  //   }
  //   return models;
  // };

  // await fillDB(100);
});
