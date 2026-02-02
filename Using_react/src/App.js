import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AboutPage from './pages/About';
import AppNavbar from "./pages/Home";
import RandomPage from './pages/RandomPassword';
import InputPasswordGenerator from './pages/InputPassword';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
<Routes>
  <Route path="/" element={<AppNavbar/>}/>
    <Route path="/about" element={<AboutPage/>}/>
        <Route path="/generate1" element={<RandomPage/>}/>
   <Route path="/generate2" element={<InputPasswordGenerator/>}/>

</Routes>

     </BrowserRouter>
     
    </div>
  );
}

export default App;
