import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { romanNumeral as schema } from './index.ts';

const validNumeral = "MCMLXXVI";
const invalidNumeral = 'CIVIC';

test('valid roman numeral', () => {
	const { success } = safeParse(schema(), validNumeral);

	expect(success).toBe(true);
	expect(() => parse(schema(), validNumeral)).not.toThrowError();
});

test('invalid roman numeral', () => {
	const { success } = safeParse(schema(), invalidNumeral);

	expect(success).toBe(false);
	expect(() => parse(schema(), invalidNumeral)).toThrowError(`Invalid type: Expected roman numeral received "${invalidNumeral}"`);
});

test('invalid roman numeral, custom error string', () => {
	const errorMessage = 'Custom error message';

	const customSchema = schema(errorMessage);
	const { success } = safeParse(customSchema, invalidNumeral);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidNumeral)).toThrowError(errorMessage);
});

test('invalid roman numeral, custom error callback', () => {
	const customSchema = schema((value) => `Custom error message, received ${value.received}`);
	const { success } = safeParse(customSchema, invalidNumeral);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidNumeral)).toThrowError(`Custom error message, received "${invalidNumeral}"`);
});
