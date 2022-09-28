import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SUPABASE_ANON_KEY } from '$env/static/private';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseAnonKey = SECRET_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) throw Error('No db keys');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
