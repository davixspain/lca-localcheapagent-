from __future__ import annotations
import argparse
import functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


class DistHTTPRequestHandler(SimpleHTTPRequestHandler):
    """Serve static files from the built Vite ``dist`` directory."""

    def __init__(self, *args, directory: str | None = None, **kwargs):
        # Default to the dist directory at repo root.
        root = directory or str(Path(__file__).resolve().parent / "dist")
        super().__init__(*args, directory=root, **kwargs)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Serve built assets from dist/ via Python HTTP server")
    parser.add_argument("--host", default="0.0.0.0", help="Host interface to bind (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=3000, help="Port to listen on (default: 3000)")
    parser.add_argument(
        "--directory",
        type=Path,
        default=Path(__file__).resolve().parent / "dist",
        help="Directory containing built assets (default: ./dist)",
    )
    args = parser.parse_args()

    address = (args.host, args.port)
    handler = functools.partial(DistHTTPRequestHandler, directory=str(args.directory))
    server = ThreadingHTTPServer(address, handler)

    print(f"Serving {args.directory} on http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server")
        server.server_close()
