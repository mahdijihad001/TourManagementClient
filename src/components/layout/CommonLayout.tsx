import type { ReactNode } from "react"

import Footer from "./Footer"
import Navabar from "./Navbar"

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navabar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>

  )
}

export default CommonLayout