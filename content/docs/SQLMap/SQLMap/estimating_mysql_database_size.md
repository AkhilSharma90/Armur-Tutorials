---
title: "Estimating MySQL Table Size using SQL Injection"
description: "Learn more about SQLMap"
icon: "code"
draft: false
---

Estimating the size of a MySQL table using SQL injection can provide valuable information to an attacker. Knowing the approximate number of records in a table helps estimate the time required to extract all the data, which is crucial when dealing with slow or limited extraction techniques.

### How It Works

When a `SELECT` query is executed, the database engine evaluates all records returned by the statement to ensure they satisfy the `WHERE` clause. By injecting a short time delay in the `WHERE` clause, it is possible to estimate the number of records in the table. This technique leverages MySQL's `SLEEP()` function, which can be integrated into any SQL query.

### Estimating Table Size with SQL Injection

#### Concept
If a table has 5000 rows and a `SLEEP(0.01)` function is injected, it will result in a 50-second delay before the server response is sent. If the table has 300 records, the delay will be 3 seconds. The attacker starts with a short delay and gradually increases it until a noticeable total delay is observed.

#### Example Process
Assume the attacker does not know the table names or the number of rows in each table. Here’s how the attacker proceeds:

1. **First Query (Short Delay):**
    ```sql
    SELECT * FROM products WHERE id=1 AND 1=2 OR SLEEP(0.001);
    ```
    **Result:** Response is returned quickly (clearly under 1 second).

    This indicates that either there are far fewer than 1000 records, or the field is not vulnerable to SQL injection.

2. **Second Query (Longer Delay):**
    ```sql
    SELECT * FROM products WHERE id=1 AND 1=2 OR SLEEP(0.1);
    ```
    **Result:** The response takes a few seconds.

    This suggests there are between 20 and 50 records.

3. **Third Query (Fine Tuning the Delay):**
    ```sql
    SELECT * FROM products WHERE id=1 AND 1=2 OR SLEEP(0.5);
    ```
    **Result:** This query takes just over 19 seconds to execute.

    This indicates approximately 38 records in the table, which is accurate as the test environment's `products` table has exactly 38 rows.

### Important Considerations

#### WHERE Clause Conditions
Each injection example includes an always false condition to ensure the `SLEEP()` function is executed. If the database engine skips the time delay, the results will be inaccurate.

For example, if 50% of the products come from the same supplier:
```sql
SELECT * FROM products WHERE supplier=1 OR SLEEP(0.5);
```
**Result:** This query takes 9.5 seconds to execute.

The database engine may skip the `SLEEP()` function if the first part of the condition is true. The attacker might conclude there are 19 records when there are actually twice as many. Ensure the `SLEEP()` function is executed for each row by using always false conditions like:
```sql
SELECT * FROM products WHERE id=1 AND 1=2 OR SLEEP(0.5);
```

#### SELECT from Multiple Tables
This technique does not work when data comes from multiple tables. If the `SELECT` query joins multiple tables, the estimated size might not be accurate. Assumptions can be made from the results returned on the page, but this requires careful analysis.

### Conclusion
Estimating the size of a MySQL table using SQL injection provides attackers with an understanding of the number of records, helping to plan data extraction efficiently. This technique relies on injecting time delays in the `WHERE` clause and observing the server response times. Always ensure the time delay is executed for each row by using appropriate conditions in the `WHERE` clause.