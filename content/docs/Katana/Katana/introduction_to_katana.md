---
title: "Katana: The CLI web crawler"
description: "Learn what Katana is and how to use it"
icon: "code"
draft: false
---

### Introduction

Katana is a command-line interface (CLI) web crawling tool developed in Golang, designed to gather information and endpoints from websites. One of Katana's standout features is its capability to utilize headless browsing for crawling applications.

This enables it to effectively crawl single-page applications (SPAs) built with technologies like JavaScript, Angular, or React, which are increasingly common but challenging to crawl with traditional tools. By employing headless browsing, Katana can more efficiently access and gather information from these applications.

Katana is crafted to be CLI-friendly, fast, and efficient, with a straightforward output format, making it an appealing choice for integration into automation pipelines. Additionally, regular updates and maintenance ensure that Katana remains a valuable and indispensable tool in your hacker toolkit for years to come.

#### Understanding Web Crawling

A web crawler, also known as a spider or bot, systematically browses the Web, typically for the purpose of indexing. A web crawler operates by automating the process of exploring a website, much like a user clicking every link and button. It discovers paths, scripts, and other resources, creating a comprehensive map of the web application's structure and content.

In cybersecurity, web application indexing through crawling is a critical step in understanding and securing a system. By thoroughly mapping an application, security teams can:

- Identify potentially vulnerable endpoints
- Discover hidden or undocumented features
- Detect inconsistencies in access controls
- Uncover information leakage
- Assess the overall attack surface of the application

As web applications become increasingly complex, using crawling tools like Katana becomes essential for maintaining a comprehensive and up-to-date understanding of a web application's structure and potential security implications.

### Installing Katana

Make sure you have golang installed on your system and run the following command:

```sh
go install github.com/projectdiscovery/katana/cmd/katana@latest
```

You can verify your installation by running:

```sh
katana
```

<blockquote class="imgur-embed-pub" lang="en" data-id="cROzYEI"><a href="https://imgur.com/cROzYEI">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

### Running Katana

katana requires url or endpoint to crawl and accepts single or multiple inputs.

Input URL can be provided using `-u` option, and multiple values can be provided using comma-separated input, similarly file input is supported using `-list` option and additionally piped input (stdin) is also supported.

Let's try it using url input:

```sh
katana -u https://example.com
```

or use STDIN (piped) Input like:

```sh
echo example.com | katana
```

If there are multiple urls you want to crawl, you can create a list by running:

```sh
echo "example.com" >> lists.txt
echo "google.com" >> lists.txt
```

Now, if you do:

```sh
cat lists.txt
```

you should get:

```plaintext
example.com
google.com
```

Now run

```sh
katana -list lists.txt
```

### Crawling Modes

Katana offers two primary crawling modes to suit different web application structures and crawling needs. The Standard Mode is optimized for speed and simplicity, ideal for traditional web applications.

The Headless Mode provides a more comprehensive crawl, mimicking a real browser environment, which is particularly useful for modern, JavaScript-heavy web applications. This dual-mode approach allows users to balance between speed and thoroughness based on their specific requirements.

#### Standard Mode

- Uses the standard Go HTTP library for handling requests/responses
- Faster due to lack of browser overhead
- Analyzes HTTP response bodies without JavaScript or DOM rendering
- May miss endpoints in complex web applications that rely on browser-specific events

#### Headless Mode

- Uses headless browser calls to handle HTTP requests/responses
- Advantages:
  1. HTTP fingerprint (TLS and user agent) identifies as a legitimate browser
  2. Better coverage by analyzing both raw and browser-rendered responses
- Enable with `-headless` option
- Additional headless options:
  - `-sc` or `-system-chrome`: Use locally installed Chrome
  - `-sb` or `-show-browser`: Display the browser on screen
  - `-ho` or `-headless-options`: Add custom Chrome options
  - `-nos` or `-no-sandbox`: Run Chrome without sandbox (useful for root users)
  - `-cdd` or `-chrome-data-dir`: Specify Chrome data directory
  - `-scp` or `-system-chrome-path`: Use a specific Chrome installation
  - `-noi` or `-no-incognito`: Disable incognito mode

