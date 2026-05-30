# Stage 1

## Problem

Display the top 10 notifications based on category priority and recency.

## Priority Rules

Placement > Result > Event

Weights:

* Placement = 100
* Result = 60
* Event = 30

## Ranking Formula

Priority Score = Type Weight + Recency Bonus

Recency Bonus = max(0, 50 − ageInMinutes)

## Flow

1. Fetch notifications from protected API.
2. Calculate Priority Score.
3. Sort in descending order.
4. Return top 10 notifications.

## Complexity

Score Calculation: O(n)

Sorting: O(n log n)

Top 10 Extraction: O(10)

Overall Complexity: O(n log n)

## Assumptions

* API is source of truth.
* Notifications are not stored.
* Ranking happens in memory.
* New notifications are automatically considered during every request.
