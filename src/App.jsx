import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.jsx';
import Signup from './Components/Signup.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;