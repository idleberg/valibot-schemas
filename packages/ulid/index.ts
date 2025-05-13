/**
 * A schema for validating r Universally Unique Lexicographically Sortable Identifies {@see {@link https://github.com/ulid/spec}}.
 * @module
 */

import { isValid } from 'ulid';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const check = (value: unknown): boolean => {
	return typeof value === 'string' && isValid(value);
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected ULID received ${value.received}`;
};

/**
 * Function to validate ULIDs.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for ULID validation.
 */
export const ulid = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

export type KsuidSchema = InferOutput<ReturnType<typeof ulid>>;
