from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class CorsHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', 'https://supabase.com')
        super().end_headers()

ThreadingHTTPServer(('127.0.0.1', 8000), CorsHandler).serve_forever()
