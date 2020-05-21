import React from "react"
import { Link } from "gatsby"
import "twin.macro"

export default ({ children }) => {
  return (
    <div class="bg-white font-family-karla">
      <nav tw="w-full py-4 bg-blue-800 shadow">
        <div tw="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul tw="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <a
                  tw="hover:text-gray-200 hover:underline px-4"
                  href="https://github.com/analysis-tools-dev/static-analysis"
                >
                  Github
                </a>
              </li>
              <li tw="float-right">
                <Link tw="hover:text-gray-200 hover:underline px-4" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div tw="flex items-center text-lg no-underline text-white pr-6">
            <a tw="" href="#">
              <i class="fab fa-facebook"></i>
            </a>
            <a tw="pl-6" href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a tw="pl-6" href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a tw="pl-6" href="#">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </nav>

      <header tw="w-full container mx-auto">
        <div tw="flex flex-col items-center">
          <Link
            tw="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            href="/"
          >
            <img src="/logo_black.svg" tw="w-2/6" />
          </Link>
        </div>
      </header>

      <nav
        tw="w-full py-4 border-t border-b bg-gray-100"
        x-data="{ open: false }"
      >
        <div tw="block sm:hidden">
          <a
            href="#"
            tw="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
          >
            Topics <i class="fas ml-2"></i>
          </a>
        </div>
        <div tw="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div tw="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <a href="/" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Tools
            </a>
            <a href="/blog" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Blog
            </a>
            <a href="/videos" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Videos
            </a>
            <a href="#" tw="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Add tool
            </a>
          </div>
        </div>
      </nav>

      <div tw="container mx-auto flex flex-wrap py-6">
        <section tw="w-full md:w-2/3 flex flex-col px-3">
          <h1 tw="text-3xl font-bold hover:text-gray-700 pb-4">
            Tools by Language
          </h1>
          {children}
        </section>

        <aside tw="w-full md:w-1/3 flex flex-col items-center px-3">
          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">About Us</p>
            <p tw="pb-2">
              On this page you can find a directory of static and dynamic code
              analysis tools and quality checkers. All tools are peer-reviewed
              and meet high standards.
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
            <img src="/hero/hero.svg" />
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
