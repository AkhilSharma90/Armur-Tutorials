---
title: "Nmap Cheat-Sheet: Scanning Types, Commands, and NSE Scripts"
description: "Learn more about the Nmap"
icon: "code"
draft: false
---

Nmap (Network Mapper) is a free and open-source tool for network discovery and security auditing. It is widely used by network administrators and penetration testers for tasks such as network inventory, managing service upgrade schedules, and monitoring host or service uptime. Nmap uses raw IP packets to determine the available hosts, services, operating systems, and other characteristics of a network.

## TCP/IP Protocols

Nmap operates on various layers of the TCP/IP protocol suite:
- **Application layer**: FTP, HTTP, SNMP, BOOTP, DHCP
- **Transport layer**: TCP, UDP, ICMP, IGMP
- **Network layer**: ARP, IP, RARP
- **Data link layer**: SLIP, PPP

## UDP and TCP

- **UDP**: A connection-less protocol that does not guarantee packet delivery. Suitable for real-time applications like live audio/video.
- **TCP**: A connection-oriented protocol that guarantees packet delivery using a three-way handshake.

## Nmap Scan Types

### SYN Scan

The default scan type, which is stealthier than a TCP Connect scan. It sends a SYN packet to the target port and waits for a SYN/ACK response.

```sh
nmap -sS target
```

### TCP Connect Scan

Completes the TCP handshake, making it noisier but more accurate. Useful when the user does not have administrative privileges.

```sh
nmap -sT target
```

### Ping Sweep

Checks which IP addresses are up by sending ICMP Echo Requests.

```sh
nmap -sn 192.168.1.1/24
```

### UDP Scan

Checks for open UDP ports by sending UDP packets and analyzing the responses.

```sh
nmap -sU target
```

### FIN Scan

Sends a FIN packet to the target port. If a RST packet is received, the port is closed.

```sh
nmap -sF target
```

### NULL Scan

Sets all TCP flags to off, which can bypass certain firewalls and packet filters.

```sh
nmap -sN target
```

### XMAS Scan

Sets the FIN, PSH, and URG flags, making it more stealthy but less reliable on certain systems.

```sh
nmap -sX target
```

### Bounce Scan

Uses an FTP server to "bounce" scan packets to a target, potentially bypassing firewalls.

```sh
nmap -b ftp.server target
```

### RPC Scan

Probes open ports to identify RPC services and their versions.

```sh
nmap -sR target
```

### Windows Scan

Exploits anomalies in Windows systems' TCP/IP stack to identify open ports.

```sh
nmap -sW target
```

### Idle Scan

Uses a "zombie" host to perform stealthy scans, hiding the true origin of the scan.

```sh
nmap -sI zombie target
```

## Nmap Commands

### Basic Scans

```sh
nmap -sn 192.168.1.1/24  # Ping scan
nmap scanme.nmap.org     # Scan a single host
```

### Stealth Scan

```sh
nmap -sS scanme.nmap.org
```

### Version Scanning

```sh
nmap -sV scanme.nmap.org
```

### OS Scanning

```sh
nmap -O scanme.nmap.org
```

### Aggressive Scanning

```sh
nmap -A scanme.nmap.org
```

### Scanning Multiple Hosts

```sh
nmap 192.164.1.1 192.164.0.2 192.164.0.3  # Multiple IPs
nmap 192.164.1.*                          # Wildcard
nmap 192.164.0.1,2,3,4                    # Comma-separated
nmap 192.164.0.0-255                      # Range
```

### Port Scanning

```sh
nmap -p 973 192.164.0.1                   # Single port
nmap -p T:7777,973 192.164.0.1            # TCP port type
nmap -p 76-973 192.164.0.1                # Port range
nmap --top-ports 10 scanme.nmap.org       # Top 10 ports
```

### Scanning from a File

```sh
nmap -iL /input_ips.txt
```

### Verbosity and Exporting Scan Results

```sh
nmap -v scanme.nmap.org                   # Verbose output
nmap -oN output.txt scanme.nmap.org       # Normal output
nmap -oX output.xml scanme.nmap.org       # XML output
nmap -oA output scanme.nmap.org           # All formats
```

### Nmap Help

```sh
nmap -h
```

## Nmap Scripting Engine (NSE)

NSE is a powerful tool for writing scripts to automate network tasks. Scripts are written in Lua and can perform various functions like vulnerability detection, exploitation, and reporting.

### Using NSE Scripts

```sh
nmap -sC 192.168.1.1                        # Default scripts
nmap --script-help=ssl-heartbleed           # Help for a script
nmap --script=ssl-heartbleed.nse 192.168.1.1 # Specific script
nmap --script=smb* 192.168.1.1              # Set of scripts
```

## Zenmap

Zenmap is the graphical user interface for Nmap. It is free and open-source, providing visual network mappings and the ability to save and search scans.

## Conclusion

Nmap is an essential tool for network discovery and security auditing, with a wide range of features and capabilities. This cheat-sheet provides a quick reference to various scanning types, commands, and NSE scripts, helping you to effectively use Nmap in your network administration and penetration testing tasks.