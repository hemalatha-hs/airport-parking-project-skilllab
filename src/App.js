import './page/assets/style.css';
import Homepage from './page/Home';
import Layout from './component/Layout';
import Login from './page/Login';
import AirportAvailability from './page/AirportAvailability'
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
