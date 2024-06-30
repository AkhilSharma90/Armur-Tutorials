---
title: "Time-Based Blind SQL Injection Using Heavy Queries"
description: "Learn more about SQLMap"
icon: "code"
draft: false
---

### Overview
In some cases, it might be impossible to use time delay functions or procedures for classic time delay injections. In such situations, the best alternative is to simulate a delay using heavy queries, which take a noticeable amount of time to execute. This technique leverages the execution time of complex queries to infer information about the database.

### Principle
The injected query should rely on system tables, as the attacker usually has no information about user tables. The execution time is prolonged due to the large number of rows returned by the query. The time required to execute these queries can vary significantly based on factors like user permissions, database size, and server performance.

### Heavy Query Steps

#### MySQL or SQL Server
Even though MySQL and SQL Server support functions like `SLEEP()` to create delays, there might be cases where such functions or characters are blacklisted. In these scenarios, heavy queries can be used.

**Heavy MySQL Query Example:**
```sql
SELECT count(*) FROM information_schema.columns A, information_schema.columns B, information_schema.columns C
```
In a test environment, this query might return a large number, taking approximately 10 seconds to execute. 

**Injection to Identify Vulnerability:**
```sql
1 AND 1>(SELECT count(*) FROM information_schema.columns A, information_schema.columns B, information_schema.columns C)
```
**Resulting Query:**
```sql
SELECT * FROM products WHERE id=1 AND 1>(SELECT count(*) FROM information_schema.columns A, information_schema.columns B, information_schema.columns C)
```
If the server response takes noticeably longer, it indicates the presence of a vulnerability.

#### Oracle
For Oracle databases, heavy queries are often necessary for time-based SQL injections due to the lack of direct delay functions.

**Heavy Oracle Query Example:**
```sql
SELECT count(*) FROM all_users A, all_users B, all_users C
```
In a test environment with a small number of users, this query might execute quickly. However, with a larger number of tables in the `FROM` clause, the execution time increases.

**Injection to Identify Vulnerability:**
```sql
1 AND 1<(SELECT count(*) FROM all_users A, all_users B, all_users C)
```
**Resulting Query:**
```sql
SELECT * FROM products WHERE id=1 AND 1<(SELECT count(*) FROM all_users A, all_users B, all_users C)
```
A significant delay in server response indicates a potential vulnerability.

### Additional Information
Using heavy queries can significantly impact CPU and server resources. Therefore, it's generally better to use standard time delay techniques that are less CPU-intensive whenever possible.

#### Query Optimization
Database optimizers execute the injected query once, store the results, and reuse the value when evaluating the `WHERE` clause against each record. This means the heavy query is not executed repeatedly, which is more efficient. However, if the optimizer detects that the `WHERE` clause is always false, it may skip the query execution altogether. To avoid this, ensure the `WHERE` clause is verified for at least one record.

### Conclusion
Heavy queries are a viable alternative to time delay functions for time-based blind SQL injection attacks, especially when delay functions are unavailable or blacklisted. By leveraging complex queries that take longer to execute, attackers can infer the presence of vulnerabilities. However, it is important to consider the impact on server resources and optimize the injected queries accordingly. Always ensure ethical use of these techniques and obtain proper authorization before conducting any tests.