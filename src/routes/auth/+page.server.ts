import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError, type Provider } from '@supabase/supabase-js'

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()

  /* User is already logged in. */
  if (session) throw redirect(303, '/app')
}

export const actions = {
    logout: async ({ locals: { supabase } }) => {
        await supabase.auth.signOut()
        throw redirect(303, '/')
      }
}