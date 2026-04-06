import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { ToolOne } from './pages/ToolOne';
import { ToolTwo } from './pages/ToolTwo';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="root-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
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
