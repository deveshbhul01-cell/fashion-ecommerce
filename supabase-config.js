const SUPABASE_URL = "https://yrbafbqzbbvshauxfuki.supabase.co";

const SUPABASE_ANON_KEY = "process.env. SUPABASE_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
