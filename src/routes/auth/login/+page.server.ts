// src/routes/register/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { z } from 'zod';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, 'Passwords do not match');

export const actions = {
	register: async (event) => {
		const { request, locals } = event;
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		const email = registerForm.data.email as string;
		const password = registerForm.data.password as string;

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: email,
			password: password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
				return setError(registerForm, '', err.message, { status: 400 });
			}
			return setError(registerForm, '', 'Server error. Please try again later.', { status: 500 });
		}
		// signup for existing user returns an obfuscated/fake user object without identities https://supabase.com/docs/reference/javascript/auth-signup
		if (!err && !!data.user && !data.user.identities?.length) {
			return setError(registerForm, '', 'User already exists', { status: 409 });
		}
		redirect(303, '/check-email');
	},

	login: async (event) => {
		const { request, url, locals } = event;
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) {
			return fail(400, { loginForm });
		}

		const email = loginForm.data.email as string;
		const password = loginForm.data.password as string;

		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return setError(loginForm, '', err.message, { status: 400 });
			}
			return setError(loginForm, '', 'Server error. Please try again later.', { status: 500 });
		}

		redirect(307, '/');
	}
};

export async function load({ locals: { getSession } }) {
	const session = await getSession();
	// if the user is already logged in return them to the home page
	if (session) {
		redirect(303, '/');
	}

	// Different schemas, no id required.
	const registerForm = await superValidate(zod(registerSchema));
	const loginForm = await superValidate(zod(loginSchema));

	// Return them both
	return { registerForm, loginForm };
}
