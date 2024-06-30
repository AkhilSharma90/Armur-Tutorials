---
title: "Time-Based Blind SQL Injection Attacks"
description: "Learn more about SQLMap"
icon: "code"
draft: false
---

Time-based blind SQL injection attacks are a form of SQL injection where the attacker injects a query that causes a time delay in the database response. By observing the time it takes for the server to respond, the attacker can infer information about the database, even if there is no direct feedback from the database server.

### Purpose of Time-Based SQL Injection
Time-based techniques are particularly useful for blind and deep blind SQL injection attacks where there is no other way to retrieve information from the database server. By injecting SQL code that induces a time delay, attackers can deduce information based on the time taken for the server to respond.

### Injecting a Time Delay
Time-based attacks can be used to determine if a vulnerability is present. This is especially useful when facing deep blind SQL injection scenarios. The table below shows how to inject a time delay in various database management systems (DBMS).

| DBMS       | Function                       | Notes                                                                 |
|------------|--------------------------------|-----------------------------------------------------------------------|
| MySQL      | `SLEEP(time)`                  | Available since MySQL 5.0. Causes the query to sleep for the specified number of seconds.                     |
|            | `BENCHMARK(count, expr)`       | Executes the expression a specified number of times, generating a delay.                                      |
| SQL Server | `WAIT FOR DELAY 'hh:mm:ss'`    | Suspends execution for the specified amount of time.                                                        |
|            | `WAIT FOR TIME 'hh:mm:ss'`     | Suspends execution until the system time matches the specified time.                                         |
| Oracle     | `DBMS_LOCK.SLEEP(seconds)`     | Used within PL/SQL blocks to suspend execution. Oracle does not support stacked queries in dynamic SQL.       |

**Note:** Always identify the DBMS before beginning time-based tests. If none of the delay functions work, use database fingerprinting techniques to determine the DBMS.

### Conditional Time Delays
Time-based attacks can also extract information from the database by integrating the time delay into a conditional statement. This allows attackers to ask yes/no questions and deduce information based on whether the delay is executed or not.

| DBMS       | Conditional Syntax                         | Notes                                                   |
|------------|--------------------------------------------|---------------------------------------------------------|
| MySQL      | `IF(condition, when_true, when_false)`     | Used in SQL statements. In stored procedures, use Oracle syntax. |
| SQL Server | `IF condition THEN when_true ELSE when_false` | Used in stored procedures or independent stacked queries. |
| Oracle     | `IF condition THEN when_true ELSE when_false END IF` | Used in PL/SQL blocks.                                  |

### Examples of Time-Based SQL Injection

#### MySQL Time-Based Attack
Injecting a time delay in MySQL is straightforward using `SLEEP()` or `BENCHMARK()` functions. 

**Checking for Vulnerability:**
```sql
SELECT * FROM products WHERE id=1 AND SLEEP(15);
```

**Extracting Information:**
To verify the database version:
```sql
SELECT * FROM products WHERE id=1 AND IF(MID(VERSION(),1,1) = '5', SLEEP(15), 0);
```

#### SQL Server Time-Based Attack
SQL Server requires the use of stacked queries to inject time delays.

**Checking for Vulnerability:**
```sql
SELECT * FROM products WHERE id=1; WAIT FOR DELAY '00:00:15';
```

**Extracting Information:**
To check if the user is `sa` (system administrator):
```sql
SELECT * FROM products WHERE id=1; IF SYSTEM_USER='sa' WAIT FOR DELAY '00:00:15';
```

#### Oracle Time-Based Attack
Oracle uses the `DBMS_LOCK.SLEEP` procedure within PL/SQL blocks.

**Injecting a Delay:**
```sql
BEGIN DBMS_LOCK.SLEEP(15); END;
```
For dynamic SQL queries, inject heavy queries to induce a delay, as Oracle does not support stacked queries.

### Pros and Cons of Time-Based Attacks

#### Pros
- Minimal impact on logs compared to error-based attacks.
- Useful in deep blind SQL injection scenarios.

#### Cons
- Heavy queries or CPU-intensive functions like MySQL’s `BENCHMARK()` may alert system administrators.
- Requires careful calibration of delay length to account for server load and network speed, ensuring accurate results without excessively long testing times.

### Conclusion
Time-based blind SQL injection attacks are a valuable technique for identifying and exploiting SQL injection vulnerabilities when other methods are not feasible. By inducing time delays and using conditional statements, attackers can infer critical information about the database, even without direct feedback. Always ensure responsible and ethical use of these techniques, and obtain proper authorization before conducting any tests.