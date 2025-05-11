import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		workspace: [
			'packages/*',
			{
				extends: true,
				test: {
					include: ['**/*.spec.ts'],
				},
			},
		],
	},
});
