import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import { z } from 'zod';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const changePasswordSchema = z.object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.newPassword === data.confirmPassword, 'Passwords do not match');

export const actions = {
    change_password: async ({ request, locals }) => {
        const changePasswordForm = await superValidate(request, zod(changePasswordSchema));
        if (!changePasswordForm.valid) {
			return fail(400, { changePasswordForm });
        }
        const password = changePasswordForm.data.newPassword as string;
        const { data, error: err } = await locals.supabase.auth.updateUser({
            password
        })

        if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return setError(changePasswordForm, '', err.message, { status: 400 });
			}
			return setError(changePasswordForm, '', 'Server error. Please try again later.', { status: 500 });
		}

        redirect(303, "/");
    },
}

export async function load({locals: { getSession } }) {
    const session = await getSession();
    // if the user is not logged in redirect back to the home page
    if (!session) {
        redirect(303, '/');
    }

    const changePasswordForm = await superValidate(zod(changePasswordSchema));
    return { changePasswordForm };
  }