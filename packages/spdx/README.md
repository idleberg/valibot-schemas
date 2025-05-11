# valibot-schema-spdx

> Valibot schema for [SPDX identifiers](https://spdx.github.io/).

[![License](https://img.shields.io/github/license/idleberg/valibot-schemas?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-spdx?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-spdx)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-spdx?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-spdx)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schemas/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/actions/workflows/node.yml)

> [!NOTE]
> This libray isn't as lightweight as most built-in Valibot schemas, so it might not be suitable for some use-cases.

## Installation

```shell
# NodeJS
npm install valibot-schema-spdx

# Deno
deno add jsr:@idleberg/valibot-schema-spdx
```

## Usage

```javascript
import { parse } from "valibot";
import { spdx, osi } from "valibot-schema-spdx";

parse(spdx, "MIT"); // true
parse(osi, "GPL-3.0-or-later"); // true
parse(osi, "CC0-1.0"); // false
```

## License

This work is licensed under [The MIT License](LICENSE).
