---
title: "Networking in Linux"
description: "Welcome to the basics of Linux for Hacking."
icon: "code"
draft: false
---

As a hacker, networking is critical. We need to manage and manipulate our ability to connect with other computers to optimize our ability to compromise another machine. In some cases, you will need to connect but hide your IP address and other information. In this tutorial, I will attempt to show you the basics of networking in Linux.

---

## Step 1: Analyzing Networks and Network Interfaces

The most basic Linux command for analyzing networks is `ifconfig`. It's very similar to the Windows command, `ipconfig`. Let's take a look at it.

```bash
kali > ifconfig
```
<!-- ![img](https://i.imgur.com/aftxOdy.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="aftxOdy" data-context="false" ><a href="//imgur.com/aftxOdy"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

As you can see in this screenshot, `ifconfig` conveys a significant amount of information to the user. In the very first line, we see to the far left `eth0`. This is the first wired network connection, Ethernet 0 (Linux usually starts counting at 0 rather than 1. Get used to it if you are using Linux).

Following this, we see the type of network being used (Ethernet) and the Hwaddr (this is the globally unique address stamped on every piece of network hardware, in this case, the network interface card or NIC). This is usually referred to as the MAC address.

The second line then contains information on the IP address, in this case, `192.168.181.131`, the broadcast address (the address to send out information to all IPs on the subnet), and finally the network mask (this tells what part of the IP address is network and which part is hosts). There is a lot more technical info there, but it's beyond the scope of a Linux basics tutorial.

If we look down below to what appears to be a second stanza or paragraph, we see the start of another paragraph with `lo` to the far left. This is the loopback address or localhost. This is the address of the machine you're working on. You would use it if you simply wanted to test something like your own web server. It generally is represented with the IP address `127.0.0.1`.

Finally, in the third paragraph or stanza, we see an interface `wlan0`. This will only appear if you have a wireless interface or network adapter. In my case here, I obviously have a wireless adapter. Note that it also displays the MAC address of that device (Hwaddr).

When we have a wireless adapter, we can gather information on it with the command `iwconfig`. This will be particularly important in wireless hacking.

Let's take a look at our wireless devices with `iwconfig`.

```bash
kali > iwconfig
```
<!-- ![alt text](https://i.imgur.com/zWNuT49.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="aftxOdy" data-context="false" ><a href="//imgur.com/aftxOdy"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

In my case, I have no wireless extensions, so there is not much information.

This command gives considerable information on our wireless devices. The only network interface with wireless extensions, as we would expect, is `wlan0`. Within that paragraph, we learn what 802.11 standard our device is capable of (bg), that it is in Mode:Managed (this contrasts with a monitor or promiscuous mode we will need for most wireless hacks), that it is Not-Associated with an Access Point (AP), and its power is 20dBm. We will spend more time with this information in the wireless hacking section.

### ifup/ifdown

Network interfaces can be activated or deactivated by using the `ifup` (activate) and `ifdown` (deactivate) commands. These commands are simply followed by the name of the interface we want to activate/deactivate, such as:

```bash
kali > ifdown eth0
```

When we deactivate the `eth0` interface and then type the `ifconfig` command, we can see that the `eth0` is no longer active and does not appear.


## Step 2: Changing IP Addresses

Changing IP addresses can be fairly simple in Linux, I think much simpler than in the Windows GUI that requires multiple clicks. Remember that in most cases, you're going to have a dynamically assigned address from a DHCP server (see below in section 3). In some cases, you may need to reassign the address, especially if you're hacking. This can be useful in spoofing your IP address--making network forensics more challenging--but certainly not impossible.

We can do this by using the `ifconfig` command again with the interface we want to assign the IP to and the new IP address we want to assign to the interface. Such as:

```bash
kali > ifconfig eth0 192.168.181.115
```

Now, when we type `ifconfig`, we can see that our IP address has changed to the new IP address.

We can also change the netmask and broadcast address, if necessary, such as:

```bash
kali > ifconfig eth0 192.168.181.115 netmask 255.255.0.0 broadcast 192.168.1.255
```

## Step 3: DHCP (Dynamic Host Configuration Server)

Linux has a DHCP server that runs a daemon (daemon is simply a process that runs in the background in Linux) called `dhcpd` or `dhcp daemon`. It's this DHCP server that assigns IP addresses to all the systems on the subnet. It also keeps log files of which machines had which IP addresses at which time. It's this log that is often used to trace hackers in a forensic analysis after an attack.

When I want my machine to be assigned a new address from the DHCP server, I can simply call the server with the command `dhclient` followed by the interface (different Linux distros use different DHCP clients, but Kali is built on Ubuntu which uses `dhclient`), like this:

```bash
kali > dhclient eth0
```

The `dhclient` command sends out a DHCPDISCOVER request from the default NIC. It then gets an offer (DHCPOFFER) of `192.168.181.131` from the DHCP server, then confirms the IP assignment to the DHCP server. Now, if we type `ifconfig`, we can see that the DHCP server has assigned a new IP address.

## Step 4: DNS (Domain Name Service)

DNS, or Domain Name Services, is the service that enables us to type in a domain name like hackers-arise.com, which it then translates to the appropriate IP address. Without it, we would all have to remember thousands of IP addresses of our favorite websites (no small task even for a savant).

One of the most useful commands for the aspiring hacker is `dig`, which is the equivalent of `nslookup` in Windows but offers us much more information on the domain. For instance, if we `dig` hackers-arise.com and by adding the `ns` option, it will display the nameserver for hackers-arise.com.

```bash
kali > dig hackers-arise.com ns
```

By using the `dig` command with the `mx` option, we can get info on the email servers for hackers-arise.com.

```bash
kali > dig google.com mx
```

<!-- ![google](https://i.imgur.com/45avENv.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="45avENv" data-context="false" ><a href="//imgur.com/45avENv"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

As a hacker, the `dig` command and using DNS to obtain information on our potential target can be a key piece of early reconnaissance before attacking.

The most common Linux DNS server is the Berkeley Internet Name Domain, or BIND. In some cases, Linux users will often refer to DNS as BIND, so don't be confused. DNS or BIND simply maps individual domain names to IP addresses.

On our Kali system, we can point our DNS services to a local DNS server or a public DNS server. This pointing takes place in a plain text file named `/etc/resolv.conf`. Let's open it with leafpad:

```bash
kali > leafpad /etc/resolv.conf
```

As you can see in Line 3, the nameserver is set to a local DNS server at `192.168.181.2`. That works fine, but if I wanted to add or replace that DNS server with, say, Google's public DNS server at `8.8.8.8`, we can either add a line in the `/etc/resolv.conf` to read:

```plaintext
nameserver 8.8.8.8
```

Maybe more simply, we can use the command line to do the same by typing:

```bash
kali > echo "nameserver 8.8.8.8" > /etc/resolv.conf
```

As you can see above, our `/etc/resolv.conf` file points our DNS requests to Google's DNS server now.

With this change, your system will now go out to the Google public DNS server to resolve domain names to IP addresses, rather than our local DNS server. This might take a bit more time, so to remedy this, you might keep your local DNS server followed by a public DNS server and the system will only go to the public DNS server if the domain name cannot be found in the local DNS server.

### hosts

In addition to the DNS servers, there is a `hosts` file in your Linux operating system. This `hosts` file enables us to put in our own IP address-domain name mapping, kind of like a static DNS service. In other words, we can determine where our browser/system goes when we type in Microsoft.com (or any other domain) rather than the DNS server. This can be useful as a hacker if we want to hijack a TCP connection on our local area network to direct traffic to our malicious web server with a tool

 such as `dnspoof`.

By default, this file only has our localhost at `127.0.0.1` and Kali at `127.0.1.1`. We can add any IP/domain mapping we would like. For instance, in my `dnsspoof` tutorial, we mapped bankofamerica.com to our local website, say `192.168.181.131`. This would then direct our traffic intended for bankofamerica.com to our web server, and if we are using `dnspoof`, it would direct anyone on our LAN to our web server at `192.168.181.131`.