/**
 * A schema for validating Semantic Versioning {@see {@link https://semver.org/}}.
 * @module
 */

import { valid, validRange } from 'semver';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const check = (value: unknown): boolean => {
	return typeof value === 'string' && Boolean(valid(value));
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected Semantic Versioning received ${value.received}`;
};

const checkRange = (value: unknown): boolean => {
	return typeof value === 'string' && Boolean(validRange(value));
};

const defaultMessageRange = (value: CustomIssue): string => {
	return `Invalid type: Expected Semantic Versioning range received ${value.received}`;
};

/**
 * Function to validate Semantic Versioning strings.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for Semantic Versioning validation.
 */
export const semver = (overrideMessage?: string | ((value: CustomIssue) => string)) => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Function to validate Semantic Versioning ranges.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for Semantic Versioning validation.
 */
export const semverRange = (overrideMessage?: string | ((value: CustomIssue) => string)) => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessageRange;

	return custom<string, ErrorMessage<CustomIssue>>(checkRange, message);
};

export type SemverSchema = InferOutput<ReturnType<typeof semver>>;
export type SemverRangeSchema = InferOutput<ReturnType<typeof semverRange>>;
