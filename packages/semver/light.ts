/**
 * A schema for validating Semantic Versioning {@see {@link https://semver.org/}}.
 * @module
 */

import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const SEMVER_REGEX =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && SEMVER_REGEX.test(value);
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected Semantic Versioning received ${value.received}`;
};

export const semver = (overrideMessage?: string | ((value: CustomIssue) => string)) => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

export type SemverSchema = InferOutput<ReturnType<typeof semver>>;