### Scope Control

Scope control in Katana provides users with fine-grained control over the crawling process. It allows for precise definition of what should and should not be crawled, preventing the crawler from venturing into unintended territories.

This feature is crucial for maintaining focus on the target application, respecting boundaries, and optimizing resource usage. The various scope control options cater to different levels of specificity, from broad domain-level scoping to precise regex-based inclusions and exclusions.

- `-field-scope` or `-fs`: Define scope using predefined fields
  - `rdn`: Root domain and subdomains (default)
  - `fqdn`: Specific subdomain
  - `dn`: Domain name keyword
- `-crawl-scope` or `-cs`: Advanced scope control with regex support
- `-crawl-out-scope` or `-cos`: Define URLs to exclude from crawling
- `-no-scope` or `-ns`: Disable default scoping
- `-display-out-scope` or `-do`: Show external URLs found in scoped crawling

### Crawler Configuration

The crawler configuration options in Katana offer extensive customization of the crawling process. These settings allow users to fine-tune the crawler's behavior, including how deep it should go, whether it should parse JavaScript files, how long it should run, and whether it should attempt to fill forms automatically.

This level of configuration ensures that Katana can be adapted to a wide range of scenarios, from quick surface-level scans to deep, thorough crawls of complex web applications.

- `-depth` or `-d`: Set crawl depth (default: 3)
- `-js-crawl` or `-jc`: Enable JavaScript file parsing and endpoint discovery
- `-crawl-duration` or `-ct`: Set maximum crawl duration
- `-known-files` or `-kf`: Crawl robots.txt and sitemap.xml
- `-automatic-form-fill` or `-aff`: Enable automatic form filling (experimental)
- Additional options for proxies, headers, and strategies available

### Filters

Katana's filtering capabilities provide powerful tools for processing and refining the crawler's output. Users can selectively display or store specific types of information, match or exclude URLs based on extensions or regex patterns, and even define custom fields for extraction.

These filtering options are essential for managing the often vast amount of data generated during a crawl, allowing users to focus on the most relevant information for their specific use case.

- `-field` or `-f`: Filter output by specific fields (e.g., url, path, fqdn, rdn)
- Custom fields can be defined using a YAML config file
- `-store-field` or `-sf`: Save filtered information to disk
- `-extension-match` or `-em`: Display only URLs with specific extensions
- `-extension-filter` or `-ef`: Exclude URLs with specific extensions
- `-match-regex` or `-mr`: Filter URLs using regex
- `-filter-regex` or `-fr`: Exclude URLs using regex

### Rate Limiting

Rate limiting features in Katana are designed to prevent the crawler from overwhelming target servers or triggering anti-bot measures. By controlling the speed and volume of requests, users can ensure their crawling activities remain unobtrusive and respectful of server resources.

This is particularly important for maintaining good relationships with target sites and avoiding IP blocks or other defensive measures that could impede the crawling process.

- `-delay`: Add delay between requests
- `-concurrency` or `-c`: Control simultaneous URL fetches per target
- `-parallelism` or `-p`: Set number of targets to process simultaneously
- `-rate-limit` or `-rl`: Max requests per second
- `-rate-limit-minute` or `-rlm`: Max requests per minute

### Output Options

Katana's output options provide flexibility in how crawl results are presented and stored. From simple text output to structured JSON, and from storing complete HTTP responses to saving specific fields, these options cater to various post-crawl analysis needs.

The ability to store detailed response data is particularly valuable for in-depth analysis or for maintaining an audit trail of the crawling process.

- `-output` or `-o`: Write results to a file
- `-json` or `-j`: Output in JSON format
- `-store-response` or `-sr`: Save all crawled requests and responses
- `-store-response-dir` or `-srd`: Specify custom directory for stored responses
- Additional options for coloring, verbosity, and silent mode available

