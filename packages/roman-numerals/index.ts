/**
 * A schema for validating Roman numerals.
 * @module
 */

import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

/**
 * Regular expression pattern for validating Roman numerals.
 * Ensures proper character combinations and repetition rules.
 *
 * Copyright (c) 2023 Jeremy Bunting
 * @license MIT
 * @see {@link https://github.com/qbunt/romans}
 */
const ROMAN_PATTERN_REGEX =
	/^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/;

const isValid = (value: string): boolean => {
	return ROMAN_PATTERN_REGEX.test(value);
};

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
