def average(nums):
    # Bug: this divides by the wrong number and crashes on an empty list.
    total = 0
    for num in nums:
        total += num
    return total / (len(nums) + 1)
