import { parse, safeParse } from 'valibot';
import { expect, test } from 'vitest';
import { spdx as spdxSchema, osi as osiSchema } from './index.ts';
import licenses from 'spdx-license-list';
import { randomUUID } from 'node:crypto';

const spdxLicenses = Object.keys(licenses);
const osiLicenses = Object.entries(licenses)
	.filter(([, value]) => value.osiApproved)
	.map(([key]) => key);

for (const license of spdxLicenses) {
	test(`valid SPDX identifier: ${license}`, () => {
		const { success } = safeParse(spdxSchema, license);

		expect(success).toBe(true);
		expect(() => parse(spdxSchema, license)).not.toThrowError();
	});
}

test('invalid SPDX identifier', () => {
	const license = randomUUID();
	const { success } = safeParse(spdxSchema, license);

	expect(success).toBe(false);
	expect(() => parse(osiSchema, license)).toThrowError(`Invalid SPDX identifier, received "${license}"`);
});

for (const license of osiLicenses) {
	test(`valid OSI approved SPDX identifier: ${license}`, () => {
		const { success } = safeParse(osiSchema, license);

		expect(success).toBe(true);
		expect(() => parse(osiSchema, license)).not.toThrowError();
	});
}

test('invalid SPDX identifier', () => {
	const license = randomUUID();
	const { success } = safeParse(osiSchema, license);

	expect(success).toBe(false);
	expect(() => parse(osiSchema, license)).toThrowError(`Invalid SPDX identifier, received "${license}"`);
});
