---
title: "Using Katana as a Library"
description: "Learn what Katana is and how to use it"
icon: "code"
draft: false
---

In this tutorial, you'll learn how to use Katana as a library in your Go application to crawl web pages programmatically. We'll set up a simple Go program that configures Katana, creates a crawler, and performs a web crawl.

#### Prerequisites

1. **Go Installed**: Ensure that you have Go installed on your system.
2. **Katana Library**: Make sure you have the Katana library available. You can get it via Go modules.

#### Step-by-Step Guide

1. **Set Up Your Project**

   Create a new directory for your project and navigate into it:

```sh
mkdir katana-library-example
cd katana-library-example
```

Initialize a new Go module:

```sh
go mod init katana-library-example
```

2. **Create Your Go Program**

Create a file named `main.go` and open it in your text editor. Add the following code to `main.go`:

```go
package main

import (
    "github.com/projectdiscovery/gologger"
    "github.com/projectdiscovery/katana/pkg/engine/standard"
    "github.com/projectdiscovery/katana/pkg/output"
    "github.com/projectdiscovery/katana/pkg/types"
)

func main() {
    // Configure Katana options
    options := &types.Options{
        MaxDepth:     1,               // Maximum depth to crawl
        FieldScope:   "rdn",           // Crawling Scope Field
        BodyReadSize: 2 * 1024 * 1024, // Maximum response size to read
        RateLimit:    150,             // Maximum requests to send per second
        Strategy:     "depth-first",   // Visit strategy (depth-first, breadth-first)
        OnResult: func(result output.Result) { // Callback function to execute for result
            gologger.Info().Msg(result.Request.URL)
        },
    }

    // Create crawler options
    crawlerOptions, err := types.NewCrawlerOptions(options)
    if err != nil {
        gologger.Fatal().Msg(err.Error())
    }
    defer crawlerOptions.Close()

    // Initialize the crawler
    crawler, err := standard.New(crawlerOptions)
    if err != nil {
        gologger.Fatal().Msg(err.Error())
    }
    defer crawler.Close()

    // Define the URL to crawl
    var input = "https://google.com"

    // Start crawling
    err = crawler.Crawl(input)
    if err != nil {
        gologger.Warning().Msgf("Could not crawl %s: %s", input, err.Error())
    }
}
```

3. **Install Dependencies**

Run the following command to install the necessary dependencies:

```sh
go mod tidy
```

4. **Run Your Program**

Execute your Go program with:

```sh
go run main.go
```

You should see an out put like this:

<blockquote class="imgur-embed-pub" lang="en" data-id="Px5LR8d"><a href="https://imgur.com/Px5LR8d">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

This will start the crawling process on the specified URL (`https://google.com`). The `OnResult` callback will print the URLs found during the crawl.

#### Explanation

- **Options Configuration**: We set various crawling options like `MaxDepth`, `FieldScope`, `BodyReadSize`, `RateLimit`, and `Strategy`. These control how the crawler operates.
- **Callback Function**: The `OnResult` callback is used to handle the results of the crawl. In this example, it simply logs the URL of each result.
- **Creating and Using the Crawler**: We create the crawler using `standard.New()` with the configured options and start crawling the input URL.

This basic setup allows you to use Katana as a library in your Go applications to perform web crawling. You can customize the options and callback function based on your specific needs.

#### Conclusion

In this tutorial, we demonstrated how to use Katana as a library in a Go application for web crawling. By configuring crawling options and setting up a basic callback function, we created a simple yet functional crawler that explores web pages programmatically. This approach allows for greater flexibility and integration with other Go-based tools and workflows. With Katana's powerful features and this foundational setup, you can now tailor web crawling tasks to meet your specific needs and incorporate them into larger projects.
