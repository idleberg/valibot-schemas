import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { semver, semverRange } from './index.ts';

test('valid semver', () => {
	const version = '8.0.8';
	const { success } = safeParse(semver, version);

	expect(success).toBe(true);
});

test('invalid semver: short', () => {
	const version = '1.0';
	const { success } = safeParse(semver, version);

	expect(success).toBe(false);
	expect(() => parse(semver, version)).toThrowError(`Invalid type: Expected Semantic Versioning received "${version}"`);
});

test('invalid semver: long', () => {
	const version = '6.1.7601.17514';
	const { success } = safeParse(semver, version);

	expect(success).toBe(false);
	expect(() => parse(semver, version)).toThrowError(`Invalid type: Expected Semantic Versioning received "${version}"`);
});

test('valid semver range: simple', () => {
	const version = '^8.0.8';
	const { success } = safeParse(semverRange, version);

	expect(success).toBe(true);
});

test('valid semver range: complex', () => {
	const version = '>=1.0.0 <2.0.0 || >=4.0.0 <5.0.0';
	const { success } = safeParse(semverRange, version);

	expect(success).toBe(true);
});
