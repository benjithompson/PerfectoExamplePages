# JMeter Setup for Loadtest Data

## Quick Start (TL;DR)

1. **Run SQL**: Copy `supabase-jmeter-functions.sql` into Supabase SQL Editor and run it
2. **Add HTTP Request in JMeter**:
   - URL: `https://ssetwtfacvbknkzghdib.supabase.co/rest/v1/rpc/track_request`
   - Method: POST
   - Headers: `apikey`, `Authorization: Bearer`, `Content-Type: application/json`
   - Body: `{"p_session_id": "${SESSION_ID}", "p_user_agent": "JMeter", "p_parameters": {"your_field": "your_value"}}`
3. **Run test** → View results at `loadtest.html`

**That's it!** One SQL setup, one HTTP request per iteration. The `p_parameters` object can contain any fields you want to track.

---

## Important: JavaScript Limitation

⚠️ **JMeter does not execute JavaScript** by default. When JMeter makes an HTTP request to the `loadtest.html` page, it only receives the HTML source code - it does **not** run the JavaScript that inserts data into Supabase.

Therefore, for JMeter integration, you must use **direct Supabase REST API calls**.

## Direct Supabase API Integration

### Step 1: Create the PostgreSQL Function

In your Supabase SQL Editor, run the SQL from `supabase-jmeter-functions.sql`. This creates a function called `track_request` that handles everything in one call:
- Increments session count (for Total Requests)
- Tracks all parameters and their values
- Handles both new and existing records

### Step 2: Get Your Credentials

From your `supabase-config.js` file:
- **Supabase URL**: `https://ssetwtfacvbknkzghdib.supabase.co`
- **Anon Key**: Your public anon key (safe to use in JMeter)

### Step 3: Single JMeter HTTP Request (Recommended)

**HTTP Request Configuration:**
```
Name: Track Request
Method: POST
Server: ssetwtfacvbknkzghdib.supabase.co
Path: /rest/v1/rpc/track_request
```

**Headers (Add via HTTP Header Manager):**
```
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
```

**Body Data (JSON):**
```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter-Thread-${__threadNum}",
  "p_parameters": {
    "username": "${USERNAME}",
    "password": "${PASSWORD}"
  }
}
```

**That's it!** This single request:
- ✅ Increments the session count (updates Total Requests)
- ✅ Tracks all parameters you define in `p_parameters`
- ✅ Handles both INSERT and UPDATE automatically

**Note:** The `p_parameters` object is completely flexible - add any key-value pairs you want to track. You can even omit it entirely if you only want to track sessions:

```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter"
}
```

### Step 4: Complete JMeter Test Plan Structure

**Simple Structure - Just ONE HTTP Request:**

```
Thread Group
├── User Defined Variables
│   ├── SUPABASE_URL = ssetwtfacvbknkzghdib.supabase.co
│   ├── SUPABASE_KEY = YOUR_ANON_KEY
│   ├── SESSION_ID = thread_${__threadNum}
│   ├── USER_ID = user_${__Random(1,1000,)}
│
├── HTTP Header Manager (applies to all requests below)
│   ├── apikey: ${SUPABASE_KEY}
│   ├── Authorization: Bearer ${SUPABASE_KEY}
│   ├── Content-Type: application/json
│
└── HTTP Request - Track Request (ALL-IN-ONE)
    ├── Method: POST
    ├── Server: ${SUPABASE_URL}
    ├── Path: /rest/v1/rpc/track_request
    ├── Body: 
        {
          "p_session_id": "${SESSION_ID}",
          "p_user_agent": "JMeter-Thread-${__threadNum}",
          "p_parameters": {
            "username": "${USERNAME}",
            "password": "${PASSWORD}"
          }
        }
```

**That's it!** Each iteration will:
- ✅ Increment the session count (Total Requests)
- ✅ Track all parameters in `p_parameters` (completely customizable)
- ✅ Update first_seen/last_seen timestamps
- ✅ Handle both new and existing records automatically

**Note:** `p_parameters` can contain ANY fields you want to track. Common examples:
- Login credentials: `username`, `password`
- Form data: `firstName`, `lastName`, `email`
- Test data: `orderId`, `productId`, `quantity`
- Metadata: `testRun`, `environment`, `iteration`

## Variables to Use in JMeter

Create these in a "User Defined Variables" config element:

```
SUPABASE_URL: ssetwtfacvbknkzghdib.supabase.co (without https://)
SUPABASE_KEY: YOUR_ANON_KEY_HERE
SESSION_ID: thread_${__threadNum}
```

**Add your own custom variables** for whatever you want to track in `p_parameters`:
```
USERNAME: ${__CSVRead(users.csv,0)}
PASSWORD: ${__CSVRead(users.csv,1)}
ORDER_ID: order_${__UUID}
PRODUCT_ID: ${__Random(1,100,)}
```

**Important Notes:**
- **SESSION_ID**: Using `thread_${__threadNum}` means each thread has its own session
  - All iterations within a thread count as requests from the same session
  - Total Requests = number of threads × number of iterations per thread
