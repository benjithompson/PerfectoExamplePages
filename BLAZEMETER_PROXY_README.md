# BlazeMeter Proxy Server

This proxy server bypasses CORS restrictions when accessing the BlazeMeter API from browser-based JavaScript applications.

## Why is this needed?

BlazeMeter's API doesn't include CORS headers that allow direct access from browser JavaScript. Even though the API is public-facing, browsers block these requests for security reasons. This proxy server:

1. Accepts requests from your webpage
2. Forwards them to BlazeMeter API with proper authentication
3. Returns responses with CORS headers enabled

## Usage

### 1. Start the Proxy Server

```bash
python3 blazemeter-proxy.py
```

The proxy will run on `http://localhost:8001` by default.

### 2. Use the BlazeMeter Report Page

1. Open `examples/blazereport.html` in your browser
2. Make sure the **"Use Local Proxy Server"** checkbox is checked (enabled by default)
3. Enter your API URL and credentials
4. Click "Fetch Results"

The page will automatically route requests through the proxy server.

## How It Works

When the proxy is enabled, requests are formatted as:

```
http://localhost:8001?url=https://a.blazemeter.com/api/v4/masters/12345/reports/aggregatereport/data&api_key_id=YOUR_KEY&api_key_secret=YOUR_SECRET
```

The proxy:
- Validates the URL is a BlazeMeter API endpoint
- Adds Basic Authentication headers
- Forwards the request to BlazeMeter
- Returns the response with CORS headers

## Security Notes

- The proxy only allows BlazeMeter API URLs (validates `https://a.blazemeter.com/api/`)
- Credentials are sent as query parameters to the local proxy (not exposed to external networks)
- This is intended for local development only
- For production use, implement server-side API calls instead

## Troubleshooting

### "Failed to fetch" error with proxy enabled

Make sure the proxy server is running:
```bash
python3 blazemeter-proxy.py
```

You should see:
```
BlazeMeter Proxy Server running on http://localhost:8001
```

### Authentication errors (401/403)

- Verify your API Key ID and Secret are correct
- Check that your credentials have proper permissions in BlazeMeter
- Try the request with curl to verify credentials work:
  ```bash
  curl -u "KEY_ID:KEY_SECRET" "https://a.blazemeter.com/api/v4/masters/12345/reports/aggregatereport/data"
  ```

### Direct requests without proxy fail

This is expected! BlazeMeter's API blocks browser requests due to CORS. Either:
- Enable the proxy (recommended)
- Use "Load Sample Data" button for testing
- Implement server-side API calls in production

## Requirements

- Python 3.x (no additional packages required)
- Port 8001 available (or modify the port in `blazemeter-proxy.py`)
