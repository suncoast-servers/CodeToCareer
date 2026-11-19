import sys
from pathlib import Path

folder = Path(sys.argv[1])
sys.path.insert(0, str(folder))
import count_lines

sample = folder / "_sample.txt"
sample.write_text("one\ntwo\nthree\n", encoding="utf-8")
try:
    if count_lines.count_lines(sample) != 3:
        print("count_lines must return the number of lines")
        sys.exit(1)
finally:
    sample.unlink(missing_ok=True)
print("path-02-python-04 passed")
