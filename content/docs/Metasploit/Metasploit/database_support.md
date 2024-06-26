---
title: "Database Support in Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

## What is msfdb?

`msfdb` is a script included with all installations of Metasploit that simplifies the setup and management of both a database and a Web Service. This Web Service connects the database with Metasploit, enhancing its functionality and usability.

While `msfdb` is the easiest way to set up a database for Metasploit, it is also possible to set one up manually if preferred. Instructions for manual setup can be found in the Metasploit documentation.

## Why Should You Use msfdb?

Using a database with Metasploit is not mandatory, but it unlocks many advanced features that significantly enhance its capabilities. The `msfdb` script is the simplest method to set up a Metasploit-compatible database. 

### Key Features Requiring a Database:

- **Recording Hosts**: Machines discovered via `db_nmap` are stored as "Hosts", viewable with the `hosts` command.
- **Storing Credentials**: Extracted credentials are stored as "creds", accessible with the `creds` command.
- **Tracking Exploitation Attempts**: Both successful and unsuccessful attempts are recorded as "Vulnerabilities", viewable with the `vulns` command.
- **Logging Services**: Services detected by `db_nmap` are recorded as "Services", accessible with the `services` command.
- **Managing Sessions**: Multiple remote sessions opened by exploit payloads are managed with the `sessions` command.
- **Storing Loot**: Difficult-to-define information returned by successful exploits is stored as "Loot", viewable with the `loot` command.
- **Tracking Ping Back Payloads**: Provides confirmation of remote execution on a target.
- **Pivoting Through Networks**: Active sessions allow pivoting through networks, viewable with the `routes` command.
- **Building Reports**: Comprehensive reports can be generated (restricted to Pro users).

These features can be logically separated within workspaces using the `workspace` command, helping to organize and manage data effectively.

## Using msfdb

### Initial Setup

To set up the database for the first time, navigate to the Metasploit installation directory and run:

```bash
./msfdb init
```

This command creates and starts the database, sets up database users, writes the client authentication configuration file, and initializes the database schema. Upon starting `msfconsole`, it should automatically connect to the database. You can check the connection status with:

```bash
msf6 > db_status
[*] Connected to msf. Connection type: postgresql.
```

### Setting Up the Web Service

You can set up a Web Service to connect Metasploit to the database:

```bash
msfdb --component webservice init
```

You will be prompted to enter a username and password for the Web Service:

```plaintext
[?] Initial MSF web service account username? [your_current_account_name]:
[?] Initial MSF web service account password? (Leave blank for random password):
```

After setting up the Web Service, you will receive credentials for the API account:

```plaintext
############################################################
##              MSF Web Service Credentials               ##
##                                                        ##
##        Please store these credentials securely.        ##
##    You will need them to connect to the webservice.    ##
############################################################

MSF web service username: your_current_account_name
MSF web service password: super_secret_password
MSF web service user API token: super_secret_api_token
```

### Connecting to the Web Service

To manually reconnect to the data service in `msfconsole`, use the following command:

```bash
db_connect --token super_secret_api_token --cert /Users/your_current_account_name/.msf4/msf-ws-cert.pem --skip-verify https://localhost:5443
```

You can also visit the Web Service URL in your browser to check if it is running and to manage the API account credentials:

```plaintext
https://localhost:5443/api/v1/auth/account
```

## msfdb Commands

The `msfdb` script includes several commands for managing the database and Web Service:

- **`./msfdb init`**: Creates and starts the database and Web Service, with optional configuration for username and password.
- **`./msfdb delete`**: Deletes the Web Service and database configuration files, with an optional prompt to delete the database contents.
- **`./msfdb reinit`**: Equivalent to running `./msfdb delete` followed by `./msfdb init`.
- **`./msfdb status`**: Displays the current status of the database and Web Service.
- **`./msfdb start`**: Starts the database and Web Service.
- **`./msfdb stop`**: Stops the database and Web Service.
- **`./msfdb restart`**: Equivalent to running `./msfdb stop` followed by `./msfdb start`.

## Troubleshooting

If you encounter errors while running any `msfdb` commands, try reinitializing the database:

```bash
./msfdb reinit
```

Be sure to select "no" when prompted to delete the database contents. If the error persists, document the command executed and the output generated, and submit an error ticket.

## Conclusion

Using `msfdb` to set up and manage a database for Metasploit significantly enhances its functionality, enabling a wide range of advanced features. This guide provides a straightforward approach to getting started with `msfdb`. For more detailed instructions, refer to the Metasploit documentation.
