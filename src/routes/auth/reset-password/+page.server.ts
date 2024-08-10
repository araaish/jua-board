// src/routes/reset_password/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { z } from 'zod';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { BASE_URL } from '$lib/constants.js';

const resetSchema = z.object({
	email: z.string().email()
});

export const actions = {
	reset_password: async ({ request, locals }) => {
		const resetForm = await superValidate(request, zod(resetSchema));

		if (!resetForm.valid) {
			return fail(400, { resetForm });
		}

		const email = resetForm.data.email as string;
		const { data, error: err } = await locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: BASE_URL + 'auth/change-password'
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return setError(resetForm, '', err.message, { status: 400 });
			}
			return setError(resetForm, '', 'Server error. Please try again later.', { status: 500 });
		}

		redirect(303, '/check-email');
	}
};

export async function load({ locals: { getSession } }) {
	const session = await getSession();
	if (session) {
		redirect(303, '/');
	}
	const resetForm = await superValidate(zod(resetSchema));

	return { resetForm };
}
