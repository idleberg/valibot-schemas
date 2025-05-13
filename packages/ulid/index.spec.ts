import { ulid } from 'ulid';
import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { ulid as schema } from './index.ts';

const validId = ulid();
const invalidId = '@@@@@@@@@@@@@@@@@@@@@@@@@@';

test('valid ulid', () => {
	const { success } = safeParse(schema(), validId);

	expect(success).toBe(true);
	expect(() => parse(schema(), validId)).not.toThrowError();
});

test('invalid ulid', () => {
	const { success } = safeParse(schema(), invalidId);

	expect(success).toBe(false);
	expect(() => parse(schema(), invalidId)).toThrowError(`Invalid type: Expected ULID received "${invalidId}"`);
});

test('invalid ulid, custom error string', () => {
	const errorMessage = 'Custom error message';

	const customSchema = schema(errorMessage);
	const { success } = safeParse(customSchema, invalidId);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidId)).toThrowError(errorMessage);
});

test('invalid ulid, custom error callback', () => {
	const customSchema = schema((value) => `Custom error message, received ${value.received}`);
	const { success } = safeParse(customSchema, invalidId);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidId)).toThrowError(`Custom error message, received "${invalidId}"`);
});
