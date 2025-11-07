# Supabase Setup Guide for Loadtest Data

## 1. Create a Supabase Project

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
-- Create session table
CREATE TABLE session (
  id INTEGER PRIMARY KEY,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_requests INTEGER DEFAULT 0
);

-- Insert initial session
INSERT INTO session (id, start_time, total_requests) 
VALUES (1, NOW(), 0);

-- Create request_counts table
CREATE TABLE request_counts (
  parameter_name TEXT NOT NULL,
  parameter_value TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (parameter_name, parameter_value)
);

-- Create function to increment total requests
CREATE OR REPLACE FUNCTION increment_total_requests()
RETURNS void AS $$
BEGIN
  UPDATE session SET total_requests = total_requests + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE session ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_counts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for public access)
CREATE POLICY "Allow all access to session" ON session
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to request_counts" ON request_counts
  FOR ALL USING (true) WITH CHECK (true);
```

4. Click "Run" to execute

## 3. Get Your API Credentials

1. Go to **Settings** → **API**
2. Find and copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 4. Configure the Loadtest Page

1. Open the loadtest page in your browser
2. Click the **⚙️ Config** button in the header
3. Paste:
   - **Supabase URL**: Your project URL
   - **Supabase Anon Key**: Your anon public key
4. Check **"Enable Supabase"**
5. Click **Save**

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

JMeter can POST directly to Supabase REST API:

**URL**: `https://YOUR_PROJECT.supabase.co/rest/v1/request_counts`

**Headers**:
```
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
Prefer: resolution=merge-duplicates
```

**Body**:
```json
{
  "parameter_name": "user",
  "parameter_value": "test1",
  "count": 1,
  "first_seen": "2025-11-07T12:00:00Z",
  "last_seen": "2025-11-07T12:00:00Z"
}
```

## Features

✅ **Real-time Updates**: Dashboard auto-updates when data changes
✅ **Cross-browser Sync**: Data shared across all sessions
✅ **JMeter Compatible**: Direct API access for load testing
✅ **Free Tier**: 500MB storage, unlimited API requests
✅ **Automatic Fallback**: Uses localStorage if Supabase is disabled

## Troubleshooting

**"Failed to load data"**:
- Check your API credentials are correct
- Verify tables were created successfully
- Check browser console for errors

**"Permission denied"**:
- Make sure RLS policies were created
- Verify the policies allow public access

**Data not updating**:
- Check Supabase is enabled in config
- Verify your API key is correct
- Look for errors in browser console
