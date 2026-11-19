def count_lines(path):
    with open(path, encoding="utf-8") as handle:
        return sum(1 for ni in handle)
