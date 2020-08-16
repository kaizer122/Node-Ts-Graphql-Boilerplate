import * as fs from "fs";
import path from "path";
import { capitalize } from "../src/utils/functions";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const argv = require("yargs").usage("Usage: $0 -name [name]").demandOption(["n"]).argv;
console.log(argv.n);
makeModule(argv.n);

function makeModule(name) {
  const dirPath = path.join(__dirname, `../src/modules/${name}`);
  if (fs.existsSync(dirPath)) return console.log("directory already exists.");
  fs.mkdirSync(dirPath);
  fs.mkdirSync(dirPath + "/resolvers");
  fs.writeFileSync(
    dirPath + "/typedefs.graphql",
    `
  type ${capitalize(name)} {
    id: ID!
    createdAt: Float
  }
  `,
  );
  fs.writeFileSync(
    dirPath + "/resolvers/resolver.ts",
    `export default {
        Query: {
      
        },
        Mutation: {
          
        },
      };
      `,
  );
}
