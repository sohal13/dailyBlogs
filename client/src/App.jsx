import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRouts from "./components/PrivateRouts"
import AccountSetting from "./pages/AccountSetting"
import Updateuser from "./pages/Updateuser"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from "./pages/ForgotPass"
import Resetpass from "./pages/Resetpass"
import ForgotResetPass from "./pages/ForgotResetPass"
import Allblogs from "./pages/Allblogs"
import  SingleBlog  from "./pages/SingleBlog"
import CreateBlog from "./pages/CreateBlog"
import MyBlogs from "./pages/MyBlogs"
import EditBlog from "./pages/EditBlog"
import About from "./pages/About"

function App() {

  return (
    <div className=" bg-green-200 w-full h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allblogs" element={<Allblogs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset/:token" element={<ForgotResetPass />} />
          <Route path="/thisblog/:id" element={< SingleBlog />} />
          <Route path="/about" element={< About />} />


          <Route element={<PrivateRouts />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<AccountSetting />} />
            <Route path="/account/resetpassword" element={<Resetpass />} />
            <Route path="/account/updateuser" element={<Updateuser />} />
            <Route path="/createblog" element={< CreateBlog />} />
            <Route path="/myblogs" element={< MyBlogs />} />
            <Route path="/editblog/:id" element={< EditBlog />} />



          </Route>

        </Routes>

      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
