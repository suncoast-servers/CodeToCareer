import sys
from pathlib import Path

folder = Path(sys.argv[1])
sys.path.insert(0, str(folder))
import average

if average.average([2, 4, 6]) != 4:
    print("average(nums) must return the arithmetic mean")
    sys.exit(1)
if average.average([]) is not None:
    print("average([]) must return None")
    sys.exit(1)
print("path-02-python-05 passed")
