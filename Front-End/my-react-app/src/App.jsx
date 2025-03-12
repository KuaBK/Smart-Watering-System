import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wellcome from './components/Wellcome';
import Register from './components/Register';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;