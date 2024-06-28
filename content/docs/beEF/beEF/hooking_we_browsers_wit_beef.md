---
title: "Hooking Web Browsers with BeEF"
description: "Now that you know how to install and start BeEF, let’s explore how to exploit a browser by hooking into it."
icon: "code"
draft: false
---

### What Is Browser Exploitation?

Browser exploitation involves leveraging security vulnerabilities in a web browser to perform unauthorized actions. This can include a range of techniques aimed at gaining control over the browser or the system on which it's running, or to steal sensitive information. The basic principle behind browser exploitation is that a web browser, like any software, can have flaws or vulnerabilities in its code, which may cause the browser to behave in unintended ways.

Most current desktop and mobile browsers utilize JavaScript to deliver interactive web pages and applications. 
With BeEF, an attacker can exploit the widespread use of JavaScript to "hook" a browser. This allows the attacker to exploit potential vulnerabilities, execute commands, and potentially gain unauthorized access or extract sensitive information.

#### Hooking the Browser

Now that you understand browser exploitation and how BeEF works by injecting a malicious JavaScript file, let’s look at an example.

BeEF provides links to demo pages within the "Getting Started" section, which can be used to demonstrate proof of concept. In a real-world application, setting up a website or web server to serve the ‘hook.js’ code is a more practical method of tricking the victim into being hooked.

Hooking the browser can be accomplished by creating a website, adding the hook script to the header of the page, and then luring the victim to visit the site through a phishing attack. This could be done via a link sent through email, social media, or other means.

First, copy the link for the advanced demo page. You must change the IP address to match that of your attacking machine. This page includes the embedded hook.js script:
```bash
`http://10.0.2.15:3000/demos/butcher/index.html`
```


Next, find a way for the user to click on this link. For instance, you could craft a phishing email inviting company employees to participate in a contest.

To disguise the original URL, use a URL shortener. Once the user clicks on the shortened link, they won’t be directed to a contest page but to the BeEF demo page. At this point, their browser is hooked, granting control to the attacker.

#### BeEF Demo

We could further enhance this setup by creating a legitimate-looking contest form, enabling us to hook the user’s browser while simultaneously collecting information via the form. Once the user’s browser is hooked, it appears in the BeEF console.

From the details pane in the BeEF console, a wealth of information is available. This includes the browser type and version, the operating system it runs on, architecture, platform information, language details, installed plugins, and much more. These insights provide ethical hackers with valuable data to assess the security posture and identify potential vulnerabilities within the target's browser environment.

### Hooking With XSS
Another way to hook a browser is via XSS (Cross-Site Scripting).  Cross-site scripting is a vulnerability where an attacker loads JavaScript into a web application via user input. This attack could lead to the exposure of sensitive information.

The first step in this process is to find a website vulnerable to cross-site scripting. This will allow us to inject the malicious JavaScript into the site. 

Let’s look at how an attacker could use stored XSS and BeEF to hook a browser. This method can be very effective as it can infect many users. 

Once you’ve found a vulnerable site, inject the ‘hook.js’ JavaScript file into an input field such as "Message" below. 

---image>

When the victim's browser visits the site, it loads the file and hooks the browser, enabling us to execute various commands to launch attacks or exfiltrate data. 

### Cross-Site Scripting Attack with BeEF Hook

1. Setup: Attacker identifies a website vulnerable to XSS and creates the JavaScript BeEF hook.
2. Injection: Attacker injects the script into an inout field of the vulnerable website.
3. Control: The attacker issues commands from the BeEF server to control the victim's browser.
4. Interaction: Victim visits the compromised webpage, their browser executes the script, establishing a connection with the BeEF server.