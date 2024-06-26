---
title: "Conducting a Discovery Scan in Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

## Introduction

Reconnaissance is the first step in penetration testing, where the goal is to gather information about the target network. This step involves identifying active hosts, their operating systems, open ports, and running services. A Discovery Scan in Metasploit is a comprehensive method to collect this information efficiently.

## How a Discovery Scan Works

A Discovery Scan in Metasploit uses Nmap to perform various scans and gather information. It includes the following phases:

1. **Ping Scan**
2. **Port Scan**
3. **OS and Version Detection**
4. **Data Import**

### Ping Scan

The ping scan determines if the hosts are online. Nmap performs an ICMP ping sweep by sending an ICMP echo request to the target. If an ICMP echo reply is received, the host is considered online and included in the port scan.

### Port Scan

During the port scan, Nmap identifies open ports and the services running on those ports. The scan covers commonly exposed ports like HTTP, telnet, SSH, and FTP. The default scan is a TCP SYN scan, but you can customize it by adding Nmap options.

### OS and Version Detection

After identifying open ports, Nmap sends probes to these ports to detect the operating system and service versions. This phase provides valuable information that helps identify vulnerabilities and reduce false positives.

### Data Import

Metasploit Pro imports the data collected by Nmap into the project. This data includes host information, open ports, running services, and potential vulnerabilities. Metasploit uses this information to run additional modules and refine the penetration test.

## Running a Discovery Scan

To run a Discovery Scan in Metasploit, follow these steps:

1. **Initiate the Scan**:
   - Navigate to the project overview or analysis page.
   - Click the "Scan" button to start a new discovery scan.

2. **Specify Target Addresses**:
   - Enter the target addresses in the provided field. You can input single IP addresses, ranges, or CIDR notations. Separate multiple addresses with new lines.

3. **Advanced Options** (Optional):
   - Click "Show Advanced Options" to configure additional settings such as custom Nmap arguments, specific port ranges, excluded ports, scan speed, and more.

4. **Launch the Scan**:
   - Click the "Launch Scan" button to begin the scan.

5. **Monitor the Scan**:
   - The task log displays the progress and status of the scan. Upon completion, the status will show 'Complete' if successful or 'Failed' if errors occurred.

## Viewing Scan Results

To view the results of the Discovery Scan:

1. **Navigate to the Hosts Page**:
   - Select "Hosts > Analysis" to view detailed information about the scanned hosts.

2. **Host Information**:
   - For each host, you can see:
     - IP address
     - Host name
     - Operating system
     - Active services
     - Timestamp of the last update
     - Host status (scanned, shelled, looted, cracked)

### Host Status Hierarchy

- **Scanned**: Indicates a discovery scan, Nexpose scan, or import was performed.
- **Shelled**: Indicates that a session was opened on the host.
- **Looted**: Indicates that files or screenshots were obtained from the host.
- **Cracked**: Indicates that a password hash from the host was decrypted into plain text.

## Discovery Scan Options

### Target Addresses

Defines individual hosts or network ranges to scan.

### Initial Port Scan

Performs a port scan before service version verification.

### Custom Nmap Arguments

Sends additional flags and commands to Nmap, overriding default settings.

### Additional and Excluded TCP Ports

Specifies additional ports to include or exclude from the scan.

### Custom TCP Port Range

Defines a specific range of TCP ports for the scan.

### Portscan Speed

Adjusts the scan speed using Nmap's timing templates:
- Insane (5): Fastest, less accurate.
- Aggressive (4): Fast, assumes reliable network.
- Normal (3): Default speed.
- Polite (2): Slower, uses less bandwidth.
- Sneaky (1): IDS evasion speed.
- Paranoid (0): Slowest, for maximum stealth.

### Portscan Timeout

Sets the time limit for Nmap to spend on each host (default is 5 minutes).

### UDP Service Discovery

Finds all services on the network using custom Metasploit modules instead of Nmap.

### Scan SNMP Community Strings and H.323 Video Endpoints

Scans for devices responding to SNMP and H.323 protocols.

### Enumerate Users via Finger

Queries usernames and bruteforces the user list if the Finger protocol is detected.

### Identify Unknown Services

Detects unknown services and applications on the network.

### Single Scan

Scans hosts individually, storing information before moving to the next host.

### Dry Run

Prepares the scan without executing it, displaying options in the task log.

### Web Scan

Runs a web scan, web audit, and web exploit along with the discovery scan (recommended for small sets of hosts).

### SMB User Name, Password, and Domain

Defines SMB credentials to attempt login to SMB services.

### Specifying IPv6 Addresses

Manually add or import IPv6 addresses as Metasploit Pro does not automatically detect them.

## Importing IPv6 Addresses

1. **Import a File**:
   - Select "Analysis > Hosts".
   - Click "Import" and browse to the file containing IPv6 addresses.

2. **Add Manually**:
   - Select "Analysis > Hosts".
   - Click "New Host" and enter the IPv6 address and other optional information.

## Conclusion

A Discovery Scan is a powerful tool in Metasploit for gathering detailed information about a network. By understanding the phases of a discovery scan and how to configure and interpret its results, penetration testers can gain valuable insights and fine-tune their attack strategies effectively.