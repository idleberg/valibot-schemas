# valibot-schema-ksuid

> Valibot schema for [K-Sortable Unique IDentifiers](https://github.com/segmentio/ksuid).

[![License](https://img.shields.io/github/license/idleberg/valibot-schema-ksuid?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schema-ksuid/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-ksuid?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-ksuid)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-ksuid?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-ksuid)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schema-ksuid/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schema-ksuid/actions/workflows/node.yml)
[![CI: Deno](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schema-ksuid/deno.yml?logo=deno&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schema-ksuid/actions/workflows/deno.yml)

> [!NOTE]
> This libray isn't as lightweight as most built-in Valibot schemas, so it might not be suitable for some use-cases.

## Installation

```shell
npm install -D valibot-schema-ksuid
```

## Usage

```javascript
import { parse } from "valibot";
import { ksuid } from "valibot-schema-ksuid";

const output = parse(ksuid, "aWgEPTl1tmebfsQzFP4bxwgy80V");
```

## License

This work is licensed under [The MIT License](LICENSE).
