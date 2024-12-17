import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout"
import Home from "./Pages/home"
import Desktop from "./Pages/desktop"
import Laptop from "./Pages/laptop"
import Mobile from "./Pages/mobile"
import Cart from "./Pages/cart"
import Checkout from "./Pages/checkout"
import Payment from "./Pages/payment"

const App=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<div><Home /></div>} />
          <Route path="/home" element={<div><Home /></div>} />
          <Route path="/desktop" element={<div><Desktop /></div>} />
          <Route path="/laptop" element={<div><Laptop /></div>} />
          <Route path="/mobile" element={<div><Mobile /></div>} />
          <Route path="/cart" element={<div><Cart /></div>} />
          <Route path="/checkout" element={<div><Checkout /></div>} />
          <Route path="/payment"  element={<div><Payment/></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App