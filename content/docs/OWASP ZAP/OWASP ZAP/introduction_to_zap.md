---
title: "OWASP ZAP"
description: "Learn more about OWASP ZAP"
icon: "code"
draft: false
---

# What is OWASP ZAP?


OWASP ZAP is a powerful penetration testing tool designed to help developers and security professionals detect and find vulnerabilities in web applications. It offers multiple security functions, including:

- Passively scanning web requests
- Using dictionary lists to search for files and folders on web servers
- Using crawlers to identify a site’s structure and retrieve all links and URLs
- Intercepting, displaying, modifying, and forwarding web requests between browsers and web applications

OWASP ZAP can identify vulnerabilities in web applications such as compromised authentication, exposure of sensitive data, security misconfigurations, SQL injection, cross-site scripting (XSS), insecure deserialization, and components with known vulnerabilities.

## 6 Key Capabilities of the OWASP ZAP Tool

ZAP sits between a web application and a penetration testing client, functioning as a proxy to capture data transmitted and determine how the application responds to potentially malicious requests. OWASP ZAP is versatile and can be used by professionals of various skill levels and job roles.

### 1. Active vs. Passive Scans

ZAP offers two types of scans—active and passive.

- **Passive Scans:** These scans check HTTP requests and application responses for known security vulnerabilities without making changes to requests. They pose a low risk as they cannot change data, but may miss aggressive vulnerabilities like SQL Injection (SQLi).
  
- **Active Scans:** These scans create and modify requests sent to the application, sending test requests that surface vulnerabilities which cannot be caught using passive scans. Active scans are generally more effective but may create or delete data in the application.

### 2. Running Scans: Desktop vs. API

OWASP ZAP can be deployed as a desktop application or automatically via an API:

- **Desktop Application:** Ideal for security analysts and penetration testers running one-off tests to detect vulnerabilities.
- **API Automation:** Suitable for software development and security teams to ensure regular security testing of applications and their APIs.

### 3. Authenticated Security Scanning

For web applications requiring authentication, ZAP must be configured with authentication credentials to test protected paths. ZAP supports various authentication formats, including:

- Form-based authentication
- Script-based authentication
- JSON-based authentication
- HTTP/NTLM-based authentication

### 4. WebSockets

WebSockets create an asynchronous communication channel between client and server, transmitting data in full duplex. This continuous open channel can lead to security vulnerabilities such as eavesdropping or session hijacking. ZAP continuously scans WebSockets to identify these vulnerabilities.

### 5. OWASP ZAP Fuzzer

Fuzzing involves sending large volumes of unexpected data inputs to a test application to discover vulnerabilities. ZAP's fuzzer allows for:

- Selection of built-in payloads
- Downloading a variety of payloads from the ZAP community
- Creating custom payloads

### 6. AJAX Spidering

AJAX scraping detects requests from AJAX-rich web applications that normal crawlers may miss. ZAP’s AJAX Spider tool, accessible through the tools menu, offers configuration parameters like maximum crawl depth, status, and duration to avoid infinite crawls.

## OWASP ZAP Tutorial: Installation and Initial Configuration

### Prerequisites

- **Installers:** Available for Windows, Linux, and Mac OS/X, as well as Docker images. Download the appropriate installer from the download page.
- **Java 8 or higher:** Required to run ZAP. The Mac OS/X installer includes the appropriate Java version, but Java 8+ must be installed separately for Windows, Linux, and cross-platform versions. The Docker version includes Java.
- **Permission:** Ensure you have permission from the web application owner to perform a penetration test.

### Initial Configuration

1. **Start ZAP:** Choose whether to make the ZAP session persistent. If persisted, the session is saved to a local HSQLDB; otherwise, files are deleted on logout.
2. **Run a quick start auto scan:**
   - Start ZAP and click the Quick Launch tab.
   - Click the Auto Scan button.
   - Enter the full URL of the web application in the Attack URL text box.
   - Select either "Use traditional spider," "Use AJAX spider," or both.
   - Click Attack.

### ZAP Spiders

ZAP offers two spiders for scraping web applications:

- **Traditional Spider:** Inspects HTML in a web application's response to detect links. It is fast but less effective for AJAX web applications that use JavaScript to generate links.
- **AJAX Spider:** Effective for JavaScript applications, it invokes a browser to render the full JavaScript of the page and follows any links. It is slower and requires additional configuration for headless environments.

### Passive vs. Active Scanning

- **Passive Scanning:** Investigates all proxy requests and responses without changing the response. Safe and can be run in the background, but may miss some vulnerabilities.
- **Active Scanning:** Uses known attack vectors against the selected target. Real attacks that might cause damage, should not be used without permission.

OWASP ZAP is a comprehensive tool for identifying vulnerabilities in web applications, offering capabilities for both passive and active scanning, authenticated testing, WebSockets scanning, fuzzing, and AJAX spidering. Whether used via a desktop application or automated API, it provides robust support for security professionals to enhance web application security.