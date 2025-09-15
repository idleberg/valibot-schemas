/**
 * A schema for validating Semantic Versioning {@see {@link https://semver.org/}}.
 * @module
 */

import { type CustomIssue, type CustomSchema, custom, type ErrorMessage, type InferOutput } from 'valibot';

const SEMVER_REGEX =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && SEMVER_REGEX.test(value);
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected Semantic Versioning received ${value.received}`;
};

/**
 * Function to validate Semantic Versioning strings.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for Semantic Versioning validation.
 */
export const semver = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Type for the output of the Semantic Versioning schema.
 * @typedef {InferOutput<ReturnType<typeof semver>>} SemverSchema
 */
export type SemverSchema = InferOutput<ReturnType<typeof semver>>;
