import { userInfo } from 'os'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({locals: {supabase} }) => {
    const {data, error} = await supabase.from('daily_message').select('message')
    if (error) {
        throw error
    }

    const { data: { user } } = await supabase.auth.getUser()

    return {
        daily_message: data[0].message,
        userInfo: user
  }
}