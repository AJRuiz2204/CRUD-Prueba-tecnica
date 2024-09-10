import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Read from "./Read";
import Create from "./Create";
import Update from "./Update";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
