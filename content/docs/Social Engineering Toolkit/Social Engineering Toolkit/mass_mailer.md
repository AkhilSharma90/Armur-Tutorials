---
title: "Mass Mailer"
description: ""
icon: "code"
draft: false
---

The Social-Engineer Toolkit (SET) offers a mass mailing feature for conducting phishing attacks. This tool enables both targeted individual phishing and large-scale campaigns targeting multiple recipients at once.

In this section, we'll demonstrate an individual attack, incorporating a malicious link to a cloned website. The process for mass mailing is similar, with the main difference being the use of multiple email addresses instead of just one.

To use a Gmail account for this purpose, you'll need to set up an App password. This allows access to your Google Account from applications that don't support two-factor authentication. If using your own domain, you'll require an SMTP open relay. SMTP2GO is a recommended service that offers up to 1,000 free emails.

Let's set up a phishing campaign using a Gmail address to send an email containing a malicious link. We'll impersonate GitHub support and encourage the target to click on a link leading to a cloned website hosted on our server.

From the main menu, choose option one, “Social Engineering Attacks,” then choose option five, “Mass Mailer Attack,” and finally select “E-mail Attack Single Email Address.”

You will be asked to input the target and sender email. Let’s walk through each prompt.

- Send email to: This is the email of the target.
- Next, you can use a Gmail account or one from your server.
- Your Gmail account: The account you want to send the email from.
- The FROM NAME the user will see: The from name you want to be displayed.
- Flag this message(s) as high priority: Whether you want it to be flagged as high priority.
- Do you want to attach a file: Yes or No
- Do you want to attach an inline file: Yes or No
- E-mail Subject: The subject line for the email.
- Send the message as HTML or plain text: Choose how you want to send the email.
- Enter the body of the message: Enter the actual email text here. Once you have finished writing the email, type END and hit enter.


SET will tell you when it has finished sending the emails. Once the email has been sent, your target should receive it in their inbox.