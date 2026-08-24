const SUPABASE_URL = "https://yrbafbqzbbvshauxfuki.supabase.co";

const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
