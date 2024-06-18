---
title: "Text Manipulation"
description: "Welcome to the basics of Linux for Hacking."
icon: "code"
draft: false
---

In Linux, nearly everything you deal with directly is a file, and most often these will be text files. For instance, all configuration files in Linux are text files. To reconfigure an application, you simply open the configuration file, change the text, save the file, and then restart the application—your reconfiguration is complete. With so many text files, manipulating text becomes crucial in managing Linux and Linux applications. In this chapter, you’ll use several commands and techniques for manipulating text in Linux.

For illustrative purposes, I’ll use files from the world’s best network intrusion detection system (NIDS), Snort, which was first developed by Marty Roesch and is now owned by Cisco. NIDSs are commonly used to detect intrusions by hackers, so if you want to be a successful hacker, you must be familiar with the ways NIDSs can deter attacks and the ways you can abuse them to avoid detection.

---

**Note:** If the version of Kali Linux you’re using doesn’t come preinstalled with Snort, you can download the files from the Kali repository by entering:

```bash
apt-get install snort
```

### Viewing Files

As demonstrated in Chapter 1, the most basic text display command is probably `cat`, but it has its limitations. Use `cat` to display the Snort config file (`snort.conf`) found in `/etc/snort`:

```bash
kali > cat /etc/snort/snort.conf
```

Your screen should now display the entire `snort.conf` file, which will stream until it comes to the end of the file, and should look something like the following:

```
#-------------------------------------------------
# VRT Rule Packages Snort.conf
#
# For more information visit us at:
# http://www.snort.org Snort Website
--snip--
# event thresholding or suppressions commands...
```

This isn’t the most convenient or practical way to view and work with this file. In the following two sections, I will show you the `head` and `tail` commands, which are two methods for displaying just part of a file’s content to more easily view the key content.

### Finding the Head

If you just want to view the beginning of a file, you can use the `head` command. By default, this command displays the first 10 lines of a file. For instance, to show the first 10 lines of `snort.conf`:

```bash
kali > head /etc/snort/snort.conf
```

The output will be:

```
#-------------------------------------------------
# VRT Rule Packages Snort.conf
#
# For more information visit us at:
--snip--
# Snort bugs: bugs@snort.org
```

If you want to see more or fewer than the default 10 lines, enter the quantity you want with the dash (-) switch after the call to `head` and before the filename. For example, to see the first 20 lines of the file:

```bash
kali > head -20 /etc/snort/snort.conf
```

The output will be:

```
#-------------------------------------------------
# VRT Rule Packages Snort.conf
#
# For more information visit us at:
--snip--
# Options : --enable-gre --enable-mpls --enable-targetbased
--enable-ppm --enable-perfprofiling enable-zlib --enable-act
live-response --enable-normalizer --enable-reload --enable-react
```

You should see only the first 20 lines of `snort.conf` displayed in your terminal window.

### Finding the Tail

The `tail` command is similar to the `head` command, but it’s used to view the last lines of a file. Let’s use it on `snort.conf`:

```bash
kali > tail /etc/snort/snort.conf
```

The output will be:

```
#include $SO_RULE_PATH/smtp.rules
#include $SO_RULE_PATH/specific-threats.rules
#include $SO_RULE_PATH/web-activex.rules
#include $SO_RULE_PATH/web-client.rules
#include $SO_RULE_PATH/web-iis.rules
#include $SO_RULE_PATH/web-miscp.rules
#Event thresholding and suppression commands.
```

Using these commands, you can efficiently manage and view parts of large text files, making text manipulation much easier in Linux.

### How to use the `stat` command

You use the `stat` command to obtain detailed information about a file.

```bash
stat <file_name>
```

The `stat` command provides information about the file name and extension, permissions, creation time, modification time, last access time, and more.

Now is a great time to learn about permissions. If you run the commands `ls -la` or `stat`, you may see something like this: `drwxrwxrwx`. Let’s break it down.

The read (r) permission allows you to see the contents of a file, the write (w) permission allows you to modify the file, and the execute (x) permission allows you to run it as a process if it is a script or executable.

There are 3 classes of users that can access a file: user, group, and others. The root account is another class but is not considered here.

Each ‘rwx’ set is owned by a permission class. If the space reads a letter, the set has that permission. If it has a dash, they do not have that permission.

The ‘d’ at the front represents whether it is a directory or a file. The ‘d’ means it’s a directory, and a dash (-) means it's a file. Technically, a directory is a special type of file, but that’s a story for another day.

### How to use the `echo` command

You use the `echo` command to print out input. Let’s use an example to make things clearer.

```bash
echo "<text>"
```

You can also use `echo` with the `>` operator to write text to files.

### How to use the `grep` command

You use the `grep` command to extract specified text from a file using the pipe operator.

```bash
grep "<text>" <file_name>
```

The command above instructs the computer to print the contents of a file and, using the pipe operator, directs the `grep` command to use it as input. This process is called piping one command through another and can be done multiple times. The found text is shown in red.

`grep` is commonly used to search for specific text in large files. For example, if you are looking for credentials for a specific user in a file with a lot of text, you could use `grep` to search for keywords like ‘password’, ‘login’, and other relevant terms.

### How to use the ‘help’ flag and man pages

The ‘help’ flag isn’t necessarily a command but it is a great aid if you are confused about an app or tool. Simply use the following:

```bash
<app or tool> --help
```

This will provide quick, bite-sized information about it. `man`, on the other hand, gives you all documented information about the app.

```bash
man <app>
```

You may notice that in some cases, `-h` is used as the short form of the help flag. If it starts with a single dash, that’s the short form. If it starts with two dashes, it’s the long form.