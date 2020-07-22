import {
  Deroutex,
  JsonBody,
} from "https://raw.githubusercontent.com/routexjs/deroutex/master/mod.ts";
import {
  createBodyParser,
  JsonBodyParser,
} from "https://raw.githubusercontent.com/Cretezy/deno_body_parser/master/mod.ts";

import { createBodyParserMiddleware } from "./mod.ts";

const app = new Deroutex();

app.middleware(createBodyParserMiddleware(
  createBodyParser({
    parsers: [
      new JsonBodyParser(),
    ],
  }),
));

app.any("/", (ctx) => {
  return new JsonBody(ctx.data);
});

await app.listenAndServe(":8000");
