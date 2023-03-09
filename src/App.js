
import './page/assets/style.css';
import HomePage from './page/HomePage';
import Layout from './page/Layout';
import Login from './page/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function  App()  {
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="/" index element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<HomePage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
