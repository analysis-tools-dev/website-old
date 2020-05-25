import React from "react"
import { Link } from "gatsby"
import "twin.macro"
import { FaGithub } from "react-icons/fa"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"
// import SearchHit from "./search-hit"
import Search from "./Search"

const searchIndices = [{ name: `Tools`, title: `Tools`, hitComp: `ToolsHit` }]

export default ({ children }) => {
  return (
    <div>
      <nav tw="w-full py-4 bg-color3 shadow">
        <div tw="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul tw="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <FaGithub tw="float-left mt-1" />
                <a
                  tw="hover:text-gray-200 hover:underline px-2"
                  href="https://github.com/analysis-tools-dev/static-analysis"
                >
                  Github
                </a>
              </li>
              <li tw="float-right">
                <Link tw="hover:text-gray-200 hover:underline px-2" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      <header tw="w-full flex-row container mx-auto">
        <div tw="flex items-center">
          <Link
            tw="w-2/6 font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            to="/"
          >
            <img src="/logo_black.svg" alt="Analysis tools logo" />
          </Link>

          <div tw="flex w-4/6">
            {/* <InstantSearch searchClient={searchClient} indexName="Tools">
              <SearchBox tw="relative shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-r-none" />
              <div tw="grid h-16 overflow-scroll z-20 top-0 shadow p-4 bg-white w-full">
                <Hits hitComponent={SearchHit} />
              </div>
            </InstantSearch> */}

            <Search tw="w-full" collapse indices={searchIndices} />
          </div>
        </div>
      </header>

      {/* // -webkit-overflow-scrolling: touch;
  // position: absolute;
  // right: 0;
  // top: calc(100% + 0.5em);
  // width: 80vw;
  // max-width: 30em;
  // box-shadow: 0 0 5px 0;
  // padding: 0.7em 1em 0.4em;
  // background: white;" */}
      <nav
        tw="w-full py-4 border-t border-b bg-gray-100"
        x-data="{ open: false }"
      >
        <div tw="block sm:hidden">
          <Link
            to="/"
            tw="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          >
            Topics <i tw="ml-2"></i>
          </Link>
        </div>
        <div tw="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div tw="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <Link to="/" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Home
            </Link>
            <Link to="/tools" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Tools
            </Link>
            <Link to="/blog" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Blog
            </Link>
            <Link to="/videos" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Videos
            </Link>
            <a
              href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
              tw="hover:bg-gray-400 rounded py-2 px-4 mx-2"
            >
              Add tool
            </a>
          </div>
        </div>
      </nav>

      <div tw="container mx-auto flex flex-wrap py-6">
        <section tw="w-full md:w-2/3 flex flex-col px-3">{children}</section>

        <aside tw="w-full md:w-1/3 flex flex-col items-center px-3">
          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">Write better software</p>
            <p tw="pb-2">
              On this page you can find static- and dynamic code analysis tools
              and linters that will help you improve your code quality. All
              tools are peer-reviewed by fellow developers to meet high
              standards.
            </p>
            <p>
              {" "}
              You can help to improve this list{" "}
              <a href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md">
                {" "}
                on Github{" "}
              </a>
              and join our open community around code quality and solid
              engineering standards!
            </p>
            <img src="/hero/hero.svg" alt="People analysing charts" />
            <Link
              to="/about"
              tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
            >
              Learn more
            </Link>
          </div>

          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">Popular Languages</p>
            <div tw="grid grid-cols-3 gap-3">
              <a href="/language/python">
                <img
                  tw="hover:opacity-75"
                  alt="Python"
                  src="/logos/python.svg"
                />
              </a>
              <a href="/language/ruby">
                <img tw="hover:opacity-75" alt="Ruby" src="/logos/ruby.svg" />
              </a>
              <a href="/language/php">
                <img tw="hover:opacity-75" alt="PHP" src="/logos/php.svg" />
              </a>
              <a href="/language/c">
                <img tw="hover:opacity-75" alt="C" src="/logos/c.svg" />
              </a>
              <a href="/language/javascript">
                <img
                  tw="hover:opacity-75"
                  alt="JavaScript"
                  src="/logos/javascript.svg"
                />
              </a>
              <a href="/language/go">
                <img tw="hover:opacity-75" alt="Go" src="/logos/go.svg" />
              </a>
            </div>
          </div>
        </aside>
      </div>

      <footer tw="w-full border-t bg-white pb-12">
        <div tw="w-full container mx-auto flex flex-col items-center">
          <div tw="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a href="/about" tw="uppercase px-3">
              About Us
            </a>
          </div>
          <div>
            Beautiful icons provided by{" "}
            <a href="https://icons8.com/icon/pack/files/dusk">icons8</a>
            &nbsp;&middot;&nbsp;
            <a href="https://www.freepik.com/free-photos-vectors/background">
              Hero vector illustration created by pch.vector - www.freepik.com
            </a>
          </div>
          <div tw="uppercase pb-6">&copy; analysis-tools.dev</div>
        </div>
      </footer>
    </div>
  )
}
