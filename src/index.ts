import express from "express";
import http from "http";
import Mongoose from "mongoose";
import apolloServer from "./graphql/apolloServer";

Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: process.env.DB_NAME,
});

const app = express();
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const port = 3000;
httpServer.listen(port, async () => {
  console.log("server is running on: " + port);
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
