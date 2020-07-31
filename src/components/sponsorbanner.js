import React from "react"
import "twin.macro"

const SponsorBanner = () => {
  return (
    <div tw="my-3 flex border-b bg-color0 border-gray-200 py-6">
      <div tw="flex-auto pl-5">
        <a href="https://github.com/sponsors/analysis-tools-dev/" tw="pb-4">
          <h3 tw="font-bold text-xl mb-3">
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            Sponsor this project
          </h3>
        </a>
        <p tw="mb-3">
          We are currently looking for partners who want to sponsor hosting and
          development of the project.
        </p>
        <p tw="mb-3">
          <a
            tw="underline"
            href="https://github.com/sponsors/analysis-tools-dev/"
          >
            Check out our Github Sponsors page here
          </a>
        </p>
      </div>
    </div>
  )
}

export default SponsorBanner
