import { createClient } from '@supabase/supabase-js';
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/private';

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseAnonKey = VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) throw Error('No db keys');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
