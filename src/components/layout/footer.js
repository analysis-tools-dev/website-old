import React from "react"

const Footer = () => {
  return (
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
  )
}

export default Footer
