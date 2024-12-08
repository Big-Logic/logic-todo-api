import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.PUBLIC_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
