import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "components/layout";
import LoginPage from "pages/login";
import LandingPage from "pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={"/"} element={<LandingPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"*"} element={<Navigate to={"/"} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
