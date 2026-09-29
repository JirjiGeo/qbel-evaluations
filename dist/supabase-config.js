// Supabase Configuration
// Get these values from your Supabase project: Settings > API > Project Settings
window.SUPABASE_CONFIG = {
  url: 'https://bvvfxudgweuautiyhoqf.supabase.co',
  anonKey: 'sb_publishable_jeZAkqmUb0Duh0bQDlYpxw_XbFL0CFK'
};

// Initialize Supabase client
let supabaseClient = null;

// Wait for Supabase library to load
if (typeof supabase !== 'undefined' && supabase.createClient) {
  const { createClient } = supabase;
  supabaseClient = window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey 
    ? createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
    : null;
  window.supabaseClient = supabaseClient;
} else {
  // Retry when library loads
  const checkLibrary = setInterval(() => {
    if (typeof supabase !== 'undefined' && supabase.createClient) {
      const { createClient } = supabase;
      supabaseClient = window.SUPABASE_CONFIG.url && window.SUPABASE_CONFIG.anonKey 
        ? createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
        : null;
      window.supabaseClient = supabaseClient;
      clearInterval(checkLibrary);
    }
  }, 100);
}

// Auth state
let currentUser = null;
