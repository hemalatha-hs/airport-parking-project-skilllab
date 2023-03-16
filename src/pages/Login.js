import React from 'react';
import {Link} from 'react-router-dom';

const Login=()=>{
  return(
    <div>
        <h1>
            Login Demo Page
        </h1>
        <h3>
        <Link to="/">
            Back to Homepage</Link>
        </h3>
    </div>
  )
}
export default Login;