# Supabase Setup Guide for Loadtest Data

## Why Supabase?

- ✅ **No manual configuration**: Set it up once in the repo, works for everyone
- ✅ **JMeter ready**: JMeter uses the same GitHub Pages URL, no separate auth needed
- ✅ **Real-time updates**: Dashboard auto-refreshes when data changes
- ✅ **Cross-session data**: All test runs accumulate in one database
- ✅ **Free tier**: 500MB storage, unlimited API requests
- ✅ **Public anon key is safe**: Security enforced by Row Level Security

## Quick Setup (5 minutes)

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: loadtest-data (or any name)
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for project to be ready

## 2. Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create request_counts table
CREATE TABLE request_counts (
  parameter_name TEXT NOT NULL,
  parameter_value TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (parameter_name, parameter_value)
);

-- Create sessions table
CREATE TABLE sessions (
  session_id TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE request_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for public access)
CREATE POLICY "Allow all access to request_counts" ON request_counts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to sessions" ON sessions
  FOR ALL USING (true) WITH CHECK (true);
```

4. Click "Run" to execute

## 3. Get Your API Credentials

1. Go to **Settings** → **API**
2. Find and copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 4. Configure the Loadtest Page

### Option A: Repository Configuration (Recommended for GitHub Pages)

1. Open `examples/supabase-config.js` in your code editor
2. Replace the placeholder values:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://xxxxx.supabase.co', // Your project URL
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Your anon key
     enabled: true // Set to true to enable
   };
   ```
3. Commit and push to GitHub
4. The configuration is now available to all users and JMeter

**Benefits:**
- ✅ No manual configuration needed by users
- ✅ JMeter can access the same endpoint
- ✅ Configuration persists across deployments
- ✅ Anon key is safe to commit (security via RLS)

### Option B: Manual Browser Configuration (Testing/Development)

1. Open the loadtest page in your browser
2. Click the **⚙️ Config** button in the header
3. Paste:
   - **Supabase URL**: Your project URL
   - **Supabase Anon Key**: Your anon public key
4. Click **Save**

**Note:** This configuration is saved in the browser and only affects your local testing. For production, use Option A.

## 5. Test It Out

1. Visit the loadtest page with parameters:
   ```
   loadtest.html?user=test1&session=abc123&action=view
   ```

2. Check your Supabase Dashboard:
   - Go to **Table Editor**
   - Select `request_counts` table
   - You should see your parameters!

## 6. For JMeter Integration

⚠️ **Important**: JMeter does **not** execute JavaScript. Hitting the HTML page directly won't work because the data insertion happens via JavaScript.

For JMeter load testing, you must use **direct Supabase API calls**.

📖 **See [JMETER_SETUP.md](JMETER_SETUP.md) for complete JMeter integration instructions.**

Quick summary:
1. Create PostgreSQL functions in Supabase for incrementing counts
2. Call these functions via Supabase REST API from JMeter
3. Use the `loadtest.html` page in a browser to view the results

## Features

✅ **Real-time Updates**: Dashboard auto-updates when data changes  
✅ **Cross-session Sync**: Data shared across all clients and browsers  
✅ **JMeter Compatible**: Direct API access for load testing  
✅ **Free Tier**: 500MB storage, unlimited API requests  
✅ **Session Tracking**: Unique session IDs track individual clients/threads

## Troubleshooting

**"Failed to load data"**:
- Check your API credentials are correct in `supabase-config.js`
- Verify tables were created successfully (both `request_counts` and `sessions`)
- Check browser console for errors

**"Permission denied"**:
- Make sure RLS policies were created for both tables
- Verify the policies allow public access (`FOR ALL USING (true)`)

**Data not updating**:
- Verify Supabase config is enabled (`enabled: true`)
- Check your API URL and anon key are correct
- Look for errors in browser console
- Ensure the page URL includes query parameters
