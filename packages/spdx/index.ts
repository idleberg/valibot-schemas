/**
 * A schema for validating SPDX license identifiers {@see {@link https://spdx.dev/}}.
 * @module
 */

import licenses from 'spdx-license-list';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const licenseIds = Object.keys(licenses);
const osiIds = Object.entries(licenses)
	.filter(([, value]) => value.osiApproved)
	.map(([key]) => key);

const checkWithFilter = (value: unknown, osiOnly: boolean): boolean => {
	const validIds = osiOnly ? osiIds : licenseIds;

	return typeof value === 'string' && validIds.includes(value);
};

const defaultMessage = (value: { received: string }): string => {
	return `Invalid type: Expected SPDX identifier received ${value.received}`;
};

/**
 * Function to validate SPDX license identifiers.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for SPDX license validation.
 */
export const spdx = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const check = (value: unknown) => checkWithFilter(value, false);
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Function to validate OSI-approved SPDX license identifiers.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for OSI-approved SPDX license validation.
 */
export const osi = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const check = (value: unknown) => checkWithFilter(value, true);
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Type for the output of the SPDX schema.
 * @typedef {InferOutput<ReturnType<typeof spdx>>} SpdxSchema
 */
export type SpdxSchema = InferOutput<ReturnType<typeof spdx>>;

/**
 * Type for the output of the OSI schema.
 * @typedef {InferOutput<ReturnType<typeof osi>>} OsiSchema
 */
export type OsiSchema = InferOutput<ReturnType<typeof osi>>;
