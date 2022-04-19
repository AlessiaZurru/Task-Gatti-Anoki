import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./Feed";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/feed" element={<Feed />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
