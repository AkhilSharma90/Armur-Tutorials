---
title: "Getting started with Social Engineering Toolkit"
description: "In this section, you will learn about the Social Engineering Toolkit and provide a beginner’s guide to using it."
icon: "code"
draft: false
---

## What is Social Engineering?

Technology is making it easier for cyber criminals to exploit human behavior, cognitive biases, and social dynamics. The most common attack method used by hackers is social engineering. In other words, it’s influencing someone to do something or say something. Many types of social engineering attacks are out there, including phishing, pretexting, baiting, and tailgating.

## What is the Social Engineering Toolkit(SET)?

Social Engineering Toolkit (SET) is a versatile tool that enables you to simulate a wide range of social engineering attacks. It’s a free, open-source tool that is pre-installed in Kali Linux. The SET provides a range of options for launching different types of social engineering attacks, such as spear-phishing, credential harvesting, bypassing anti-virus software, and generating infectious media.

## Installinstaion

To install the Social Engineering Toolkit on your system, simply open the terminal window and type the following command:
Make sure you have git installed

```sh
git clone https://github.com/trustedsec/social-engineer-toolkit/ set/ 
cd set/
pip install -r requirements.txt 
```

Once the installation is complete, you can launch the Social Engineering Toolkit by typing the following command:
```sh
sudo setoolkit
```

<a target='_blank'><img src='https://i.postimg.cc/fRfqvLbj/image.png' border='0' alt='image'/></a>

If you select 1 (type in 1), you will open the toolkit and you will see the following list:

<a target='_blank'><img src='https://i.postimg.cc/25HHPKh1/image.png' border='0' alt='image'/></a>

## THE SET options

### 1) Spear-Phishing Attack Vectors
**Spear-phishing** is a targeted attempt to steal sensitive information such as account credentials or financial information from a specific individual, often for malicious reasons, by masquerading as a trustworthy entity. The Social Engineering Toolkit provides several tools to conduct spear-phishing attacks, including:

- **Email Attack Vector:** This allows the attacker to send emails that appear to come from a trusted source, containing malicious links or attachments.
- **Credential Harvester Attack Method:** This captures credentials from the victim through phishing websites that mimic legitimate sites.
- **Spear-Phishing Attack:** This is a highly targeted email attack aimed at a specific individual or organization.

### 2) Website Attack Vectors
**Website attack vectors** involve compromising a website to deliver a malicious payload to visitors. SET offers various methods to perform these attacks, such as:

- **Java Applet Attack Method:** Embeds a malicious Java applet into a website to exploit vulnerabilities in the victim's browser.
- **Metasploit Browser Exploit Method:** Integrates with the Metasploit framework to deliver browser-based exploits.
- **Credential Harvester Attack Method:** Clones a website to harvest credentials from unsuspecting users.

### 3) Infectious Media Generator
The **Infectious Media Generator** creates malicious files that can be delivered via USB drives or other media. When the media is accessed, the payload executes, compromising the victim's system. This method capitalizes on the human tendency to trust and insert removable media into their devices.

- **Autorun.inf File Creation:** Automatically runs the payload when the media is inserted into a Windows machine.
- **File-Format Exploits:** Embeds exploits within common file types like PDFs or Office documents.

### 4) Create a Payload and Listener
Creating a **payload and listener** involves generating a malicious payload that can be executed on a victim's system and setting up a listener to control the compromised system.

- **Payload Creation:** Using tools like Metasploit to generate payloads (e.g., reverse shells, Meterpreter sessions).
- **Listener Configuration:** Setting up a listener to receive the connection from the compromised system and execute commands on it.

### 5) Mass Mailer Attack
The **Mass Mailer Attack** is designed to send a large number of phishing emails to multiple targets simultaneously. This attack can be customized to appear as though it comes from a trusted source and can include attachments or links to malicious sites.

- **Email Template Customization:** Personalize emails to increase the chances of success.
- **SMTP Server Configuration:** Use an SMTP server to send out the mass emails.

### 6) Arduino-Based Attack Vector
An **Arduino-based attack vector** uses the Arduino hardware platform to create physical devices that can perform various types of attacks, such as:

- **Human Interface Device (HID) Attacks:** Emulate keyboards or mice to execute pre-programmed scripts on the target system.
- **Wireless Network Attacks:** Use Arduino to create rogue access points or perform deauthentication attacks.

### 7) Wireless Access Point Attack Vector
The **Wireless Access Point Attack Vector** involves setting up rogue access points to intercept or manipulate network traffic. Attackers can use this method to perform man-in-the-middle (MITM) attacks or capture credentials.

- **Rogue AP Creation:** Set up a fake access point to trick users into connecting.
- **Credential Harvesting:** Capture login credentials or other sensitive data transmitted over the network.

### 8) QRCode Generator Attack Vector
The **QRCode Generator Attack Vector** creates malicious QR codes that, when scanned, direct users to malicious websites or initiate unwanted actions on their devices.

- **URL Redirection:** Direct users to phishing sites or sites that exploit vulnerabilities.
- **Command Execution:** Execute commands on the victim's device through embedded URLs.

### 9) Powershell Attack Vectors
**Powershell Attack Vectors** leverage PowerShell, a powerful scripting language in Windows, to execute malicious scripts or commands on a target system.

- **PowerShell Payloads:** Create scripts that download and execute additional payloads.
- **Obfuscation Techniques:** Use obfuscation to evade detection by security software.

### 10) Third Party Modules
**Third Party Modules** in SET allow for the integration of external tools and scripts to extend the toolkit's capabilities. Users can import and use additional modules to perform a wide range of attacks.

- **Custom Exploits:** Integrate custom exploits or scripts to enhance attack vectors.
- **Community Contributions:** Utilize modules developed by the community for specific use cases or attacks.

These explanations cover the key components and functionalities of each attack vector within the Social Engineering Toolkit (SET). If you need more specific details or examples for any of these items, feel free to ask!