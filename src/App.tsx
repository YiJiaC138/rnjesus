import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar.tsx';
import { Home } from './pages/Home.tsx';
import { Roller } from './pages/Roller.tsx';
import { ToolOne } from './pages/ToolOne.tsx';
import { ToolTwo } from './pages/ToolTwo.tsx';
import { Settings } from './pages/Settings.tsx';

function App() {
  return (
    <Router>
      <div className="root-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roller" element={<Roller />} />
            <Route path="/tool-1" element={<ToolOne />} />
            <Route path="/tool-2" element={<ToolTwo />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
