---
title: "Understanding File Permissions in Linux"
description: "Welcome to the basics of Linux for Hacking."
icon: "code"
draft: false
---


Linux employs a robust system to manage file access control. This system determines who can read, write, and execute any given file. It grants the file owner control over these permissions, allowing them to specify who can access their files. Group permissions can also be configured to manage access for specific user groups.

**Viewing File Permissions**

The `ls` command with the `-l` (long listing) option displays detailed information about files, including their permissions. Let's navigate to the `/usr/share/hashcat` directory and use `ls -l` to examine file permissions there:

```bash
kali > cd /usr/share/hashcat
kali > ls -l
```

Each line represents a file or directory entry, providing details like:

1. **File type:** A leading `d` indicates a directory, while `-` represents a regular file.
2. **Permissions:** This section defines read (r), write (w), and execute (x) permissions for three categories: owner, group, and others.
3. **Number of links:** The number of hard links pointing to the file.
4. **Owner:** The username of the file owner.
5. **Group:** The group name associated with the file.
6. **Size:** The file size in bytes.
7. **Last modification time:** The date and time the file was last modified.
8. **Filename:** The name of the file.

**Understanding Permission Notation**

The permissions section consists of three sets of characters: `rwx`. Each set applies to a specific user category:

* **Owner:** The first set represents the owner's permissions.
* **Group:** The second set represents the group's permissions.
* **Others:** The third set represents permissions for all other users.

A `-` in a permission slot indicates the absence of that permission (e.g., no execute permission).

**Example: Analyzing Permissions**

Let's examine the permissions for the `hashcat rules` directory:

```
-rw-r--r--
```

* **Owner:** Read (r) and write (w) permissions, but no execute (x) permission.
* **Group:** Read (r) permission only, no write or execute permissions.
* **Others:** Read (r) permission only, no write or execute permissions.

**Changing File Permissions**

The `chmod` (change mode) command allows modifying file permissions, provided you have root privileges or are the file owner. Permissions are represented numerically in the operating system.

* **Permissions as Binary Equivalents:** Each permission (read, write, execute) translates to a binary value:
    * Read (r): 4
    * Write (w): 2
    * Execute (x): 1

Adding these values determines the numerical permission representation. For example, all permissions enabled (rwx) translates to 4 + 2 + 1 = 7.

* **Changing Permissions with Numbers:** To give the group write permission to the `hashcat combinator.rule` file (assuming its current permissions are `rw-r--r--` which translates to 644), you would use:

```bash
kali > chmod 664 combinator.rule
```

This command grants the owner read and write (4 + 2 = 6), the group read and write (4 + 2 = 6), and everyone else read-only (4) permissions.

**Alternative: Using UGO Syntax**

Another method for changing permissions involves the UGO syntax:

* **UGO:** Stands for User (owner), Group, and Others.
* **Operators:**
    * `+`: Add a permission.
    * `-`: Remove a permission.
    * `=`: Set a permission.

For instance, to remove write permission for the group on `combinator.rule`:

```bash
kali > chmod g-w combinator.rule
```

**Giving Yourself Execute Permission on New Tools**

Downloaded hacking tools often lack execute permission by default. To grant yourself (assuming you're root) permission to execute a new tool named `newhackertool`:

```bash
kali > chmod 766 newhackertool
```

This assigns you (the owner) all permissions (read, write, execute), and the group and others read-write permissions only (6).

**Remember:** Always exercise caution when modifying file permissions, especially on critical system files.
