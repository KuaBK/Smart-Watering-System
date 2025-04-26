import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Wellcome from './components/Wellcome';
import Register from './components/Register';
import SignIn from './components/SignIn';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
import LayoutDefault from './page/LayoutDefault';
import Overview from './components/Overview';
import Light from './components/Light';
import Statistic from './components/Statistic';
import Help from './components/Help/help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/changepassword" element={<ChangePW />} />
        <Route path="/forgotpassword" element={<ForgotPW />} />
        <Route path="/home" element={<PageIntro />} />

        <Route path="/user" element={<LayoutDefault />} >
          <Route index element={<Navigate to="/user/statistic" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="soldMoisture" element={<SoldMoisture />} />
          <Route path="airHumidity" element={<AirHumidity />} />
          <Route path="light" element={<Light />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="help" element={<Help />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;