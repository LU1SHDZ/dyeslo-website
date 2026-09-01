"""Serve the D'Yeslo prototype from this folder without browser caching."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread


PROJECT_ROOT = Path(__file__).resolve().parent
HOSTS = ("127.0.0.1", "192.168.1.20")
PORT = 4173
PREVIEW_VERSION = "0e4f3e8"


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path in {"", "/", "/index.html"}:
            self.send_response(302)
            self.send_header("Location", f"/index.html?version={PREVIEW_VERSION}")
            self.end_headers()
            return
        super().do_GET()


if __name__ == "__main__":
    print(f"Serving: {PROJECT_ROOT}")
    servers = [ThreadingHTTPServer((host, PORT), PreviewHandler) for host in HOSTS]
    for host, server in zip(HOSTS, servers):
        print(f"D'Yeslo preview: http://{host}:{PORT}/")
        Thread(target=server.serve_forever, daemon=True).start()
    servers[0].serve_forever()
