import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Auth } from "./components/Auth/Auth";
import { Page404 } from "./components/404Page/404";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { ForgotPassword } from "./components/Auth/ForgotPassword/ForgotPassword";
import { Chat } from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/chat" element={<Chat />} />
        </Route>
        <Route exact path="/" element={<Auth />} />
        <Route
          exact
          path="/reset-password"
          element={<ForgotPassword />}
        ></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
