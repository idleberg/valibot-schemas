import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { semver } from './light.ts';

test('valid semver', () => {
	const version = '8.0.8';
	const { success } = safeParse(semver, version);

	expect(success).toBe(true);
});

test('invalid semver: short', () => {
	const version = '1.0';
	const { success } = safeParse(semver, version);

	expect(success).toBe(false);
	expect(() => parse(semver, version)).toThrowError(`Invalid Semantic Versioning, received "${version}"`);
});

test('invalid semver: long', () => {
	const version = '6.1.7601.17514';
	const { success } = safeParse(semver, version);

	expect(success).toBe(false);
	expect(() => parse(semver, version)).toThrowError(`Invalid Semantic Versioning, received "${version}"`);
});
