from __future__ import annotations

import http.client
import threading
from functools import partial
from http.server import ThreadingHTTPServer
from pathlib import Path
from tempfile import TemporaryDirectory

from serve import DistHTTPRequestHandler


def main() -> None:
    with TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        (root / "index.html").write_text(
            """
<!doctype html>
<html lang=\"en\">
  <head><meta charset=\"utf-8\"><title>Chimera Smoke Test</title></head>
  <body><p>Chimera smoke test content.</p></body>
</html>
"""
        )

        handler = partial(DistHTTPRequestHandler, directory=str(root))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()

        try:
            port = server.server_address[1]
            conn = http.client.HTTPConnection("127.0.0.1", port, timeout=5)
            conn.request("GET", "/")
            response = conn.getresponse()
            body = response.read().decode("utf-8", errors="ignore")
            conn.close()

            if response.status != 200:
                raise SystemExit(f"Expected HTTP 200 but received {response.status}")
            if "Chimera smoke test content" not in body:
                raise SystemExit("Response body did not match expected marker")

            print(f"Python server smoke test passed on port {port}")
        finally:
            server.shutdown()
            thread.join(timeout=5)


if __name__ == "__main__":
    main()
