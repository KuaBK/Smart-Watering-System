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
import PageIntro from './page/PageIntro';
import AirHumidity from './components/AirHumidity';
import SoldMoisture from './components/SoldMoisture';
import ChangePW from './components/ChangePW';
import ForgotPW from './components/ForgotPW';
import PageAdmin from './page/PageAdmin';
import ManaGarden from './components/ManaGarden';
import ManaUser from './components/ManaUser';
import FarmDetail from './components/FarmDetail';
import Garden from './page/Garden';
import User from './page/User';
import AddGarden from './components/AddGarden';
import UserDetail from './components/UserDetail';

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
          {/* <Route path="airHumidity" element={<AirHumidity />} /> */}
          <Route path="light" element={<Light />} />
          <Route path="statistic" element={<Statistic />} />
        </Route>

        <Route path="/admin" element={<PageAdmin />} >
          <Route index element={<Navigate to="/admin/garden" replace />} />

          <Route path="garden" element={<Garden />} >
            <Route index element={<Navigate to="/admin/garden/overview" replace />} />
            <Route path="overview" element={<ManaGarden />} />
            <Route path="farmdetail/:idGarden" element={<FarmDetail />} />
            <Route path="addFarm" element={<AddGarden />} />
          </Route>
          <Route path="user" element={<User />} >
            <Route index element={<Navigate to="/admin/user/overview" replace />} />
            <Route path="overview" element={<ManaUser />} />
            <Route path="userdetail/:iduser" element={<UserDetail />} />
          </Route>
        </Route>


      </Routes>
    </Router>
  );
}

export default App;