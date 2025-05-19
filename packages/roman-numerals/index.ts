/**
 * A schema for validating Roman numerals.
 * @module
 */

import romans from 'romans';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

const isValid = (value: string): boolean => {
	try {
		romans.deromanize(value);
		return true;
	} catch (e) {
		return false;
	}
}

const check = (value: unknown): boolean => {
	return typeof value === 'string' && isValid(value);
};

const defaultMessage = (value: CustomIssue): string => {
	return `Invalid type: Expected roman numeral received ${value.received}`;
};

/**
 * Function to validate roman numerals.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for roman numeral validation.
 */
export const romanNumeral = (
	overrideMessage?: string | ((value: CustomIssue) => string),
): CustomSchema<string, ErrorMessage<CustomIssue>> => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

/**
 * Type for the output of the roman numeral schema.
 * @typedef {InferOutput<ReturnType<typeof romanNumeral>>} RomanNumeralSchema
 */
export type RomanNumeralSchema = InferOutput<ReturnType<typeof romanNumeral>>;
