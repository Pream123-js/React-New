import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/Forgotpassword";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
