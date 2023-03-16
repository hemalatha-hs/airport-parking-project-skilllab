import './pages/assets/style.css';
import Homepage from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import AirportAvailability from './pages/AirportAvailability'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function  App()  {
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/" index element={<Homepage/>}/>
      <Route path="results" element={<AirportAvailability />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Homepage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
