---
title: "A Getting Started Guide To Linux"
description: "Welcome to the basics of Linux for Hacking."
icon: "code"
draft: false
---

### What is Linux?

The Linux kernel was created by Linus Torvalds in 1991. It becomes an operating system with the addition of components like a package manager, desktop environment, shell, and bootloader.

As an open-source OS, Linux offers numerous customizations. Each unique combination of these customizations is called a distribution or "distro."

There are hundreds, if not thousands, of distros worldwide, each optimized for specific purposes or created just for fun by enthusiasts.

Notable distros include:

- **Ubuntu** (Most common)
- **Elementary OS** (Visually appealing)
- **Debian** (Neat and classy)
- **Arch Linux** (For advanced users)
- **Red Hat Enterprise Linux**

### Why Hackers Prefer Linux

Linux is the preferred OS for many hackers due to its open-source nature, lower vulnerability to malware, lightweight structure, portability, and compatibility with various hacking tools.

Windows, being a closed system, restricts many activities hackers need. Mac OS also has limitations due to its proprietary software. In contrast, Linux offers numerous distros that can be freely modified.

Commonly used hacking distros include Kali Linux, Parrot, BlackArch, and Archstrike. The options, however, are limitless.

One of Linux's standout features is its customizability, particularly in the desktop environment, which is essentially the visual interface of the OS.

In Windows, there’s a basic taskbar, start menu, and a background with icons. While you can make slight modifications, Linux offers extensive customization.

Popular desktop environments include:

1. **Gnome** 
2. **KDE Plasma** (Similar to Windows)
3. **Xfce** (For advanced users)
4. **Mate** (Resource-efficient)

If you're into programming, you can build upon an existing desktop environment or develop your own to suit your needs.

**Tip:** If you're new to Linux, you might want to avoid replacing your default OS immediately. Many users are accustomed to a GUI (Graphical User Interface), but Linux users often rely on the CLI (Command Line Interface). This is because Linux targets developers and scientists more than the average user.

It's advisable to install a Linux distro on a hypervisor like VirtualBox to get accustomed to it (I don’t recommend VMware due to a known vulnerability at the time of writing). You can learn how to install Linux [here](https://example.com).

### Linux Package Management

Linux differs from other OSs, including in how applications are installed. Instead of using .exe and .msi installers like in Windows, Linux uses package managers.

A package manager is software that manages the installation of applications. Popular package managers include:

- **Apt** (Linux)
- **Chocolatey** (Windows)
- **MacPorts** (MacOS)
- **Pip** (Python)
- **Npm** (JavaScript)
- **Gradle** (Java)
- **Composer** (PHP)

With some commands in the terminal, and help from a package manager, your Linux system can connect to servers, download applications, and install them. System updates are managed similarly.

While some .exe and .msi installers can work on Linux with the help of Wine, a software that adds a Windows compatibility layer, not all applications are supported.

Gamers might consider installing Steam or SteamOS for a better experience 🎮.

### Linux File Structure

Like Windows, Linux has a directory tree. At the root is the ‘/’ folder, equivalent to the C: drive in Windows. It contains all directories, files, and applications.

Important directories include:

- **/bin**: Binary or executable programs (good for persistent scripts)
- **/etc**: System configuration files (useful for credentials)
- **/home**: User home directories (default directory on terminal start)
- **/opt**: Optional or third-party software
- **/tmp**: Temporary files, cleared on reboot (useful for temporary scripts)
- **/usr**: User-related programs
- **/var**: Log files (crucial for forensic analysis)

There's much more to the Linux file structure, but this should suffice for now.

Let's get hands-on with the terminal and run some essential commands every hacker should know.

### Intro to the Linux Shell

A shell is a text-based interface for controlling a Linux computer. Similar to Microsoft's PowerShell or cmd, it acts as the interface between the user and the kernel, aside from the GUI (Graphical User Interface).

There are various types of shells, each built with improvements based on previous versions or optimized for a particular goal.

Hackers frequently use shells because they provide the fastest and most efficient way to deliver instructions to a computer. While the GUI is useful, it can be limited because some features are inaccessible graphically, or the tool you want to use lacks a graphical interface.

Common shells include:

- The Bourne shell (sh)
- The GNU-Bourne Again shell (bash)
- The Z shell (zsh)
- The C shell (csh)
- The Korn shell (ksh)

**Quick lesson:** The terms ‘terminal’ and ‘shell’ are often used interchangeably in the cybersecurity world and throughout this article. However, they are different. The terminal is the program that lets you access the shell via a graphical interface.

---

### Basic Linux Shell Commands

In this article, we’ll go through the following commands: `whoami`, `pwd`, `ls`, `cd`, `touch`, `cat`, `nano`, operators, `mv` and `cp`, `mkdir`, `rm` and `rmdir`, `stat`, `echo`, `grep`, the ‘help’ flag and man pages.

You will need any Linux distro of your choice, though I suggest Kali. If you don’t know how to install one, you can read this article.

Open up the application called ‘Terminal’ and let’s begin.

#### How to use the `whoami` command

You use this command to check which user you are. On a personal computer, you are most likely to have only two accounts: the one created when installing the OS and root. If you are in the terminal as a normal user (account), you can try it out.

```bash
whoami
```

If you want to be root, run the command `sudo su` and put in your password. Try `whoami` and the terminal will tell you root:

```bash
sudo su
whoami
```

