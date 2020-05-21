import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
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
        <div tw="flex flex-col items-center py-12">
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
        <section tw="w-full md:w-2/3 flex flex-col items-center px-3">
          {children}

          {/* <article tw="flex flex-col shadow my-4">
            <a href="#" tw="hover:opacity-75">
              <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
            </a>
            <div tw="bg-white flex flex-col justify-start p-6">
              <a href="#" tw="text-blue-700 text-sm font-bold uppercase pb-4">
                Technology
              </a>
              <a href="#" tw="text-3xl font-bold hover:text-gray-700 pb-4">
                Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
              </a>
              <p href="#" tw="text-sm pb-3">
                By{" "}
                <a href="#" tw="font-semibold hover:text-gray-800">
                  David Grzyb
                </a>
                , Published on April 25th, 2020
              </p>
              <a href="#" tw="pb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus,
                quis iaculis dui porta volutpat. In sit amet posuere magna..
              </a>
              <a href="#" tw="uppercase text-gray-800 hover:text-black">
                Continue Reading <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </article>

          <div tw="flex items-center py-8">
            <a
              href="#"
              tw="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center"
            >
              1
            </a>
            <a
              href="#"
              tw="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center"
            >
              2
            </a>
            <a
              href="#"
              tw="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
            >
              Next <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div> */}
        </section>

        <aside tw="w-full md:w-1/3 flex flex-col items-center px-3">
          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">About Us</p>
            <p tw="pb-2">
              We are an open community around code quality and solid engineering
              standards! Here you can find a directory of static and dynamic
              code analysis tools and quality checkers. All tools are
              peer-reviewed and meet high standards. You can help to improve
              this list{" "}
              <a href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md">
                {" "}
                on Github{" "}
              </a>
              .
            </p>
            <Link
              to="/about"
              tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
            >
              Get to know us
            </Link>
          </div>

          <div tw="w-full bg-white shadow flex flex-col my-4 p-6">
            <p tw="text-xl font-semibold pb-5">Instagram</p>
            <div tw="grid grid-cols-3 gap-3">
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
              />
              <img
                tw="hover:opacity-75"
                src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
              />
            </div>
            <a
              href="#"
              tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6"
            >
              <i class="fab fa-instagram mr-2"></i> Follow @dgrzyb
            </a>
          </div>
        </aside>
      </div>

      <footer tw="w-full border-t bg-white pb-12">
        <div
          tw="relative w-full flex items-center invisible md:visible md:pb-12"
          x-data="getCarouselData()"
        >
          <button tw="absolute bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 ml-12">
            &#8592;
          </button>
          <template x-for="image in images.slice(currentIndex, currentIndex + 6)">
            <img tw="w-1/6 hover:opacity-75" />
          </template>
          <button tw="absolute right-0 bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 mr-12">
            &#8594;
          </button>
        </div>
        <div tw="w-full container mx-auto flex flex-col items-center">
          <div tw="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a href="#" tw="uppercase px-3">
              About Us
            </a>
            <a href="#" tw="uppercase px-3">
              Privacy Policy
            </a>
            <a href="#" tw="uppercase px-3">
              Terms Conditions
            </a>
            <a href="#" tw="uppercase px-3">
              Contact Us
            </a>
          </div>
          <div tw="uppercase pb-6">&copy; myblog.com</div>
        </div>
      </footer>
    </div>
  )
}
