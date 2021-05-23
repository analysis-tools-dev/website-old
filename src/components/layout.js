import React from "react"
import "twin.macro"
import Header from "./layout/header"
import Nav from "./layout/nav"
import Aside from "./layout/aside"
import Footer from "./layout/footer"

const Layout = ({ children }) => {
  return (
    <div tw="bg-cblue-600">
      <Header />
      <Nav />
      <div tw="container mx-auto flex flex-wrap py-6">
        <section tw="w-full md:w-2/3 flex flex-col px-3">{children}</section>
        <Aside />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
