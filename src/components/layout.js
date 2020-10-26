import React from "react"
import { Link } from "gatsby"
import tw, { styled } from "twin.macro"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import Search from "./search"

const searchIndices = [
  { name: `tags`, title: `Tags`, hitComp: `ToolsHit` },
  { name: `tools`, title: `Tools`, hitComp: `ToolsHit` },
]

const NavLink = styled(props => <Link {...props} />)`
  ${tw`transition-all duration-300 hover:bg-gray-400 rounded my-1 mx-1 p-2 sm:px-6`}
`

export default ({ children }) => {
  return (
    <div>
      <header tw="w-full flex-row container mx-auto">
        <div tw="md:flex items-center">
          <Link to="/" tw="w-2/6 h-1 md:h-auto">
            <img
              src="/logo.svg"
              tw="w-4/6 mx-auto md:w-full"
              alt="Analysis tools logo"
            />
          </Link>

          <div tw="mx-5 mb-5 md:mb-0 md:w-4/6 relative">
            <Search tw="w-full relative" collapse indices={searchIndices} />
          </div>
        </div>
      </header>

      <nav tw="w-full py-4 border-t border-b bg-gray-100">
        <div tw="w-full">
          <div tw="w-full container mx-auto flex flex-row items-center justify-center text-sm font-bold uppercase mt-0">
            <NavLink to="/tools">Tools</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/sponsor">Sponsor</NavLink>
            <a
              href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
              tw="transition-all duration-300 hover:bg-gray-400 rounded my-1 mx-1 p-2"
            >
              Contribute
            </a>
          </div>
        </div>
      </nav>

      <div tw="container mx-auto flex flex-wrap py-6">
        <section tw="w-full md:w-2/3 flex flex-col px-3">{children}</section>

        <aside tw="w-full md:w-1/3 flex flex-col items-center px-3">
          <div tw="w-full bg-white shadow flex flex-col p-6">
            <p tw="text-xl font-semibold pb-5">Write Better Software</p>
            <p tw="text-justify">
              On this page you can find static code analysis tools and linters
              that can help you improve code quality. All tools are
              peer-reviewed by fellow developers to meet high standards.
            </p>
            <img src="/hero/hero.svg" alt="People analysing charts" />
            <Link
              to="/blog/static-analysis-is-broken-lets-fix-it"
              tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 duration-300 transition-all flex items-center justify-center px-2 py-3 mt-4"
            >
              Our mission
            </Link>
          </div>
          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">Our Sponsors</p>
            <p tw="pb-10 text-justify">
              This website is completely{" "}
              <a
                tw="underline"
                href="https://github.com/analysis-tools-dev/website/"
              >
                open source
              </a>
              . To fund our work, we fully rely on sponsors. Thanks to them, we
              can keep the site free for everybody. Please check out their
              offers below.
            </p>
            <p tw="pb-6">
              <a href="https://www.deepcode.ai?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
                <img alt="DeepCode logo" src="/sponsors/deepcode.svg" />
              </a>
            </p>
            <p tw="pb-6">
              <a href="https://deepsource.io?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
                <img alt="Deepsource logo" src="/sponsors/deepsource.png" />
              </a>
            </p>
            <p tw="pb-6">
              <a href="https://www.viva64.com/free-license">
                <img alt="PVS Studio logo" src="/sponsors/pvs-studio.svg" />
              </a>
            </p>
            <p tw="pb-6">
              <a href="https://codescene.io?utm_source=github_analysis_tools.dev&utm_medium=sponsorship&utm_content=banner_logo">
                <img alt="CodeScene logo" src="/sponsors/codescene.svg" />
              </a>
            </p>
          </div>
          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">You Can Contribute!</p>
            <p>
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
      </div>

      <footer tw="w-full border-t bg-white pb-12">
        <div tw="w-full container mx-auto flex flex-col items-center">
          <ul tw="text-center text-gray-600">
            <li>
              Beautiful icons provided by{" "}
              <a tw="underline" href="https://icons8.com/icon/pack/files/dusk">
                icons8
              </a>{" "}
              and{" "}
              <a tw="underline" href="https://www.flaticon.com/authors/freepik">
                freepik
              </a>
            </li>
            <li>
              <a
                tw="underline"
                href="https://www.freepik.com/free-photos-vectors/background"
              >
                Hero vector illustration created by pch.vector - www.freepik.com
              </a>
            </li>
            <li>
              <a tw="underline" href="https://thenounproject.com">
                Cloud by Aya Sofya, plugin by bezier master, console by Richard
                Schumann from the Noun Project
              </a>
            </li>
          </ul>
          <div tw="pb-6 text-gray-600">
            &copy;{" "}
            <a tw="underline" href="https://analysis-tools.dev/">
              analysis-tools.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
