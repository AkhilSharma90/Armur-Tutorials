---
title: "Hashing and Password cracking in Metasploit"
description: "Learn more about the Metasploit framework."
icon: "code"
draft: false
---

## Introduction

Metasploit Framework includes robust support for handling password hashes and cracking them. This article explores the various libraries, dependencies, and functionalities built into Metasploit for dealing with password hashes and cracking them using John the Ripper (JtR) and Hashcat. Note that storing credentials in the Metasploit database is covered separately.

## Understanding Hashes in Metasploit

Metasploit supports extracting hashes from various software systems, including operating systems (Windows, macOS, Linux) and applications (Postgres, Oracle). The framework includes a library to identify hash types, standardizing to John the Ripper's formats.

### Identifying Hash Types

Metasploit uses the `identify.rb` library to identify hash types. This library can be given a hash and will return the corresponding JtR type. This standardization ensures consistency across different modules and future updates.

#### Example of Hash Identification

Here's a simple example demonstrating how to load the library and call its function:

```ruby
require 'metasploit/framework/hashes/identify'
puts identify_hash "$1$28772684$iEwNOgGugqO9.bIz5sk8k/"
puts identify_hash "This_is a Fake Hash"
puts identify_hash "_9G..8147mpcfKT8g0U."
```

**Output:**

```plaintext
msf5 > irb
[*] Starting IRB shell...
[*] You are in the "framework" object

irb: warn: can't alias jobs from irb_jobs.
>> require 'metasploit/framework/hashes/identify'
=> false
>> puts identify_hash "$1$28772684$iEwNOgGugqO9.bIz5sk8k/"
md5
=> nil
>> puts identify_hash "This_is a Fake Hash"

=> nil
>> puts identify_hash "_9G..8147mpcfKT8g0U."
des,bsdi,crypt
```

## Cracking Passwords with JtR and Hashcat

Metasploit supports password cracking using both John the Ripper (JtR) and Hashcat. Each tool has its unique features and commands.

### Differences Between Hashcat and JtR

| Feature                | JtR                 | Hashcat                  |
|------------------------|---------------------|--------------------------|
| Session                | --session           | --session                |
| No Logging             | --no-log            | --logfile-disable        |
| Config File            | --config            | (n/a)                    |
| Previous Cracks        | --pot               | --potfile-path           |
| Type of Hashes         | --format            | --hash-type              |
| Wordlist               | --wordlist          | (last parameter)         |
| Incremental            | --incremental       | --increment              |
| Rules                  | --rules             | --rules-file             |
| Max Run Time           | --max-run-time      | --runtime                |
| Show Results           | --show              | --show                   |

### Hash Settings

| Hash Type               | JtR Format            | Hashcat Format |
|-------------------------|-----------------------|----------------|
| cram-md5                | hmac-md5              | 10200          |
| des                     | descrypt              | 1500           |
| md5 (crypt is $1$)      | md5crypt              | 500            |
| sha1                    |                       | 100            |
| bsdi                    | bsdi                  | 12400          |
| sha256                  | sha256crypt           | 7400           |
| sha512                  | sha512crypt           | 1800           |
| blowfish                | bcrypt                | 3200           |
| lanman                  | lm                    | 3000           |
| NTLM                    | nt                    | 1000           |
| mssql (05)              | mssql                 | 131            |
| mssql12                 | mssql12               | 1731           |
| mssql (2012/2014)       | mssql05               | 132            |
| oracle (10)             | oracle                | 3100           |
| oracle 11               | oracle11              | 112            |
| oracle 12               | oracle12c             | 12300          |
| postgres                | dynamic_1034          | 12             |
| mysql                   | mysql                 | 200            |
| mysql-sha1              | mysql-sha1            | 300            |
| sha512($p.$s) - vmware  | dynamic_82            | 1710           |
| md5 (raw, unicode)      | Raw-MD5u              | 30             |
| NetNTLMv1               | netntlm               | 5500           |
| NetNTLMv2               | netntlmv2             | 5600           |
| pbkdf2-sha256           | PBKDF2-HMAC-SHA256    | 10900          |
| Android (Samsung) SHA1  |                       | 5800           |
| Android (non-Samsung)   |                       | 110            |
| Android MD5             |                       | 10             |
| xsha                    | xsha                  | 122            |
| xsha512                 | xsha512               | 1722           |
| PBKDF2-HMAC-SHA512      | PBKDF2-HMAC-SHA512    | 7100           |
| PBKDF2-HMAC-SHA1        | PBKDF2-HMAC-SHA1      | 12001          |
| PHPass                  | phpass                | 400            |
| mediawiki               | mediawiki             | 3711           |

Metasploit includes the `jtr_format_to_hashcat_format` function to translate JtR formats to Hashcat formats.

### Cracker Modes

Cracker modes are specific sets of rules optimized for different cracking scenarios:

