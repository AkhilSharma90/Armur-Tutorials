---
title: "Website Cloning and Credential Harvesting"
description: "In this section, you will learn about the Social Engineering Toolkit's Website Cloning and Credential Harvesting."
icon: "code"
draft: false
---

Website cloning and credential harvesting are two essential techniques in the arsenal of social engineers. These techniques involve creating a replica of a legitimate website and tricking users into entering their sensitive information on the fake website, such as usernames and passwords.

This information can then be used for various malicious activities, including unauthorized access to user accounts, identity theft, or even corporate espionage.

### Clone Site
Before setting up a cloned site in SET, you need to enable the Apache web server in the SET configuration file located at /etc/setoolkit/set.config. Change the line APACHE_SERVER=OFF to APACHE_SERVER=ON, save the file, and restart SET to apply the changes.

To use the Site Cloner in SET, follow these steps:

- Launch SET by running setoolkit in the terminal.
- Select option one, which is Social-Engineering Attacks.
- Choose option two, Website Attack Vectors.
- Select option three, Credential Harvester Attack Method.
- Choose option two, Site Cloner.

After that:

- Enter the IP address of the machine running SET, which will be used as the redirect IP for captured credentials.
- Input the URL of the target website you want to clone (e.g., https://www.github.com/login).

SET will now clone the website and host it on your machine, with a phishing page to capture user credentials.

For this to work effectively, you need to clone a site that has the username and password fields on the same page.

### Credential Harvesting
When users visit the cloned website and enter their login information, the credentials will be captured and sent to the attacker's machine. This information can then be used to gain unauthorized access to the user's account on a legitimate website.

The user will then be redirected to the actual login page of the service.

If we head back to our terminal in Kali, we should see the credentials come through.

To make the cloned website more convincing, attackers often employ tactics like typosquatting (registering domains with similar names to the target site), such as amzon.com (instead of amazon.com), or using the target site's name as a subdomain of another legitimate site they control (amazon.myfakesite.com).

These techniques help create a sense of credibility for the fake website, increasing the chances of successfully tricking users into revealing their credentials.

It's important to note that tools like SET can quickly deploy cloned websites on cloud platforms like AWS, complete with public URLs, making it even easier for attackers to create convincing phishing campaigns.