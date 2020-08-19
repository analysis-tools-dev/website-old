---
title: Static Analysis Is Broken - Let’s Fix It
date: "2020-08-19T20:00:00.000Z"
---

Static analysis is great! It helps improve code quality by inspecting source
code without even running it. There are hundreds of great tools to choose from —
many are free or open-source. Unfortunately, many projects still don’t make use
of static analysis tools for various reasons.

Our mission is to fix that by building an open platform for comparing static
analysis tools. All code is open-source and backed by the community. We’re proud
to count 192 individual contributors on Github so far. With this website, we aim
to make static analysis accessible to even more people.

## What Is Static Analysis?

Wouldn’t it be great to find bugs and fix issues automatically? What if you
could fix most problems during development instead of production? There are
great tools for that!

Those static analysis tools can be grouped into different categories:

- formatters: these apply a predefined code-style automatically and make your
  code consistent and pretty. 💅
- linters: detect bugs and code smells 🔍
- metalinters: combine many linters into one tool 🔗

Even within each category, there are more ways to group the tools. For example,
you could split them into Rule-based or AST-based (and perhaps
machine-learning-based-) tools.

There are also different ways to incorporate those tools into your workflow:

- Online services that get added to continuous integration pipelines
- Command-line tools
- IDE-plugins

It is a huge space for different services and approaches that is surprisingly
tricky to organize, which leads to some problems.

## Cargo Cult?

Wisdom about code analysis tools is spread all over the place: websites, blog
posts, forums, videos,… there is no quick and easy way to compare tools and
learn about them.

This lack of information leads to a strange dogma around static analysis: it is
seen as an overly academic topic by some and gets worshiped as the holy grail by
others.

There almost seems to be a weird cargo-cult around some tools, even though they
have long been deprecated and superseded by more powerful successors. For
example, JSLint is heavily debated by the community. You might be better off
using eslint for new projects these days.

We provide an easy way to answer the following questions:

- Is this the best tool for my use-case?
- Is it still maintained?
- Is the license acceptable?
- Where can I find more information?

With that, we hope to demystify static analysis a bit.

## Most Public Lists Are Outdated

If you search for “static analysis” on Google, chances are, you end up on this
list on Wikipedia. It provides a list of static analysis tools, and it’s
arguably the first contact point with static analysis for many people. It’s an
honest first attempt, but quite frankly, its quality is poor for many reasons:

- The number of tools on the list is small: About 130 are listed, but many
  hundred more exist.
- It’s outdated: Many modern/powerful tools are missing.
- Inconsistent formatting: A mixture of tables and unordered lists make
  comparison unnecessarily hard.
- No way to filter tools by license or programming language
- Contains outdated external links (yep, we checked)
- The license is missing for many tools
- …

Instead, we put a lot of effort into consistent structure and work on better
filtering functionality. We have tooling in place to make sure that all
information is up-to-date.

## All Static Analysis Tools Are Lumped Together

Remember the categories from above? To most websites, it’s all linters. That
doesn’t help if you’re looking for a formatter or a machine-learning-based SAAS
service for your CI pipeline. It’s very time-consuming and tedious to wade
through a sea of websites, so people rarely do. It’s like ten thousand spoons
when all you need is a knife. (It’s ironic if you didn’t get that reference.)

## No Fair Comparison Between The Tools

Companies just try to sell. The loudest voice on the market wins - not the best
tool. More niche projects that would be a better fit are hard to find.

It’s difficult to find out what the “community-endorsed” set of standard tools
is. Therefore we support votings and discussions and work together with the
developer communities to make discovery easier.

## An Open Platform

The aim of analaysis-tools.dev is to be a sharp tool that you use by choice.
That’s why we build this project entirely in the open to avoid bias and
gatekeepers, which promote tools purely based on monetary interest and not on
quality. Our mission is to establish analysis-tools.dev as a platform for
comparing analysis tools, and we are committed to keep the site up-to-date and
add features like video workshops in the future.

Let us take the time to thank our sponsor, DeepCode. It is a real-time semantic
code analysis service that is deeply rooted within the open-source community.
They provide their service free of charge for open source — forever. You should
go check out their site. It is great to see companies like DeepCode embrace open
source and work with the community to establish higher standards for code
quality.

Help make this possible analysis-tools.dev offers a lot for free, but of course,
it is not free to operate or develop. If it provides value for you or your
company and you wish to support its development, consider donating on Github
Sponsors. Thanks!
