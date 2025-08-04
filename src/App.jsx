import { BrowserRouter , Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/show-table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
