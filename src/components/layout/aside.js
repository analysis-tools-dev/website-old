import React from "react"
import "twin.macro"
import { Link } from "gatsby"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"

const Aside = () => {
  return (
    <aside tw="w-full md:w-1/3 flex flex-col items-center px-3">
      <div tw="w-full bg-white shadow flex flex-col p-6">
        <p tw="text-xl font-semibold pb-5">Write Better Software</p>
        <p tw="text-justify text-gray-600">
          On this page you can find static code analysis tools and linters that
          can help you improve code quality. All tools are peer-reviewed by
          fellow developers to meet high standards.
        </p>
        <img
          width="269px"
          height="204px"
          src="/hero/hero.svg"
          alt="People analysing charts"
        />
        <Link
          to="/blog/static-analysis-is-broken-lets-fix-it"
          tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 duration-300 transition-all flex items-center justify-center px-2 py-3 mt-4"
        >
          Our mission
        </Link>
      </div>
      <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
        <p tw="text-xl font-semibold pb-5">Our Sponsors</p>
        <p tw="pb-10 text-justify text-gray-600">
          This website is completely{" "}
          <a
            tw="underline"
            href="https://github.com/analysis-tools-dev/website/"
          >
            open source
          </a>
          . To fund our work, we fully rely on sponsors. Thanks to them, we can
          keep the site free for everybody. Please check out their offers below.
        </p>
        <p tw="pb-6">
          <a href="https://www.deepcode.ai?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
            <img
              width="269px"
              height="50px"
              alt="DeepCode logo"
              src="/sponsors/deepcode.png"
            />
          </a>
        </p>
        <p tw="pb-6">
          <a href="https://codescene.io?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
            <img
              width="269px"
              height="50px"
              alt="CodeScene logo"
              src="/sponsors/codescene.svg"
            />
          </a>
        </p>
        <p tw="pb-6">
          <a href="https://r2c.dev?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
            <img
              style={{ maxHeight: "65px", margin: "0 auto" }}
              alt="r2c logo"
              src="/sponsors/r2c.svg"
            />
          </a>
        </p>
      </div>
      <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
        <p tw="text-xl font-semibold pb-5">You Can Contribute!</p>
        <p tw="text-gray-600">
          You can help to improve this list by voting{" "}
          <FaCaretUp tw="inline-block text-gray-600" />/
          <FaCaretDown tw="inline-block text-gray-600" /> for your favorite
          tools or adding new ones{" "}
          <a
            tw="underline"
            href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
          >
            on Github&nbsp;
            <img
              src="/logos/github.svg"
              alt="GitHub mark logo"
              tw="w-4 h-4 inline-block"
            />
          </a>
        </p>
      </div>

      <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
        <p tw="text-xl font-semibold pb-5">Popular Tools By Language</p>
        <div tw="grid grid-cols-3 gap-3">
          <a href="/tag/python">
            <img
              width="64"
              height="64"
              tw="hover:opacity-75"
              alt="Python"
              src="/logos/python.svg"
            />
          </a>
          <a href="/tag/ruby">
            <img tw="hover:opacity-75" alt="Ruby" src="/logos/ruby.svg" />
          </a>
          <a href="/tag/php">
            <img tw="hover:opacity-75" alt="PHP" src="/logos/php.svg" />
          </a>
          <a href="/tag/c">
            <img tw="hover:opacity-75" alt="C" src="/logos/c.svg" />
          </a>
          <a href="/tag/javascript">
            <img
              tw="hover:opacity-75"
              alt="JavaScript"
              src="/logos/javascript.svg"
            />
          </a>
          <a href="/tag/go">
            <img tw="hover:opacity-75" alt="Go" src="/logos/go.svg" />
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Aside
