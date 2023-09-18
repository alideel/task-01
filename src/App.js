import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import DataPage from "./pages/DataPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datapage" element={<DataPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