### Example usecases

**Deep Crawl of a Single-Page Application:**

```sh
katana -u https://example.com -headless -depth 5 -js-crawl -automatic-form-fill -store-response -j -o results.json
```

This command performs a deep crawl of a single-page application, using headless mode to render JavaScript, crawling to a depth of 5, parsing JavaScript files, automatically filling forms, storing all responses, and outputting results in JSON format.

After running this command, you should get the results, and you can check contents of `results.json` with:

```sh
cat results.json
```

<blockquote class="imgur-embed-pub" lang="en" data-id="WiAgecu"><a href="https://imgur.com/WiAgecu">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

**Stealthy Crawl with Rate Limiting and Regex Filtering:**

```sh
katana -u https://example.com -delay 5 -rate-limit 10 -concurrency 2 -match-regex "admin|config|setup" -filter-regex "logout|error" -no-color -silent -o stealthy_crawl.txt
```

This use case demonstrates a careful crawl of a sensitive site, introducing a 5-second delay between requests, limiting to 10 requests per second with 2 concurrent fetchers, matching URLs containing "admin", "config", or "setup", filtering out URLs with "logout" or "error", and operating silently without color output.

**Scoped Crawl of Multiple Subdomains with Custom Field Extraction:**

```sh
katana -list lists.txt -field-scope fqdn -crawl-duration 30 -field url,path,fqdn -store-field email,phone -extension-match php,html,js -o results.txt
```

This example crawls multiple subdomains from a list, scoping each crawl to the specific subdomain, limiting the crawl duration to 30 minutes, displaying URL, path, and FQDN fields, storing extracted email and phone numbers, and only matching PHP, HTML, and JS files.

**Comprehensive Crawl with Custom Scope and Headless Browser:**

```sh
katana -u https://example.com -headless -system-chrome -crawl-scope "login/,admin/,api/" -crawl-out-scope "logout,/public" -known-files robotstxt,sitemapxml -js-crawl -automatic-form-fill -store-response -j -o comprehensive_crawl.json
```

This example uses a local Chrome installation for headless crawling, defines custom in-scope and out-of-scope areas, includes known files like robots.txt and sitemap.xml, enables JavaScript crawling and form filling, and stores all responses in JSON format.

**Large-Scale Crawl with Parallelism and Custom Output:**

```sh
katana -list large_site_list.txt -parallelism 20 -depth 3 -field url,path -extension-filter css,png,jpg -store-field key,value -no-scope -display-out-scope -j -o large_scale_crawl.json
```

This use case demonstrates crawling multiple large sites in parallel, limiting depth to 3, displaying only URLs and paths, filtering out common static file extensions, storing parameter keys and values, disabling default scoping to crawl external links, and outputting results in JSON format.

### Conclusion

Katana is a powerful and versatile CLI web crawling tool designed for modern web applications. It offers a range of features that make it suitable for various scenarios, from simple website mapping to complex, in-depth crawls of single-page applications.

Key strengths of Katana include:

1. Dual crawling modes (standard and headless) to handle both traditional and JavaScript-heavy websites.
2. Extensive scope control options for precise targeting of crawl areas.
3. Flexible configuration settings to fine-tune crawl behavior.
4. Powerful filtering capabilities for processing and refining output.
5. Rate limiting features to ensure responsible and stealthy crawling.
6. Versatile output options for easy integration with other tools and workflows.

These features allow users to perform tasks such as deep crawls of single-page applications, scoped crawls of multiple subdomains, stealthy information gathering, comprehensive security assessments, and large-scale parallel crawls.

Katana's ability to handle modern web technologies, combined with its customization options and performance features, makes it a valuable tool for web developers, security researchers, and IT professionals. Whether you're mapping a website's structure, looking for potential security vulnerabilities, or gathering data for analysis, Katana provides the flexibility and power to accomplish these tasks efficiently.
