import { valid, validRange } from 'semver';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const check = (value: unknown): boolean => {
	return typeof value === 'string' && Boolean(valid(value));
};

const message = (value: { received: string }): string => {
	return `Invalid Semantic Versioning, received ${value.received}`;
};

const checkRange = (value: unknown): boolean => {
	return typeof value === 'string' && Boolean(validRange(value));
};

const messageRange = (value: { received: string }): string => {
	return `Invalid Semantic Versioning range, received ${value.received}`;
};

export const semver: CustomSchema<string, ErrorMessage<CustomIssue> | undefined> = custom<string>(check, message);
export const semverRange: CustomSchema<string, ErrorMessage<CustomIssue> | undefined> = custom<string>(
	checkRange,
	messageRange,
);

export type SemverSchema = InferOutput<typeof semver>;
export type SemverRangeSchema = InferOutput<typeof semver>;
