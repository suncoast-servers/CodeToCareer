import sys
from pathlib import Path

folder = Path(sys.argv[1])
sys.path.insert(0, str(folder))
import greet

if greet.greet("Ada") != "Hello, Ada":
    print("greet(name) must return Hello, {name}")
    sys.exit(1)
print("path-02-python-03 passed")