- **Incremental**
- **Wordlist**
- **Pin (mobile devices - Hashcat specific)**
- **Normal (JtR specific)**
- **Single (JtR specific)**

#### Hashcat Optimized Kernel

Hashcat includes a `-O` flag for an optimized kernel, significantly increasing speed (>200%) at the cost of password length.

## Exporting Passwords and Hashes

Hashes can be exported in three formats using the `creds` command with the `-o` option. Exported hashes in `.jtr` or `.hcat` use John the Ripper or Hashcat formats, respectively. Other file suffixes result in CSV format.

### Example: Exporting NetNTLMv2 Secrets

```bash
creds --realm WORKGROUP --type netntlmv2 -o /path/to/netntlmv2_hashes.jtr
```

## Example Hashes

For testing Hashcat/JtR integration, use the following commands to add example hashes:

```bash
# nix
creds add user:des_password hash:rEK1ecacw.7.c jtr:des
creds add user:md5_password hash:$1$O3JMY.Tw$AdLnLjQ/5jXF9.MTp3gHv/ jtr:md5
creds add user:bsdi_password hash:_J9..K0AyUubDrfOgO4s jtr:bsdi
creds add user:sha256_password hash:$5$MnfsQ4iN$ZMTppKN16y/tIsUYs/obHlhdP.Os80yXhTurpBMUbA5 jtr:sha256,crypt
creds add user:sha512_password hash:$6$zWwwXKNj$gLAOoZCjcr8p/.VgV/FkGC3NX7BsXys3KHYePfuIGMNjY83dVxugPYlxVg/evpcVEJLT/rSwZcDMlVVf/bhf.1 jtr:sha512,crypt
creds add user:blowfish_password hash:$2a$05$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe jtr:bf
# windows
creds add user:lm_password ntlm:E52CAC67419A9A224A3B108F3FA6CB6D:8846F7EAEE8FB117AD06BDD830B7586C jtr:lm
creds add user:nt_password ntlm:AAD3B435B51404EEAAD3B435B51404EE:8846F7EAEE8FB117AD06BDD830B7586C jtr:nt
creds add user:u4-netntlm hash:u4-netntlm::kNS:338d08f8e26de93300000000000000000000000000000000:9526fb8c23a90751cdd619b6cea564742e1e4bf33006ba41:cb8086049ec4736c jtr:netntlm
creds add user:admin hash:admin::N46iSNekpT:08ca45b7d7ea58ee:88dcbe4446168966a153a0064958dac6:5c7830315c7830310000000000000b45c67103d07d7b95acd12ffa11230e0000000052920b85f78d013c31cdb3b92f5d765c783030 jtr

:netntlmv2
creds add user:mscash-test1 hash:M$test1#64cd29e36a8431a2b111378564a10631 jtr:mscash
creds add user:mscash2-hashcat hash:$DCC2$10240#tom#e4e938d12fe5974dc42a90120bd9c90f jtr:mscash2
# sql
creds add user:mssql05_toto hash:0x01004086CEB6BF932BC4151A1AF1F13CD17301D70816A8886908 jtr:mssql05
creds add user:mssql_foo hash:0x0100A607BA7C54A24D17B565C59F1743776A10250F581D482DA8B6D6261460D3F53B279CC6913CE747006A2E3254 jtr:mssql
creds add user:mssql12_Password1! hash:0x0200F733058A07892C5CACE899768F89965F6BD1DED7955FE89E1C9A10E27849B0B213B5CE92CC9347ECCB34C3EFADAF2FD99BFFECD8D9150DD6AACB5D409A9D2652A4E0AF16 jtr:mssql12
creds add user:mysql_probe hash:445ff82636a7ba59 jtr:mysql
creds add user:mysql-sha1_tere hash:*5AD8F88516BD021DD43F171E2C785C69F8E54ADB jtr:mysql-sha1
# oracle (10) uses usernames in the hashing, so we can't override that here
creds add user:simon hash:4F8BC1809CB2AF77 jtr:des,oracle
creds add user:SYSTEM hash:9EEDFA0AD26C6D52 jtr:des,oracle
# oracle 11/12 H value, username is used
creds add user:DEMO hash:'S:8F2D65FB5547B71C8DA3760F10960428CD307B1C6271691FC55C1F56554A;H:DC9894A01797D91D92ECA1DA66242209;T:23D1F8CAC9001F69630ED2DD8DF67DD3BE5C470B5EA97B622F757FE102D8BF14BEDC94A3CC046D10858D885DB656DC0CBF899A79CD8C76B788744844CADE54EEEB4FDEC478FB7C7CBFBBAC57BA3EF22C' jtr:raw-sha1,oracle
creds add user:oracle11_epsilon hash:'S:8F2D65FB5547B71C8DA3760F10960428CD307B1C6271691FC55C1F56554A;H:DC9894A01797D91D92ECA1DA66242209;T:23D1F8CAC9001F69630ED2DD8DF67DD3BE5C470B5EA97B622F757FE102D8BF14BEDC94A3CC046D10858D885DB656DC0CBF899A79CD8C76B788744844CADE54EEEB4FDEC478FB7C7CBFBBAC57BA3EF22C' jtr:raw-sha1,oracle
creds add user:oracle12c_epsilon hash:'H:DC9894A01797D91D92ECA1DA66242209;T:E3243B98974159CC24FD2C9A8B30BA62E0E83B6CA2FC7C55177C3A7F82602E3BDD17CEB9B9091CF9DAD672B8BE961A9EAC4D344BDBA878EDC5DCB5899F689EBD8DD1BE3F67BFF9813A464382381AB36B' jtr:pbkdf2,oracle12c
# postgres uses username, so we can't override that here
creds add user:example postgres:md5be86a79bf2043622d58d5453c47d4860
# mobile
creds add user:samsungsha1 hash:D1B19A90B87FC10C304E657F37162445DAE27D16:a006983800cc3dd1 jtr:android-samsung-sha1
creds add user:androidsha1 hash:9860A48CA459D054F3FEF0F8518CF6872923DAE2:81fcb23bcadd6c5 jtr:android-sha1
creds add user:androidmd5 hash:1C0A0FDB673FBA36BEAEB078322C7393:81fcb23bcadd6c5 jtr:android-md5
# OSX
creds add user:xsha_hashcat hash:1430823483d07626ef8be3fda2ff056d0dfd818dbfe47683 jtr:xsha
creds add user:pbkdf2_hashcat hash:$ml$35460$93a94bd24b5de64d79a5e49fa372827e739f4d7b6975c752c9a0ff1e5cf72e05$752351df64dd2ce9dc9c64a72ad91de6581a15c19176266b44d98919dfa81f0f96cbcb20a1ffb400718c20382030f637892f776627d34e021bad4f81b7de8222 jtr:PBKDF2-HMAC-SHA512
creds add user:xsha512_hashcat hash:648742485c9b0acd786a233b2330197223118111b481abfa0ab8b3e8ede5f014fc7c523991c007db6882680b09962d16fd9c45568260531bdb34804a5e31c22b4cfeb32d jtr:xsha512
# webapps
creds add user:mediawiki_hashcat hash:$B$56668501$0ce106caa70af57fd525aeaf80ef2898 jtr:mediawiki
creds add user:phpass_p_hashcat hash:$P$984478476IagS59wHZvyQMArzfx58u. jtr:phpass
creds add user:phpass_h_hashcat hash:$H$984478476IagS59wHZvyQMArzfx58u. jtr:phpass
creds add user:atlassian_hashcat hash:{PKCS5S2}NzIyNzM0NzY3NTIwNjI3MdDDis7wPxSbSzfFqDGf7u/L00kSEnupbz36XCL0m7wa jtr:PBKDF2-HMAC-SHA1
# other
creds add user:hmac_password hash:'<3263520797@127.0.0.1>#3f089332842764e71f8400ede97a84c9' jtr:hmac-md5
creds add user:vmware_ldap hash:'$dynamic_82$a702505b8a67b45065a6a7ff81ec6685f08d06568e478e1a7695484a934b19a28b94f58595d4de68b27771362bc2b52444a0ed03e980e11ad5e5ffa6daa9e7e1$HEX$171ada255464a439569352c60258e7c6' jtr:dynamic_82
creds add user:admin hash:'$pbkdf2-sha256$260000$Q1hzYjU5dFNMWm05QUJCTg$s.vmjGlIV0ZKV1Sp3dTdrcn/i9CTqxPZ0klve4HreeU' jtr:pbkdf2-sha256
```

## Adding a New Hash

To add a new hash type to Metasploit, follow these steps:

1. **Identify the Algorithm**:
   - Add a new identify algorithm to `framework/hashes.rb`. Use external programs like `hashid` or `hash-identifier` for suggestions.

2. **Add to Spec**:
   - Add the hash to the spec file `framework/hashes/identify_spec.rb` to ensure it works correctly.

3. **Save in JTR Format**:
   - Ensure the hashes are saved in the database in the JTR format. Refer to `pentestmonkey` for hash examples.

4. **Update Cracker Module**:
   - Update the appropriate cracker module or create a new one for the new hash type.

5. **Find Hashcat Mode**:
   - Find the Hashcat hash mode and add a JTR name to Hashcat mode lookup.

6. **Format Conversion**:
   - If Hashcat uses a different format for the hash string, add a

 JTR to Hashcat hash format conversion to the formatter.

7. **Update Documentation**:
   - Update the relevant documentation and wiki with the new hash information and examples.

## Conclusion

Metasploit provides extensive support for handling and cracking password hashes. By leveraging libraries like John the Ripper and Hashcat, you can effectively identify, export, and crack various hash types. Understanding and utilizing these tools within Metasploit enhances your penetration testing capabilities, allowing for more comprehensive security assessments.