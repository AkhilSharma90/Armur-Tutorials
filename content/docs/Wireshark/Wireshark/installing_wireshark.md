---
title: "An Introduction To Wireshark and How To Install It"
description: "Learn more about Wireshark"
icon: "code"
draft: false
---

This guid will show you how to install Wireshark on Ubuntu 22.04 and use this tool to your advantage.

After reading this guide, you will be knowledgeable in installation, updating packages, Wireshark installation methods, and post-installation steps.

### What is Wireshark?

Wireshark is a network packet analyzer. A network packet analyzer presents captured packet data in as much detail as possible.

You could think of a network packet analyzer as a measuring device for examining what’s happening inside a network cable, just like an electrician uses a voltmeter for examining what’s happening inside an electric cable (but at a higher level, of course).

In the past, such tools were either very expensive, proprietary, or both. However, with the advent of Wireshark, that has changed. Wireshark is available for free, is open source, and is one of the best packet analyzers available today.

### What is Wireshark used for?

Wireshark is a great tool that converts network traffic into a human-readable format. If we look at the key features of Wireshark, it can capture live traffic packets, analyze real-time network traffic, and filter traffic based on different criteria.

- Researchers use Wireshark to analyze the content of the packets and create various statistics;
- Security teams use Wireshark to examine suspicious network traffic content, identify traffic spikes, etc.;
- Troubleshoot network issues;
- Identifying and learning about network traffic protocols;
- Debugging protocol implementation;
- Verifying network applications.

### How to use Wireshark?

Since Wireshark is open source, you can download and use any version of Wireshark for free from wireshark.org. It's available for Linux, Windows, and Mac. It also has a user-friendly graphical user interface (GUI) to simplify the analysis process. While Wireshark initially supported only Solaris and Linux, now it runs on all the major operating systems. Keep reading for detailed instructions on how to install and start using Wireshark.

### Installing Wireshark

To install Wireshark, open your terminal and run the following command:

```sh
sudo apt update && sudo apt upgrade
```

Now you are ready to install Wireshark. Run the following command:

```sh
sudo apt install wireshark
```

You will be asked for authorization to continue during this installation. Type ‘Y’ and press Enter to continue with the installation.

During the installation, the following prompt window will appear for configuring wireshark-common in package configuration. This prompt provides you with two options to choose from. One is to allow using non-superusers. The second is to disable using non-superusers and only allow root users to access and use it. You can select ‘Yes’ or ‘No’ based on your choice.

### Running Wireshark

Once wireshark is installed, you can run the GUI from the interface or run the following command

```sh
sudo wireshark
```

<a target='_blank'><img src='https://i.postimg.cc/MZ0BHj3D/image.png' border='0' alt='image'/></a>

This section gave you a tutorial on how to install Wireshark on a linux machine. You are now ready to start using wireshark.
