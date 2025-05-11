import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node18',
		clean: isProduction,
		dts: isProduction,
		entry: ['index.ts', 'light.ts'],
		format: 'esm',
		minify: isProduction,
		treeshake: 'recommended',
	};
});
