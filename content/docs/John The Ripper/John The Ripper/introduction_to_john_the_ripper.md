---
title: "What is John The Ripper and How To Use It"
description: "Learn how to use John The Ripper to crack passwords."
icon: "code"
draft: false
---

One of the most famous and powerful tool for password cracking is John the Ripper.

John the Ripper is the tool that is used by most of the ethical hackers to perform dictionary attacks for password cracking. In this section, you will learn what is John the Ripper, How to use John the Ripper, How John the Ripper password cracker works and practical tutorial on John the Ripper usage.

### What is John the Ripper?
John the Ripper is the name of the password cracker tool that is developed by Openwall. As the name, It is used to crack password hashes by using its most popular inbuilt program, rules and codes that are also an individual password cracker itself in a single package.

It automatically detects types of password hashes, you can also customize this tool according to your wish. It can be used to crack password-protected compressed files like Zip, Rar, Doc, pdf etc.

The penetration testers, ethical hackers, security experts and other Cyber Security professionals use this tool to find weak algorithms and then make them strong so that they can't be hacked. 

- Security professionals build their confidential files with a strong hash algorithm to prevent external unauthorized access.
- Hackers used it to crack multiple accounts and simply crack their credentials.
- Security experts use it to strengthen their encryption.
- It can also be used for hacking shells and passwords
- SHA-crypt hashes
- It provides a mangling feature which is a preprocessor in JTR that optimizes the word list to make the password cracking process faster.

### Understanding Hash Functions
Hashing is the process of converting an input of any length into a fixed-size string of text using the mathematical function (Hash Function) i.e, any text no matter how long it is can be converted into any random combination of numbers and alphabets through an algorithm

<blockquote class="imgur-embed-pub" lang="en" data-id="6PfG5OL" data-context="false" ><a href="//imgur.com/6PfG5OL"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

**Hash function example**
Let's understand hashing process with a real-life example. The best example is how our system password stores in the database.

#### Without Hashing Algorithm
Whenever you set a password it will directly store in the database as a text file that may be read easily if the system compromised. It will save your password in a plain file as the same string you entered. Check the below image with syntax and example

<blockquote class="imgur-embed-pub" lang="en" data-id="kNAX7aG" data-context="false" ><a href="//imgur.com/kNAX7aG"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

#### With Hashing Algorithm
Whenever you set your password it will take your password as an input string and with the help of hashing function, it converts that password into a hash (random combination of number and alphabet) and stores it in the database. It enhances security by encrypting input strings. It will save your password in a different format so no one can read it even if your system compromise.

![example](https://i.imgur.com/NArjGgR.png)

<blockquote class="imgur-embed-pub" lang="en" data-id="NArjGgR" data-context="false" ><a href="//imgur.com/NArjGgR"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Types of Hashing Algorithms
John the Ripper tool are able to perform various attacks and crack a lot of hash formats such as:
- MD2
- CRC32
- SHA-1
- SHA-256
- MD5
- RipeMD128
- Adler32
- Tiger

You can check the formats that supports with the following command on your terminal:

```sh
john --list=formats
```
<!-- ![list](https://i.imgur.com/3z7KB5s.png) -->

<blockquote class="imgur-embed-pub" lang="en" data-id="3z7KB5s" data-context="false" ><a href="//imgur.com/3z7KB5s"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### How JRP Works?
The main objective of John the Ripper is to crack the password. There are many ways that can be supported but it is mainly known for Dictionary attacks. However, you can also run other types of attacks like Bruteforce attack, Rainbow Table etc.

**Dictionary attack**: This is the popular and most usable attack in the JTR (John the Ripper) password cracker tool where we used pre-defined words or a list of words that can be used to crack the password. This attack uses the words from the wordlist (A text file having pre-defined words) and matches every single word from the list with a password to crack in sequence. 

**Brute-force attack**: If you are using this attack then you have to do the configuration of few things before its use such as the defining minimum and maximum lengths of the password, defining possible characters that you want to test during the cracking process like (special characters, alphabets and numbers).

For Example, The matching string that you are using for cracking passwords should include uppercase alphabets, special characters and numbers like **ABC32@$**

The user gets a password on the successful match, but this effective process is slow. for example, a 10-character password including upper and lower letters along with numbers and special characters will take over 10 years to be guessed by a computer

### Getting John The Ripper

It was developed for Unix Operating systems and was only work on Linux based systems but now available for all platforms such as Windows, BSD, Mac.

In Kali Linux John the Ripper is already available under password cracking metapackages, so you don't need to download it.

You can download John the Ripper password cracker from the official website [Openwall](https://www.openwall.com/john/).

If you are using different Linux distributions like Ubuntu, Fedora, Arch etc. then you can install it by running the below single command the difference in command only will be the package manager i.e, for Ubuntu you use apt, Arch uses Pacman and Redhat uses yum.

```sh
sudo apt-get install john
```

### How to Use John the Ripper
Using this password cracker tool is very easy and straightforward, you just need to type john followed by the hash file that you want to crack and then just define the format of the hash and hit enter.

```sh
john hash.txt --format=RAW-MD5
```

In the above picture, you can see lots of supported formats, You can do various things with this tool such as using wordlists, rules, modes, options, decrypting formats etc, We will see below how to use these various things in this tool

### Cracking Zip File

Assume you have a zip file that is password protected called `protected.zip`. We can use John The Ripper to crack the password. We first need to generate a hash of the zip file. You can use the below command and will generate the hash value into a `hash.txt` file.

```sh
sudo zip2john protected.zip > hash.txt
```
So now we have a hash of our zip file that we will use to crack the password. In the below command we use the format option to specify the zip file and then the hash.txt file where we store our hash value.

```sh
sudo john --format=zip hash.txt
```

This should complete and return the password which you can then use to open the zip file.

### Cracking MD5 Password
In this example I am generating a hash by using md5 hash generator to show you how to crack MD5 formatted files password. In the below image you can see I have generated the hash of the 12345 string. You can copy the MD5 hash to perform the same practical

<!-- ![cracking](https://i.imgur.com/Sp4Vm3j.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="Sp4Vm3j" data-context="false" ><a href="//imgur.com/Sp4Vm3j"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

We used the string `123456789`. The `MD5` hash is `25f9e794323b453885f5181f1b624d0b` and the `SHA1` `f7c3bc1d808e04732adf679965ccc34ca7ae3441`.

Now you can create a `.txt` file and put the MD5 hash using the following commands.

<!-- ![hash](https://i.imgur.com/ofa8jsv.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="ofa8jsv" data-context="false" ><a href="//imgur.com/ofa8jsv"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

We can now crack the password by running the following command
```sh
john hash.txt --format=RAW-MD5
```

<!-- ![img](https://i.imgur.com/ekzjIHz.png) -->
<blockquote class="imgur-embed-pub" lang="en" data-id="ekzjIHz" data-context="false" ><a href="//imgur.com/ekzjIHz"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

You can see, we get the string back as `123456789`.

### Cracking Linux Password
When we create a password of the Linux system it stores in /etc/shadow location in encrypted form i.e, like a hash. So cracking a Linux password is easy with just a single command that is given below.

```sh
sudo john /etc/shadow
```

Now we know what is John the Ripper, How to use John the Ripper, How John the Ripper password cracker works, How passwords can be cracked and also a tutorial on its real-life important uses, but this not get over yet there are lots of other things that can be done by JTR.

Remenber if the password is long it will also take long time to crack.