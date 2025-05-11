# valibot-schema-ksuid

> Valibot schema for [K-Sortable Unique IDentifiers](https://github.com/segmentio/ksuid).

[![License](https://img.shields.io/github/license/idleberg/valibot-schemas?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-ksuid?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-ksuid)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-ksuid?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-ksuid)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schemas/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/actions/workflows/node.yml)

> [!NOTE]
> This libray isn't as lightweight as most built-in Valibot schemas, so it might not be suitable for some use-cases.

## Installation

```shell
# NodeJS
npm install valibot-schema-ksuid

# Deno
deno add jsr:@idleberg/valibot-schema-ksuid
```

## Usage

```javascript
import { parse } from "valibot";
import { ksuid } from "valibot-schema-ksuid";

const output = parse(ksuid(), "aWgEPTl1tmebfsQzFP4bxwgy80V");
```

## License

This work is licensed under [The MIT License](LICENSE).
