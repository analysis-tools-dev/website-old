---
title: "Picking the Right Static Analysis Tool For Your Use-Case"
date: "2021-01-26T22:12:03.284Z"
---

This project started as a way to scratch my own itch:
"How do I find the best static analysis tool for my use-case?"

Years later, many people still seem to have the same problem.
There are more than 500 static analysis (SAST) tools out there; how can you
possibly find the "best" one?

Here are some guidelines that can support you on your search.

## Supported Programming Language

The first question you have to ask yourself is "which programming languages do I
need to support?"

If you just want to support a single language like [TypeScript](/tag/typescript)
or [Go](/tag/go), this will narrow down the search by a lot.
Often times there are specialized tools for each language.
From our experience, they provide better insights than a tool that supports many
languages,
so look through our [categories](/tools) to find the language you need to
support.

If you have to support multiple languages, you can start with a "metalinter"
that supports these.

One advantage of using a metalinter is that it provides a consistent overview
of all the error output for the different languages.
Also, you can integrate metalinters pretty quickly, as you only have to install one
tool instead of many to get started.

If you find that a particular language is not well supported by a given
metalinter, that's fine: just switch off the support for that language in the
linter via the config and pick a dedicated linter for that language to fill the gap.

## Licenses

We made sure to include the license for every tool on the page.
This is vital because your company might not allow certain open source licenses
like the GPL in your stack or you explicitly _want_ an open tool that you can
extend and fix yourself. Proprietary tools usually come with a (sometimes hefty)
price tag, so you can filter those out if you want.
On the other hand, commercial support can be quite important in a professional
setup, which is where proprietary tools often shine.
It really depends on your use-case.
The [comparison page](/compare) mentions the license because of that.

## Integration

Can you integrate the tool into your environment?
We generally distinguish between three different types of integrations:

- **Command-line tools**: These can be called straight from the terminal and
  print reports in plain text or machine-readable output.
- **Web services**: These tools provide a website for checking reports and
  typically integrate with your continuous integration system like [Github
  Actions](https://github.com/features/actions), [TravisCI](https://travis-ci.org/), or [CircleCI](https://circleci.com/).
- **IDE plugins**: These integrate into your development environment (VSCode, IntelliJ,...), providing
  valuable inline suggestions during the early phase of implementation.

You can find out how each tool integrates by looking at the little icons next
to the name or on the overview page of tool under "Workflow integration".

## Standards

Are there any industry standards that your project needs to comply to?
There are quite a few [industry standards](https://www.verifysoft.com/en_grammatech_compliance_with_standards.html)
out there.
Which ones are relevant to your organization depends on your industry and your partners.
As soon as you know which ones you need, you can search for those in the search
window at the top. E.g. [LDRA](https://analysis-tools.dev/tool/ldra) complies to
various standards like MISRA C & C++, JSF++ AV, CWE, CERT C, CERT C++.

## Performance

Especially if you plan to run the tools regularly, say during [CI
runs](https://en.wikipedia.org/wiki/Continuous_integration),
you want to make sure that the linters don't slow down the build too much.

The runtime of a linter usually grows with your project size, but it helps to look at a
tool's issue tracker for any performance issues/bottlenecks. We made sure to include the
link to the source code for every tool (where available), which is where you can also
find the list of issues.

For proprietary tools, there is no quick way to know the performance.
If you're wavering between two options, performance can be a decision
criterion, so make sure to check the websites of the vendors for benchmarks and
speed expectations.

## Usability

If you can't decipher what the tool is trying to tell you, it's the developer's
fault and not the user's.
So the question which tool provides the better UI should have a big impact on
your decision.
Remember that no so tech-savvy people might have to work with those reports at the
end as well &mdash; even if it's just for deciding which bug to prioritize.

How to decide which UI is "better" is very subjective, but you can generally gauge what to expect from the
tool documentation, from screenshots and videos.
For many popular tools we provide links to videos, talks, or whitepapers, which
should make that assessment a little easier for you.
See for example [DeepCode](/tool/deepcode) and [CodeScene](/tool/codescene).

## Community Acceptance

This website is a community platform. Everyone can vote for their favorite tools
and write helpful comments.
Tools get ranked by their votes, which makes picking tools easier for newcomers
to a language.
On top of that, we also display the number Github stars for every project as
another indicator of community support.

Roughly speaking, the more popular a tool is on Github and on
analysis-tools.dev, the higher the number of contributors and features/bugfixes
in a given period of time.

## Maintenance

Sometimes the Github star rating can be misleading: Many tools were popular at
some point in time but are now deprecated and unmaintained. This is a big
maintenance or even security risk for your project, so we make sure to flag
every tool that has not been updated in the last 6 months. We also mention
alternatives for every tool to help you stay on track.

## Summary

This is not an exhaustive list, but it's a start. If we forgot anything
important, please let us know or &mdash; even better &mdash; send us a pull request because
this website is completely [open source and hosted on Github](https://github.com/analysis-tools-dev/website/).
