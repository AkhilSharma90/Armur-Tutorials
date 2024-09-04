---
title: "Cracking Passwords with Hashcat"
description: ""
icon: "code"
draft: false
---

### Introduction
Hashing is one of the pillars of cybersecurity, crucial for securing passwords and sensitive data. However, it’s often confused with encryption. Unlike encryption, hashed data is not reversible. This distinction is vital for applications like password storage, where security is paramount.

In this section, we will delve into Hashcat, a powerful command-line utility designed for cracking hashes. We will explore how hashing works, the features of Hashcat, and provide step-by-step instructions for its installation and use.

### Deeper Understanding to Password Hashing?
Hashing converts an alphanumeric string into a fixed-size string using a hash function, a mathematical function that generates another alphanumeric string from the input.

<!-- ![hashing](https://i.imgur.com/PjTbhvV.png) -->
<a target='_blank'><img src='https://i.postimg.cc/Wbj4HWnm/image.png' border='0' alt='image'/></a>

#### How Hashing Works
- **Hash Algorithms**: Common algorithms include MD5, SHA1, and SHA256. Despite the length of the input, the hash produced is always of a fixed length.
- **Example**: Using the MD5 algorithm, the string “Password123” hashes to:
  ```
  42f749ade7f9e195bf475f37a44cafcb
  ```
  The string “HelloWorld1234” hashes to:
  ```
  850eaebd5c4bb931dbb2bbcf7994c021
  ```

#### Encoding vs. Hashing
- **Encoding**: Transforms data into another format using a scheme that is reversible, such as Base64.

for example:
```sh
UGFzc3dvcmQxMjM=
```

- **Hashing**: Irreversible transformation, used for security purposes. 

### Introduction to Hashcat
Hashcat is a fast password recovery tool that helps break complex password hashes. It is a flexible and feature-rich tool that offers many ways of finding passwords from hashes.

Hashcat is also one of the few tools that can work with the GPU. While CPUs are great for sequential tasks, GPUs have powerful parallel processing capabilities. GPUs are used in Gaming, Artificial intelligence, and can also be used to speed up password cracking.

#### Key Features
- **Open Source**: Fully open source and actively maintained.
- **Multi-Platform Support**: Compatible with Windows, Linux, and Mac.
- **Algorithm Support**: Supports over 200 hashing algorithms.
- **Parallel Cracking**: Capable of cracking multiple hashes simultaneously.
- **Benchmarking**: Built-in benchmarking to test performance.

### How to Install Hashcat
#### Installing on Linux
For Ubuntu/Debian-based systems, use:
```bash
$ sudo apt install hashcat
```
#### Installing on Mac
Using Homebrew:
```bash
$ brew install hashcat
```
### Working with Hashcat
#### Creating Hashes
Before cracking passwords, generate hashes to work with. For example, using MD5 and SHA1:
- **MD5**: `42f749ade7f9e195bf475f37a44cafcb`
- **SHA1**: `b2e98ad6f6eb8508dd6a14cfa704bad7f05f6fb1`

We can store these hashes under the names `md5.txt` and `sha1.txt` to use them when working with Hashcat.

#### Cracking Hashes

Hashcat uses specific flags to crack hashes:
- **Syntax**: 
  ```bash
  $ hashcat -m <hash_type> -a <attack_mode> <hashfile> <wordlist>
  ```
- **Example**: Cracking an MD5 hash using the RockYou wordlist:
  ```bash
  $ hashcat -m 0 -a 0 md5.txt rockyou.txt
  ```

  You should get the output with the text.

#### Attack Modes
1. **Dictionary Attack (-a 0)**: Uses a wordlist to generate and compare hashes.
2. **Combinator Attack (-a 1)**: Combines words from a wordlist to form possible passwords. For example, if our wordlist contains the words “pass”, ”123", and ”hello”, Hashcat will generate the following wordlist.
```bash
passpass
pass123
passhello
123pass
123123
123hello
hellopass
hello123
hellohello
```
As you can see, using a simple wordlist can give us a number of combinations. This attack is great if we know some terms that might be used in the password. Keep in mind that, the larger the initial wordlist, the more complicated the final wordlist gets.

3. **Mask Attack (-a 3)**: The mask attack is similar to the dictionary attack, but it is more specific. Brute-force approaches like dictionary attacks can take a long time to crack a password. But if we have information regarding the password, we can use that to speed up the time it takes to crack the password.

For example, if we know the length of the password and a few characters that might be in the password, we can generate a custom wordlist with those characters.

The mask attack is out of scope for this article, but you can learn more about mask attacks here.

In addition to these common attack types, there are more attack modes in Hashcat. This includes Hybrid mode, Permutation attack, Rule-based attack, and so on. Each of these modes can be used for specific use cases and to speed up password cracking.

### Defending Against Hashcat
To protect against hash cracking:
- **Use Strong Passwords**: Lengthy and complex passwords are harder to crack.
- **Add Salts**: A salt is an additional string added to a password before hashing, making precomputed attacks like rainbow tables ineffective.
- **Dynamic Salts**: Use a function to generate a unique salt for each password.

### Summary
Hashing is the method of using a mathematical function to generate a random string. It is a one-way function and helps to secure data such as user passwords.

Hashcat is a powerful tool that helps to crack password hashes. Hashcat supports most hashing algorithms and can work with a variety of attack modes.

To enforce security and protect hashes from attacks, use strong passwords and salts before hashing passwords.