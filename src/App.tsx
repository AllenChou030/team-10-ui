import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/auth/Login/Login';
import AdminVitalView from './components/adminView/AdminVitalView';
import PatientsList from './components/adminView/PatientsList';
import PatientVitalView from './components/patientView/PatientVitalView';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 
            TODO: add check to see if user is logged in, 
              update "/" path accordingly 
          */}
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin" element={<PatientsList />} />
          <Route path="/patient/:id" element={<AdminVitalView />} />
          <Route path="/patient" element={<PatientVitalView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
