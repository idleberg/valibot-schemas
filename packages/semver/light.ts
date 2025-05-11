import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const SEMVER_REGEX =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && SEMVER_REGEX.test(value);
};

const message = (value: { received: string }): string => {
	return `Invalid Semantic Versioning, received ${value.received}`;
};

export const semver: CustomSchema<string, ErrorMessage<CustomIssue> | undefined> = custom<string>(check, message);

export type SemverSchema = InferOutput<typeof semver>;
