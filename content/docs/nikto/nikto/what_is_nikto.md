---
title: "Web Server Scanning With Nikto"
description: "Nikto is an open-source web server and web application scanner."
icon: "code"
draft: false
---

Nikto is an open-source web server and web application scanner designed to detect various security vulnerabilities. Developed by Sullo at CIRT, Inc., Nikto scans web servers for over 6700 potentially risky files/programs, checks for outdated server software, and identifies version-specific issues. Originally released in late 2001, it is currently maintained by David Lodge with contributions from other developers.

**Key Features of Nikto:**
- Detects SQL injection, XSS, and other common vulnerabilities.
- Identifies installed software via headers, favicons, and files.
- Guesses subdomains and supports SSL (HTTPS) websites.
- Generates reports in plain text, XML, HTML, or CSV formats.
- Explores web server content and reports unusual headers.
- Checks server configurations like multiple index files and HTTP server options.
- Supports HTTP proxy and can guess credentials for authorization.
- Customizable reports with a template engine and integrates with Metasploit.

### How to Install Nikto

Since Nikto is Perl-based, it runs on most operating systems with Perl installed.

- **Kali Linux:** Nikto comes preinstalled under "Vulnerability Analysis."
  
- **Other Linux distributions:** Use `apt install nikto` or obtain Nikto from GitHub.

- **Windows:** Install Perl from [ActiveState](https://www.activestate.com/activeperl), then download Nikto.

- **MacOS:** Install using Homebrew.

### How to Scan with Nikto

Now that you know what Nikto is and how to install it, let's go ahead and run some scans. Since Nikto is a command-line tool, you can use the help command to get a list of options:
```sh
nikto -Help
```

<blockquote class="imgur-embed-pub" lang="en" data-id="NETte0T"><a href="https://imgur.com/NETte0T">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### How to Scan a Domain

To perform a simple domain scan, use the -h (host) flag:

```sh
nikto -h google.com
```

<blockquote class="imgur-embed-pub" lang="en" data-id="upKVLLP"><a href="https://imgur.com/upKVLLP">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### How to Scan a Domain with SSL Enabled

For domains with HTTPS enabled, you have to specify the -ssl flag to scan port 443:
```sh
nikto -h https://google.com -ssl
```

<blockquote class="imgur-embed-pub" lang="en" data-id="fdPpHy2"><a href="https://imgur.com/fdPpHy2">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### How to Scan an IP Address
Sometimes you just want to scan an IP address where a web server is hosted.

To do that, use the same -h flag you used for domain scanning:

> nikto -h <ip address>

### How to Scan Multiple IP Addresses From a Text File

To scan multiple IP addresses or domains, just put them in a text file separated by newlines. Nikto will know that the scan has to be performed on each domain / IP address.

Let's assume we have a file named `domains.txt` with two domain names:

google.com
facebook.com

To scan both of them with Nikto, run the following command:
```sh
nikto -h domains.txt
```

### How to Export Scan Results
Nikto scans take a while to complete. When you are a professional pen-tester, you don't want to repeat scans very often unless there are major changes to the web application.

To export a scan result, use the -o flag followed by the file name:
```sh
nikto -h google.com -o scan.txt
```

You can also use the `-Format` flag to specify an output format. You can choose from CSV, HTML, nbe (Nessus format), SQL, txt, and XML:
```sh
nikto -h google.com -o scan.csv -Format csv
```

### You also use Nikto with Metasploit
Nikto offers a way to export scans to Metasploit so that it gets easier when you try to exploit systems based on the scan results from Nikto.

To do that, append the `-Format msf+` flag to the end of a scan:
```sh
nikto -h <domain/ip> -Format msf+
```

### Conclusion

Nikto stands as a robust tool in the arsenal of web security professionals, offering comprehensive scanning capabilities to identify vulnerabilities in web servers and applications. With its extensive database of potential threats and its ability to generate detailed reports in multiple formats, Nikto empowers users to proactively safeguard their systems against a wide range of security risks. Continuously maintained and updated, Nikto remains a trusted choice for security assessments, providing essential insights that contribute to the resilience of web infrastructures worldwide.