- If you want each iteration to be a NEW session, use: `thread_${__threadNum}_${__RandomString(8,abcdefghijklmnopqrstuvwxyz0123456789,)}`

### Adding Custom Parameters

The `p_parameters` object is **completely flexible** - you can track any data you want:

**Example 1: Login Test**
```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter",
  "p_parameters": {
    "username": "${USERNAME}",
    "password": "${PASSWORD}",
    "loginType": "standard"
  }
}
```

**Example 2: E-commerce Test**
```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter",
  "p_parameters": {
    "productId": "${PRODUCT_ID}",
    "quantity": "${QUANTITY}",
    "paymentMethod": "credit_card"
  }
}
```

**Example 3: API Test**
```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter",
  "p_parameters": {
    "endpoint": "/api/users",
    "method": "POST",
    "statusCode": "${STATUS_CODE}"
  }
}
```

**Example 4: Session-only (no parameters)**
```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter"
}
```

All parameters will appear in the Request Parameters table on the dashboard, showing you:
- Which values were used most frequently
- First and last time each value was seen
- How many times each value appeared

## Verification

### Test with curl (Optional)

Before setting up JMeter, you can test the function with curl:

```bash
curl -X POST 'https://ssetwtfacvbknkzghdib.supabase.co/rest/v1/rpc/track_request' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "p_session_id": "test_session_1",
    "p_user_agent": "curl_test",
    "p_parameters": {
      "user": "test_user",
      "action": "test"
    }
  }'
```

If successful, you'll see an empty response (HTTP 204 or 200). Then check `loadtest.html` to see the data!

### After Running JMeter Test

1. Open `loadtest.html` in a browser (or visit your GitHub Pages URL)
2. You should see:
   - **Total Requests**: Number of iterations you ran
   - **Unique Parameters**: All the parameter names you tracked
   - **Request Parameters table**: Each parameter with its values and counts
   - **Session Data table**: Your JMeter session(s) with request counts

## Troubleshooting

**Total Requests showing 0:**
- ⚠️ Make sure you ran the SQL from `supabase-jmeter-functions.sql` to create the `track_request` function
- Verify you're calling `/rest/v1/rpc/track_request` (not the old individual functions)
- Check that you're passing `p_session_id` in the request body

**401 Unauthorized:**
- Check your anon key is correct in the headers
- Verify RLS policies allow public access (run the SQL from SUPABASE_SETUP.md)
- Make sure the function has GRANT EXECUTE permissions (included in supabase-jmeter-functions.sql)

**Function does not exist:**
- Make sure you ran the SQL from `supabase-jmeter-functions.sql` in Supabase SQL Editor
- Function name must be exactly: `track_request`
- Check the verification query at the end of the SQL file

**No data appearing:**
- Check JMeter View Results Tree for error responses
- Look at the response body for Supabase error messages
- Verify you're using POST method (not GET)
- Check that Content-Type header is `application/json`
- Make sure the JSON body is valid (use a JSON validator)

**Parameters not showing:**
- Verify `p_parameters` is a valid JSON object in the request body
- Each key-value pair in `p_parameters` becomes a tracked parameter
- Check that the JSON is properly formatted with quotes around keys and string values

**Example of a working request body:**
```json
{
  "p_session_id": "thread_1",
  "p_user_agent": "JMeter",
  "p_parameters": {
    "username": "john.doe@example.com",
    "environment": "staging"
  }
}
```

Or with no parameters (just tracking sessions):
```json
{
  "p_session_id": "thread_1",
  "p_user_agent": "JMeter"
}
```

---

## Quick Reference Card

### JMeter HTTP Request Setup

| Setting | Value |
|---------|-------|
| **Method** | POST |
| **Server** | `ssetwtfacvbknkzghdib.supabase.co` |
| **Path** | `/rest/v1/rpc/track_request` |
| **Header: apikey** | `YOUR_ANON_KEY` |
| **Header: Authorization** | `Bearer YOUR_ANON_KEY` |
| **Header: Content-Type** | `application/json` |

### Request Body Template

```json
{
  "p_session_id": "${SESSION_ID}",
  "p_user_agent": "JMeter-Thread-${__threadNum}",
  "p_parameters": {
    "username": "${USERNAME}",
    "password": "${PASSWORD}"
  }
}
```

**Customize `p_parameters` with ANY fields you want to track!**

Examples:
- `"username": "${USERNAME}"` - Track which usernames are being tested
- `"orderId": "${ORDER_ID}"` - Track order IDs in e-commerce tests  
- `"endpoint": "/api/login"` - Track which API endpoints are hit
- `"iteration": "${__iterationNum}"` - Track iteration numbers
- Or leave it empty: `"p_parameters": {}` to only track sessions

### What Gets Tracked

- **Session Count** → Shows as "Total Requests" on dashboard
- **Each parameter** → Shows in "Request Parameters" table with individual counts
- **First/Last Seen** → Automatically tracked with timestamps

### Test Results

View at: `http://localhost:8888/loadtest.html` or your GitHub Pages URL
