import KSUID from 'ksuid';
import { type CustomIssue, type CustomSchema, type ErrorMessage, type InferOutput, custom } from 'valibot';

// additional check required since KSUID.parse() accepts invalid Base62 strings
const BASE62_REGEX = /^[A-Za-z0-9+/]{27}$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && BASE62_REGEX.test(value) && KSUID.isValid(KSUID.parse(value).raw);
};

const message = (value: { received: string }): string => {
	return `Invalid KSUID, received ${value.received}`;
};

/**
 * A schema for validating KSUIDs {@see {@link https://github.com/segmentio/ksuid}}.
 */
export const ksuid: CustomSchema<string, ErrorMessage<CustomIssue> | undefined> = custom<string>(check, message);

export type KsuidSchema = InferOutput<typeof ksuid>;
