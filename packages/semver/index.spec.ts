import { randomUUID } from 'node:crypto';
import { parse, safeParse } from 'valibot';
import { describe, expect, test } from 'vitest';
import { semver, semverRange } from './index.ts';

describe('semver version', () => {
	test('valid', () => {
		const version = '8.0.8';
		const { success } = safeParse(semver(), version);

		expect(success).toBe(true);
		expect(() => parse(semver(), version)).not.toThrowError();
	});

	test('invalid: short', () => {
		const version = '1.0';
		const { success } = safeParse(semver(), version);

		expect(success).toBe(false);
		expect(() => parse(semver(), version)).toThrowError(
			`Invalid type: Expected Semantic Versioning received "${version}"`,
		);
	});

	test('invalid: long', () => {
		const version = '6.1.7601.17514';
		const { success } = safeParse(semver(), version);

		expect(success).toBe(false);
		expect(() => parse(semver(), version)).toThrowError(
			`Invalid type: Expected Semantic Versioning received "${version}"`,
		);
	});

	test('invalid: custom error string', () => {
		const version = '6.1.7601.17514';
		const errorMessage = 'Custom error message';

		const { success } = safeParse(semver(errorMessage), version);

		expect(success).toBe(false);
		expect(() => parse(semver(errorMessage), version)).toThrowError(errorMessage);
	});

	test('invalid: custom error callback', () => {
		const version = '6.1.7601.17514';
		const customSchema = semver((value) => `Custom error message, received ${value.received}`);

		const { success } = safeParse(customSchema, version);

		expect(success).toBe(false);
		expect(() => parse(customSchema, version)).toThrowError(`Custom error message, received "${version}"`);
	});
});

describe('semver range', () => {
	test('valid range: simple', () => {
		const version = '^8.0.8';
		const { success } = safeParse(semverRange(), version);

		expect(success).toBe(true);
		expect(() => parse(semverRange(), version)).not.toThrowError();
	});

	test('valid range: complex', () => {
		const version = '>=1.0.0 <2.0.0 || >=4.0.0 <5.0.0';
		const { success } = safeParse(semverRange(), version);

		expect(success).toBe(true);
		expect(() => parse(semverRange(), version)).not.toThrowError();
	});

	test('invalid range', () => {
		const version = randomUUID();
		const { success } = safeParse(semverRange(), version);

		expect(success).toBe(false);
		expect(() => parse(semverRange(), version)).toThrowError();
	});

	test('invalid range: custom error string', () => {
		const version = randomUUID();
		const errorMessage = 'Custom error message';

		const { success } = safeParse(semverRange(errorMessage), version);

		expect(success).toBe(false);
		expect(() => parse(semverRange(errorMessage), version)).toThrowError(errorMessage);
	});

	test('invalid range: custom error callback', () => {
		const version = randomUUID();
		const customSchema = semverRange((value) => `Custom error message, received ${value.received}`);

		const { success } = safeParse(customSchema, version);

		expect(success).toBe(false);
		expect(() => parse(customSchema, version)).toThrowError(`Custom error message, received "${version}"`);
	});
});
