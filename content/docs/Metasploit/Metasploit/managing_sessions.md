---
title: "Managing Sessions in Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

# Managing Sessions in Metasploit

Managing multiple sessions in Metasploit can be a complex task, especially when dealing with numerous active connections. Effective session management is crucial for streamlined operations during penetration testing. This guide covers the basics of managing sessions, navigating open sessions using search, and killing stale sessions.

## Basics of Session Management

In Metasploit, sessions represent ongoing interactions between the attacker and the compromised host. Managing these sessions efficiently ensures smooth operation and better control over the testing environment.

## Sessions Command

The `sessions` command in Metasploit provides various options to list, interact with, and manage open sessions. Here are some common usages:

- **List all sessions**:
  ```bash
  msf6 > sessions
  ```

- **Interact with a specific session**:
  ```bash
  msf6 > sessions -i <session_id>
  ```

## Session Search

When multiple sessions are open, searching can help you navigate and manage them effectively. The `sessions --search` command allows you to filter sessions based on specific criteria.

### Example of Searching Sessions

To search for sessions with specific IDs:

```bash
msf6 > sessions --search "session_id:1 session_id:2"
```

**Output**:
```plaintext
Active sessions
===============

  Id  Name  Type                     Information                                    Connection
  --  ----  ----                     -----------                                    ----------
  1         meterpreter x86/windows  WIN-ED9KFH65RDH\Zach Goldman @WIN-ED9KFH65RDH  192.168.2.1:4444 -> 192.168.2.132:52190 (192.168.2.132)
```

### Supported Search Keywords

Currently, Metasploit supports the following search keywords:
- `session_id`
- `session_type`
- `last_checkin`

These keywords can be combined for more refined searches. For instance, to find sessions based on type and check-in time:

```bash
msf6 > sessions --search "session_id:1 session_type:meterpreter last_checkin:greater_than:10s last_checkin:less_than:10d5h2m30s" -v
```

**Output**:
```plaintext
Active sessions
===============

  Session ID: 1
        Name:
        Type: meterpreter windows
        Info: WIN-ED9KFH65RDH\Zach Goldman @ WIN-ED9KFH65RDH
      Tunnel: 192.168.2.1:4444 -> 192.168.2.132:52190 (192.168.2.132)
         Via: exploit/multi/handler
   Encrypted: Yes (AES-256-CBC)
        UUID: 958f7b976db67d60/x86=1/windows=1/2023-10-19T12:38:05Z
     CheckIn: 21725s ago @ 2023-10-19 09:26:08 -0500
  Registered: No
```

### Using `last_checkin`

The `last_checkin` keyword requires an extra argument specifying whether to filter by greater or lesser time since the last check-in, followed by the time duration.

### Examples:
- **Greater than 10 seconds**: `last_checkin:greater_than:10s`
- **Less than 10 days, 5 hours, 2 minutes, and 30 seconds**: `last_checkin:less_than:10d5h2m30s`

## Killing Stale Sessions

You can also use the `--kill-all` flag in conjunction with the `--search` command to kill sessions matching specific criteria.

### Example of Killing Stale Sessions

To kill all `meterpreter` sessions:

```bash
msf6 > sessions -K -S "session_type:meterpreter"
```

**Output**:
```plaintext
[*] Killing matching sessions...

Active sessions
===============

  Id  Name  Type                     Information                                     Connection
  --  ----  ----                     -----------                                     ----------
  1         meterpreter x86/windows  WIN-ED9KFH65RDH\Zach Goldman @ WIN-ED9KFH65RDH  192.168.2.1:4444 -> 192.168.2.132:52190 (192.168.2.132)
  2         meterpreter x86/windows  WIN-ED9KFH65RDH\Zach Goldman @ WIN-ED9KFH65RDH  192.168.2.1:4444 -> 192.168.2.132:52192 (192.168.2.132)

[*] 192.168.2.132 - Meterpreter session 1 closed.
[*] 192.168.2.132 - Meterpreter session 2 closed.
```

## Conclusion

Efficient session management in Metasploit is essential for effective penetration testing. By using the `sessions` command with search and kill options, you can easily navigate and manage multiple sessions. This guide provides a foundational understanding to help you leverage Metasploit's session management capabilities fully.