Enterprise computers tend to have many users on one computer. Each has various permissions, some more than others. When you gain initial access post-exploitation, you usually start with a standard account. To check the name of the compromised account, use this command.

#### How to use the `pwd` command

The Present Working Directory (pwd) command informs you of where you currently are in the directory tree. By default, this usually is the home directory.

```bash
pwd
```

If you are a beginner, it's quite normal to be lost in the directory tree and suddenly lose track of where you are. This command helps you to keep track of things.

Depending on your distro, you may see a `~` symbol when you open the terminal. That is the symbol for the default home directory for the user. It’s like the `C:\Users\<default_user>` folder in Windows, containing all user-specific files. In Linux, it will be in the format `/home/<default_user>`.

#### How to use the `ls` command

You use the `ls` command to list the contents of a directory. It lets you know what files are inside a directory without a GUI.

When used with flags, it’s a Swiss army knife, with various ways of showing what’s in the directory.

Common flags you might want to take note of are `-l` (long listing), `-a` (all aka show hidden files), and `-c` (show recently modified).

```bash
ls -l
```

Flags are features of applications/tools that allow you to tell them what to do. For example, long listing can be activated by using the command `ls -l`.

#### How to use the `cd` command

You use the Change Directory (cd) command to traverse the directory tree.

```bash
cd <directory>
```

If you run the command `ls -a`, you will notice that there are two files that are always there no matter the folder: `.` and `..`. The `.` file represents the current directory, and the `..` file represents the parent directory (the directory above the current one).

#### How to use the `cat`, `more`, and `less` commands

These commands display the content of files to the terminal. However, there are notable differences. `cat` is commonly used for files with small amounts of text, while `less` and `more` are used for files with large amounts of text, allowing controlled output with the arrow keys.

```bash
cat <file_name>
more <file_name>
less <file_name>
```

`cat` prints the output directly to your terminal, while `more` and `less` allow you to use the arrow keys. Output commands are used to gather information and credentials from compromised systems.

#### How to use the `touch` command

You use the `touch` command to create files. You can write to these files in several ways, such as using a text editor or piping input into it.

```bash
touch <file_name>
```

You can then use the `ls` command to check if your file has been created.

#### How to use the `nano` command

Nano is a popular built-in text editor in Linux. It’s very common because it's easy to use and supported in many CLI environments. Other common text editors are Vim and gedit.

You can edit a file with the following command:

```bash
nano <file_name>
```

The nano interface includes some commands at the bottom for assistance. ‘^’ means the Ctrl button, and the ‘M’ button is Alt. ‘^S’ (or Ctrl + S) saves the file. The nano command is used by hackers to change information in files, edit logs, or if you are a red hat hacker, delete essential configuration file lines.

---

### Command Chaining Operators

‘Chaining’ commands means writing multiple commands together and executing them in various ways using special characters. Examples include:

- Ampersand (`&`): Runs a program in the background
- Logical AND (`&&`): The following command runs only if the previous one successfully ran
- Pipe (`|`): The output of the previous command acts as input for the next command
- Overwrite (`>`): Overwrites the content of a file with the output of the previous one
- Append (`>>`): Appends the output from the previous command to a file

---

### How to use the `mv` and `cp` commands

These commands are quite similar but have notable differences. Use `mv` to move a file to another location and `cp` to copy a file to another location.

```bash
mv <file_name> <new_location>
cp <file_name> <new_location>
```

There isn’t a command for renaming files in Linux, so most people use the `mv` command by following this syntax:

```bash
mv <original_file_name> <new_file_name>
```

Try it yourself to get a feel.

#### How to use the `mkdir` command

The `mkdir` command creates directories. You could use this to make a custom directory that only you can access on a compromised system to keep scripts or tools for persistence.

```bash
mkdir <directory>
```

#### How to use the `rm` and `rmdir` commands

The `rm` command removes files, and `rmdir` removes directories.

```bash
rm <file_name>
rmdir <directory>
```

Linux doesn't easily delete folders if they are not empty. Use the ignore-fail-if-non-empty flag to delete both files and directories.

Be extremely careful with these commands as they do not send the deleted files or directories to the Trash/Recycle bin. They're just gone.

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

### How to Update Your Linux

This entire section can actually be done with a single command, but let’s break it down to understand the whole process. The task: update your OS. To achieve this, you need to do two things:

1. **Update the local repository info**: Think of this like checking for updates before actually downloading and installing them.
2. **Upgrade the system**: This involves downloading the updates and then installing them.

The first command to run is:

```bash
sudo apt update
```

- `sudo`: Indicates we are running the command with higher permissions
- `apt`: The package manager
- `update`: Instructs the computer to update its local information about the repository

After you enter this command and provide your password, your computer will download information from the repositories about what packages (applications) need updates.

Once the update is complete, run the next command to download and install the updates:

```bash
sudo apt full-upgrade
```

**Note:** You can interrupt the package download process, but never the installation process, as it might break your OS and render it unusable.

After the upgrades have finished installing, you will want to reboot your computer to fully implement all updates.

You have successfully updated your system. Remember how I said all this could be done with one command? Here it is:

```bash
sudo apt update && sudo apt upgrade -y && reboot
```

This command is composed of three parts:

1. `sudo apt update`
2. `sudo apt upgrade -y`
3. `reboot`

The `&&` symbols are logical AND operators that tell the computer to run the first command, and if it completes successfully, proceed to the next one. The `-y` flag tells the computer to carry out the upgrade without requiring user input.

This combined command updates, upgrades, and then reboots the system.