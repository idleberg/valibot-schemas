import KSUID from 'ksuid';
import { type InferOutput, custom } from 'valibot';

// additional check required since KSUID.parse() accepts invalid Base62 strings
const BASE62_REGEX = /^[A-Za-z0-9+/]{27}$/;

const check = (value: unknown): boolean => {
	return typeof value === 'string' && BASE62_REGEX.test(value) && KSUID.isValid(KSUID.parse(value).raw);
};

const defaultMessage = (value: { received: string }): string => {
	return `Invalid type: Expected KSUID received ${value.received}`;
};

/**
 * Creates a schema for validating KSUIDs with customizable error messages.
 * @param overrideMessage - A string to override the default message or a callback to define a custom message function.
 * @returns A custom schema for KSUID validation.
 */
export const ksuid = (overrideMessage?: string | ((value: { received: string }) => string)) => {
	const message = typeof overrideMessage === 'string' ? () => overrideMessage : overrideMessage || defaultMessage;

	return custom<string>(check, message);
};

export type KsuidSchema = InferOutput<ReturnType<typeof ksuid>>;
