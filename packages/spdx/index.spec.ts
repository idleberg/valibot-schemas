import { randomUUID } from 'node:crypto';
import licenses from 'spdx-license-list';
import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { osi as osiSchema, spdx as spdxSchema } from './index.ts';
import { describe } from 'node:test';

const spdxLicenses = Object.keys(licenses);
const osiLicenses = Object.entries(licenses)
	.filter(([, value]) => value.osiApproved)
	.map(([key]) => key);

describe('spdx', () => {
	for (const license of spdxLicenses) {
		test(`valid spdx identifier: ${license}`, () => {
			const { success } = safeParse(spdxSchema(), license);

			expect(success).toBe(true);
			expect(() => parse(spdxSchema(), license)).not.toThrowError();
		});
	}

	test('invalid spdx identifier', () => {
		const license = randomUUID();
		const { success } = safeParse(spdxSchema(), license);

		expect(success).toBe(false);
		expect(() => parse(spdxSchema(), license)).toThrowError(
			`Invalid type: Expected SPDX identifier received "${license}"`,
		);
	});

	test('invalid spdx identifier: custom error string', () => {
		const license = randomUUID();
		const errorMessage = 'Custom error message';

		const { success } = safeParse(spdxSchema(errorMessage), license);

		expect(success).toBe(false);
		expect(() => parse(spdxSchema(errorMessage), license)).toThrowError(errorMessage);
	});

	test('invalid spdx identifier: custom error callback', () => {
		const license = randomUUID();
		const customSchema = spdxSchema((value) => `Custom error message, received ${value.received}`);

		const { success } = safeParse(customSchema, license);

		expect(success).toBe(false);
		expect(() => parse(customSchema, license)).toThrowError(`Custom error message, received "${license}"`);
	});
});

describe('osi', () => {
	for (const license of osiLicenses) {
		test(`valid spdx identifier: ${license}`, () => {
			const { success } = safeParse(osiSchema(), license);

			expect(success).toBe(true);
			expect(() => parse(osiSchema(), license)).not.toThrowError();
		});
	}

	test('invalid spdx identifier', () => {
		const license = randomUUID();
		const { success } = safeParse(osiSchema(), license);

		expect(success).toBe(false);
		expect(() => parse(osiSchema(), license)).toThrowError(
			`Invalid type: Expected SPDX identifier received "${license}"`,
		);
	});

	test('invalid spdx identifier: custom error string', () => {
		const license = randomUUID();
		const errorMessage = 'Custom error message';

		const { success } = safeParse(osiSchema(errorMessage), license);

		expect(success).toBe(false);
		expect(() => parse(osiSchema(errorMessage), license)).toThrowError(errorMessage);
	});

	test('invalid spdx identifier: custom error callback', () => {
		const license = randomUUID();
		const customSchema = osiSchema((value) => `Custom error message, received ${value.received}`);

		const { success } = safeParse(customSchema, license);

		expect(success).toBe(false);
		expect(() => parse(customSchema, license)).toThrowError(`Custom error message, received "${license}"`);
	});
});
