/**
 * A schema for validating r K-Sortable Unique IDentifiers {@see {@link https://github.com/segmentio/ksuid}}.
 * @module
 */

import KSUID from 'ksuid';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

// additional check required since KSUID.parse() accepts invalid Base62 strings
const BASE62_REGEX = /^[A-Za-z0-9+/]{27}$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && BASE62_REGEX.test(value) && KSUID.isValid(KSUID.parse(value).raw);
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected KSUID received ${value.received}`;
};

/**
 * Function to validate KSUIDs.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for KSUID validation.
 */
export const ksuid = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Type for the output of the KSUID schema.
 * @typedef {InferOutput<ReturnType<typeof ksuid>>} KsuidSchema
 */
export type KsuidSchema = InferOutput<ReturnType<typeof ksuid>>;
