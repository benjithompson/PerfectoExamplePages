// Supabase Configuration
// Note: The anon key is SAFE to expose publicly - it's designed for client-side use
// Security is enforced by Supabase Row Level Security (RLS) policies on the server
// 
// This file should be committed to your repository so that:
// 1. All users get automatic configuration
// 2. JMeter can access the same endpoint without separate auth
// 3. GitHub Pages deployment works immediately
//
// Replace these values with your Supabase project credentials:

window.SUPABASE_CONFIG = {
  url: 'https://ssetwtfacvbknkzghdib.supabase.co', // e.g., https://xxxxx.supabase.co
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZXR3dGZhY3Zia25remdoZGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1Mzg5MzQsImV4cCI6MjA3ODExNDkzNH0.HLyFH1mRst6u6DDAMcaNzRp6c829qf5wcWQEA9C9uXw', // Public anon key - SAFE to commit
  enabled: false // Set to true once configured
};

// Setup Instructions:
// 1. Create a Supabase project at https://supabase.com (free tier)
// 2. Run the SQL from SUPABASE_SETUP.md to create tables
// 3. Get your URL and anon key from Settings → API in Supabase dashboard
// 4. Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY above
// 5. Set enabled to true
// 6. Commit and push to GitHub
// 
// That's it! The page and JMeter will both work automatically.
//
// Security Notes:
// - The anon key is client-safe (designed for browsers/mobile apps)
// - All security is enforced by RLS policies in Supabase
// - Never commit your service_role key (but anon key is fine!)
