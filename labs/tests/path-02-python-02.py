import sys
from pathlib import Path

folder = Path(sys.argv[1])
sys.path.insert(0, str(folder))
import add

if add.add(2, 3) != 5 or add.add(-1, 1) != 0:
    print("add(a, b) must return the sum")
    sys.exit(1)
print("path-02-python-02 passed")
