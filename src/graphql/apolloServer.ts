import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import schema from "./schema";
import createErrorFormatter from "./utils/createErrorFormatter";
import UserError from "./utils/userError";

const apolloServer = new ApolloServer({
  schema: schema,
  playground: true,
  introspection: true,
  tracing: true,
  engine: {
    debugPrintReports: true,
  },
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }
    const token = req?.headers.authorization;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = jwt.verify(token, process.env.JWT_SECRET) as any;
      return {
        user: {
          id: payload.id,
          role: payload.role,
        },
      };
    }
  },
  formatError: createErrorFormatter(),
  subscriptions: {
    onConnect: (connectionParams: any) => {
      console.log(connectionParams);
      const token = connectionParams?.authToken;
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        const payload = jwt.verify(token, process.env.JWT_SECRET) as any;
        console.log({ payload });
        return {
          user: {
            id: payload.id,
            role: payload.role,
          },
        };
      } else return new UserError("Accès non autorisé");
    },
  },
});
export default apolloServer;
