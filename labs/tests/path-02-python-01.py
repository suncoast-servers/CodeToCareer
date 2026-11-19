import subprocess
import sys
from pathlib import Path

folder = Path(sys.argv[1])
result = subprocess.run(
    [sys.executable, str(folder / "hello.py")],
    capture_output=True,
    text=True,
    check=False,
)
output = result.stdout.strip()
if result.returncode != 0 or output != "Hello, DE101":
    print(result.stdout + result.stderr)
    print("Expected hello.py to print Hello, DE101")
    sys.exit(1)
print("path-02-python-01 passed")
