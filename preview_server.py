"""Serve the D'Yeslo prototype from this folder without browser caching."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 4173


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    print(f"D'Yeslo preview: http://{HOST}:{PORT}/")
    print(f"Serving: {PROJECT_ROOT}")
    ThreadingHTTPServer((HOST, PORT), PreviewHandler).serve_forever()
