import { BodyParserRunner } from "https://raw.githubusercontent.com/Cretezy/deno_body_parser/master/mod.ts";
import { Middleware } from "https://raw.githubusercontent.com/routexjs/deroutex/master/mod.ts";

declare module "https://raw.githubusercontent.com/routexjs/deroutex/master/mod.ts" {
  interface ICtxData {
    body?: any;
    bodyParser?: string;
  }
}

export function createBodyParserMiddleware(
  bodyParser: BodyParserRunner,
): Middleware {
  return async (ctx) => {
    const parsedBody = await bodyParser(ctx.req);

    if (parsedBody) {
      ctx.data.body = parsedBody.value;
      ctx.data.bodyParser = parsedBody.parser;
    }
  };
}
