import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

function App() {
  return (

    <BrowserRouter>
      <div>
        <MainRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
