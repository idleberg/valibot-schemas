import KSUID from 'ksuid';
import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { ksuid } from './index.ts';

const validId = KSUID.randomSync().string;
const invalidId = '@@@@@@@@@@@@@@@@@@@@@@@@@@@';

test('valid ksuid', () => {
	const { success } = safeParse(ksuid(), validId);

	expect(success).toBe(true);
	expect(() => parse(ksuid(), validId)).not.toThrowError();
});

test('invalid ksuid', () => {
	const { success } = safeParse(ksuid(), invalidId);

	expect(success).toBe(false);
	expect(() => parse(ksuid(), invalidId)).toThrowError(`Invalid type: Expected KSUID received "${invalidId}"`);
});

test('invalid ksuid, custom error string', () => {
	const errorMessage = 'Custom error message';

	const customSchema = ksuid(errorMessage);
	const { success } = safeParse(customSchema, invalidId);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidId)).toThrowError(errorMessage);
});

test('invalid ksuid, custom error callback', () => {
	const customSchema = ksuid((value) => `Custom error message, received ${value.received}`);
	const { success } = safeParse(customSchema, invalidId);

	expect(success).toBe(false);
	expect(() => parse(customSchema, invalidId)).toThrowError(`Custom error message, received "${invalidId}"`);
});
