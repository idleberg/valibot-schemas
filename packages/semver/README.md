# valibot-schema-semver

> Valibot schema for [Semantic Versioning](https://semver.org/).

[![License](https://img.shields.io/github/license/idleberg/valibot-schemas?color=blue&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/valibot-schema-semver?style=for-the-badge)](https://www.npmjs.org/package/valibot-schema-semver)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/valibot-schema-semver?style=for-the-badge)](https://jsr.io/@idleberg/valibot-schema-semver)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/valibot-schemas/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/valibot-schemas/actions/workflows/node.yml)

> [!NOTE]
> This libray isn't as lightweight as most built-in Valibot schemas, so it might not be suitable for some use-cases.

## Installation

```shell
npm install -D valibot-schema-semver
```

## Usage

```javascript
import * as v from "valibot";
import { semver, semverRange } from "valibot-schema-semver";

const PackageJsonSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.max(214)),
	version: semver,
	engines: v.object({
		node: semverRange,
	}),
});
```

For simple version validation, you can also use a lightweight variant (~350B instead of 24kB):

```javascript
import { semver } from "valibot-schema-semver/light";
```

## License

This work is licensed under [The MIT License](LICENSE).
