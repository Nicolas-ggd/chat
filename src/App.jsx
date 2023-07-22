import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Auth } from "./Auth/Auth";
import { Page404 } from "./404Page/404";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { ForgotPassword } from "./Auth/ForgotPassword/ForgotPassword";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
        </Route>
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/reset-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
