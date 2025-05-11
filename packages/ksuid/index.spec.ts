import KSUID from 'ksuid';
import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { ksuid as schema } from './index.ts';

test('valid ksuid', () => {
	const ksuid = KSUID.randomSync();
	const { success } = safeParse(schema, ksuid.string);

	expect(success).toBe(true);
	expect(() => parse(schema, ksuid.string)).not.toThrowError();
});

test('invalid ksuid', () => {
	const ksuid = '@@@@@@@@@@@@@@@@@@@@@@@@@@@';
	const { success } = safeParse(schema, ksuid);

	expect(success).toBe(false);
	expect(() => parse(schema, ksuid)).toThrowError(`Invalid KSUID, received "${ksuid}"`);
});
