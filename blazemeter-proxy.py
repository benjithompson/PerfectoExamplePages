#!/usr/bin/env python3
"""
BlazeMeter API Proxy Server
Forwards requests to BlazeMeter API with proper authentication and CORS headers.
Usage: python3 blazemeter-proxy.py
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.request
import urllib.error
import json
import base64
from urllib.parse import urlparse, parse_qs

class BlazeMeterProxyHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        """Handle GET requests and proxy to BlazeMeter API"""
        try:
            # Parse query parameters
            parsed_path = urlparse(self.path)
            query_params = parse_qs(parsed_path.query)
            
            # Extract parameters
            api_url = query_params.get('url', [None])[0]
            api_key_id = query_params.get('api_key_id', [None])[0]
            api_key_secret = query_params.get('api_key_secret', [None])[0]
            
            if not api_url:
                self.send_error_response(400, 'Missing required parameter: url')
                return
            
            # Validate URL is a BlazeMeter API endpoint
            if not api_url.startswith('https://a.blazemeter.com/api/'):
                self.send_error_response(403, 'Only BlazeMeter API URLs are allowed')
                return
            
            # Create request to BlazeMeter API
            headers = {
                'Accept': 'application/json',
                'User-Agent': 'BlazeMeter-Proxy/1.0'
            }
            
            # Add authentication if provided
            if api_key_id and api_key_secret:
                credentials = f"{api_key_id}:{api_key_secret}"
                encoded_credentials = base64.b64encode(credentials.encode()).decode()
                headers['Authorization'] = f"Basic {encoded_credentials}"
            
            # Make request to BlazeMeter API
            req = urllib.request.Request(api_url, headers=headers)
            
            try:
                with urllib.request.urlopen(req) as response:
                    data = response.read()
                    content_type = response.headers.get('Content-Type', 'application/json')
                    
                    # Send successful response
                    self.send_response(200)
                    self.send_cors_headers()
                    self.send_header('Content-Type', content_type)
                    self.send_header('Content-Length', len(data))
                    self.end_headers()
                    self.wfile.write(data)
                    
            except urllib.error.HTTPError as e:
                # Forward HTTP errors from BlazeMeter
                error_body = e.read().decode('utf-8', errors='ignore')
                try:
                    error_json = json.loads(error_body)
                    error_message = error_json.get('error', {}).get('message', str(e))
                except:
                    error_message = error_body if error_body else str(e)
                
                self.send_error_response(e.code, f"BlazeMeter API Error: {error_message}")
                
            except urllib.error.URLError as e:
                self.send_error_response(502, f"Network Error: {str(e)}")
                
        except Exception as e:
            self.send_error_response(500, f"Proxy Error: {str(e)}")

    def send_cors_headers(self):
        """Send CORS headers to allow browser access"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Max-Age', '86400')

    def send_error_response(self, status_code, message):
        """Send JSON error response with CORS headers"""
        error_data = {
            'error': {
                'code': status_code,
                'message': message
            }
        }
        response_body = json.dumps(error_data).encode()
        
        self.send_response(status_code)
        self.send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(response_body))
        self.end_headers()
        self.wfile.write(response_body)

    def log_message(self, format, *args):
        """Custom logging format"""
        print(f"[BlazeMeter Proxy] {self.address_string()} - {format % args}")

def run_proxy(port=8001):
    """Start the proxy server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, BlazeMeterProxyHandler)
    print(f"BlazeMeter Proxy Server running on http://localhost:{port}")
    print(f"Forwarding requests to BlazeMeter API with CORS enabled")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down proxy server...")
        httpd.shutdown()

if __name__ == '__main__':
    run_proxy()
