import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/Loginpage/LoginPage'
import DashBoardPage from './pages/DashBoardPage/DashBoardPage'
import SettingPage from './pages/SettingPage/SettingPage'
import AnalyticsPage from './pages/AnalyticsPage/Analyticspage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<DashBoardPage />} />
    <Route path="/setting" element={<SettingPage />} />
    <Route path="/analytics" element={<AnalyticsPage />} />
   




    </Routes>
    </BrowserRouter>
  );
}

export default App;
