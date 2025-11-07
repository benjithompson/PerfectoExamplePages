# JMeter Setup for Loadtest Data

## Important: JavaScript Limitation

⚠️ **JMeter does not execute JavaScript** by default. When JMeter makes an HTTP request to the `loadtest.html` page, it only receives the HTML source code - it does **not** run the JavaScript that inserts data into Supabase.

Therefore, for JMeter integration, you must use **direct Supabase REST API calls**.

## Direct Supabase API Integration

### Step 1: Get Your Credentials

From your `supabase-config.js` file:
- **Supabase URL**: `https://ssetwtfacvbknkzghdib.supabase.co`
- **Anon Key**: Your public anon key (safe to use in JMeter)

### Step 2: JMeter HTTP Request Setup for Request Counts

#### A. Track Request Parameters

**HTTP Request Configuration:**
```
Name: Track Request Parameter
Method: POST
Server: ssetwtfacvbknkzghdib.supabase.co
Path: /rest/v1/request_counts
```

**Headers (Add via HTTP Header Manager):**
```
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
Prefer: resolution=merge-duplicates
```

**Body Data (JSON):**
```json
{
  "parameter_name": "user",
  "parameter_value": "${USER_ID}",
  "count": 1,
  "first_seen": "${__time(yyyy-MM-dd'T'HH:mm:ss.SSS'Z',)}",
  "last_seen": "${__time(yyyy-MM-dd'T'HH:mm:ss.SSS'Z',)}"
}
```

**Note:** The `Prefer: resolution=merge-duplicates` header tells Supabase to automatically handle increments on conflict (using the composite primary key).

#### B. Track Session

**HTTP Request Configuration:**
```
Name: Track Session
Method: POST
Server: ssetwtfacvbknkzghdib.supabase.co
Path: /rest/v1/sessions
```

**Headers:**
```
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
Prefer: resolution=merge-duplicates
```

**Body Data (JSON):**
```json
{
  "session_id": "${SESSION_ID}",
  "count": 1,
  "first_seen": "${__time(yyyy-MM-dd'T'HH:mm:ss.SSS'Z',)}",
  "last_seen": "${__time(yyyy-MM-dd'T'HH:mm:ss.SSS'Z',)}",
  "user_agent": "Apache-HttpClient/JMeter"
}
```

### Step 3: Better Approach - Use Upsert with Increment

Unfortunately, Supabase's `merge-duplicates` doesn't automatically increment counts. We need a different approach using **PostgreSQL functions** or **client-side logic**.

#### Option A: Create a PostgreSQL Function (Recommended)

In your Supabase SQL Editor, create this function:

```sql
-- Function to increment request count
CREATE OR REPLACE FUNCTION increment_request_count(
  p_parameter_name TEXT,
  p_parameter_value TEXT
)
RETURNS void AS $$
BEGIN
  INSERT INTO request_counts (parameter_name, parameter_value, count, first_seen, last_seen)
  VALUES (p_parameter_name, p_parameter_value, 1, NOW(), NOW())
  ON CONFLICT (parameter_name, parameter_value)
  DO UPDATE SET
    count = request_counts.count + 1,
    last_seen = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment session count
CREATE OR REPLACE FUNCTION increment_session_count(
  p_session_id TEXT,
  p_user_agent TEXT
)
RETURNS void AS $$
BEGIN
  INSERT INTO sessions (session_id, count, first_seen, last_seen, user_agent)
  VALUES (p_session_id, 1, NOW(), NOW(), p_user_agent)
  ON CONFLICT (session_id)
  DO UPDATE SET
    count = sessions.count + 1,
    last_seen = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Then in JMeter, call the function via RPC:

**For Request Counts:**
```
Method: POST
Server: ssetwtfacvbknkzghdib.supabase.co
Path: /rest/v1/rpc/increment_request_count

Headers:
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json

Body:
{
  "p_parameter_name": "user",
  "p_parameter_value": "${USER_ID}"
}
```

**For Sessions:**
```
Method: POST
Server: ssetwtfacvbknkzghdib.supabase.co
Path: /rest/v1/rpc/increment_session_count

Headers:
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json

Body:
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "Apache-HttpClient/JMeter"
}
```

### Step 4: Complete JMeter Test Plan Structure

```
Thread Group
├── User Defined Variables
│   ├── SUPABASE_URL = ssetwtfacvbknkzghdib.supabase.co
│   ├── SUPABASE_KEY = YOUR_ANON_KEY
│   ├── SESSION_ID = session_jmeter_${__threadNum}_${__time(,)}
│
├── HTTP Header Manager
│   ├── apikey: ${SUPABASE_KEY}
│   ├── Authorization: Bearer ${SUPABASE_KEY}
│   ├── Content-Type: application/json
│
├── HTTP Request - Increment Session Count
│   ├── Method: POST
│   ├── Path: /rest/v1/rpc/increment_session_count
│   ├── Body: {"p_session_id": "${SESSION_ID}", "p_user_agent": "JMeter"}
│
├── HTTP Request - Track user parameter
│   ├── Method: POST
│   ├── Path: /rest/v1/rpc/increment_request_count
│   ├── Body: {"p_parameter_name": "user", "p_parameter_value": "${USER_ID}"}
│
├── HTTP Request - Track session parameter
│   ├── Method: POST
│   ├── Path: /rest/v1/rpc/increment_request_count
│   ├── Body: {"p_parameter_name": "session", "p_parameter_value": "${SESSION_ID}"}
│
└── HTTP Request - Track action parameter
    ├── Method: POST
    ├── Path: /rest/v1/rpc/increment_request_count
    ├── Body: {"p_parameter_name": "action", "p_parameter_value": "view"}
```

## Variables to Use in JMeter

```
USER_ID: ${__Random(1,1000,)}
SESSION_ID: thread_${__threadNum}_${__time(,)}
```

## Verification

After running your JMeter test:
1. Open `loadtest.html` in a browser
2. You should see the data populated from your JMeter test
3. Check the "Session Data" table to see your JMeter sessions

## Troubleshooting

**401 Unauthorized:**
- Check your anon key is correct
- Verify RLS policies allow public access

**Function does not exist:**
- Make sure you created the PostgreSQL functions in Supabase SQL Editor
- Check function names match exactly

**No data appearing:**
- Verify the functions were created successfully
- Check JMeter View Results Tree for error responses
- Look at the response body for Supabase error messages
