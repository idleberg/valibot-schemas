# valibot-schema-roman-numerals

> Valibot schema for Roman numerals.

[![License](https://img.shields.io/github/license/idleberg/valibot-schemas?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-roman-numerals?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-roman-numerals)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-roman-numerals?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-roman-numerals)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schemas/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/actions/workflows/node.yml)

## Installation

```shell
# NodeJS
npm install valibot-schema-roman-numerals

# Deno
deno add jsr:@idleberg/valibot-schema-roman-numerals
```

## Usage

```javascript
import { parse } from "valibot";
import { romanNumeral } from "valibot-schema-roman-numerals";

const output = parse(romanNumeral(), "MCMLXXVI");
```

## License

This work is licensed under [The MIT License](LICENSE).
