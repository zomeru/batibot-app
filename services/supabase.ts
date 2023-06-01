import { supabase } from '~utils/supabase';

export const findOrCreateUser = async (email: string, uuid: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!data) {
    await supabase.from('users').insert([
      {
        email,
        uuid,
      },
    ]);
  }

  return [data, error];
};
