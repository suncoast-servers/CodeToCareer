def average(nums):
    if not nums:
        return None
    total = 0
    for ni in nums:
        total += ni
    return total / len(nums)
