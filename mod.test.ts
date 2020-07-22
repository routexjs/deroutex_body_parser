import { superdeno } from "https://deno.land/x/superdeno@main/mod.ts";
import {
  Deroutex,
  JsonBody,
} from "https://raw.githubusercontent.com/routexjs/deroutex/master/mod.ts";
import { createBodyParserMiddleware } from "./mod.ts";
import {
  createBodyParser,
  JsonBodyParser,
} from "https://raw.githubusercontent.com/Cretezy/deno_body_parser/master/mod.ts";

Deno.test("It runs middleware", async () => {
  const app = new Deroutex();
  app.middleware(createBodyParserMiddleware(
    createBodyParser({
      parsers: [new JsonBodyParser()],
    }),
  ));

  app.any("/", (ctx) => {
    return new JsonBody(ctx.data);
  });

  await superdeno(app.handler)
    .post("/")
    .send({ "x": 1 })
    .expect(`{"body":{"x":1},"bodyParser":"json"}`)
    .expect(200);
});
