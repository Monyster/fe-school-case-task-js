import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/main.css";

import { Courses } from "./Pages/Courses";
import { Course } from "./Pages/Course";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/:id" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
