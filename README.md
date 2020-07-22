# Deroutex Body Parser

Body parser for [Deroutex](https://github.com/routexjs/deroutex) using [Deno Body Parser](https://github.com/Cretezy/deno_body_parser).

## Example

```ts
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
```

[View full example](./example.ts)

## Usage

Use `createBodyParserMiddleware` to create a Deroutex middleware based on a body parsers.

If one of the parsers run on the request body, `ctx.data.body` will be set to the result of the parser
(and `ctx.data.bodyParser` will be set to the parser type, such as `json`/`urlencoded`/etc)

## Support

Since Deno is evolving quickly, only the latest version is officially supported.

Please file feature requests and bugs at the [issue tracker](https://github.com/routexjs/deroutex_body_parser/issues).
