# valibot-schema-ulid

> Valibot schema for [Universally Unique Lexicographically Sortable Identifiers](https://github.com/ulid/spec).

[![License](https://img.shields.io/github/license/idleberg/valibot-schemas?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-ulid?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-ulid)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-ulid?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-ulid)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schemas/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/actions/workflows/node.yml)

## Installation

```shell
# NodeJS
npm install valibot-schema-ulid

# Deno
deno add jsr:@idleberg/valibot-schema-ulid
```

## Usage

```javascript
import { parse } from "valibot";
import { ulid } from "valibot-schema-ulid";

const output = parse(ulid(), "01ARZ3NDEKTSV4RRFFQ69G5FAV");
```

## License

This work is licensed under [The MIT License](LICENSE).
