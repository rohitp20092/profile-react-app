import logo from './logo.svg';
import './App.css';
import InputProfile from './container/InputProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowProfile from './container/ShowProfile';
import EditProfile from './container/EditProfile';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<InputProfile />} />
          <Route exact path="/view-profile" element={<ShowProfile />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
