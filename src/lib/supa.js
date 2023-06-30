import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_KEY
)

export const createOrder = async (order) => {
  const { data, error } = await supabase.from('orders').insert(order).select()
  if (error) {
    console.log(error)
    throw error
  }
  return data
}
