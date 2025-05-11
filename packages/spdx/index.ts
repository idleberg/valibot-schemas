import licenses from 'spdx-license-list';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

type License = {
	name: string;
	url: string;
	osiApproved: boolean;
};

const licenseIds = Object.keys(licenses);
const osiIds = Object.entries(licenses)
	.filter(([, value]) => value.osiApproved)
	.map(([key]) => key);

const checkWithFilter = (value: unknown, osiOnly: boolean): boolean => {
	const validIds = osiOnly ? osiIds : licenseIds;

	return typeof value === 'string' && validIds.includes(value);
};

const defaultMessage = (value: { received: string }): string => {
	return `Invalid type: Expected SPDX identifier received ${value.received}`;
};

/**
 * A schema for validating SPDX identifiers {@see {@link https://spdx.github.io/}}.
 */
export const spdx = (overrideMessage?: string | ((value: CustomIssue) => string)) => {
	const check = (value: unknown) => checkWithFilter(value, false);
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};
/**
 * A schema for validating OSI-approved SPDX identifiers {@see {@link https://opensource.org/licenses/}}.
 */
// export const osi: CustomSchema<string, ErrorMessage<CustomIssue> | undefined> = custom<string>(
// 	(value) => checkWithFilter(value, true),
// 	message,
// );

export const osi = (overrideMessage?: string | ((value: CustomIssue) => string)) => {
	const check = (value: unknown) => checkWithFilter(value, true);
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string, ErrorMessage<CustomIssue>>(check, message);
};

export type SpdxSchema = InferOutput<ReturnType<typeof spdx>>;
export type OsiSchema = InferOutput<ReturnType<typeof osi>>;
