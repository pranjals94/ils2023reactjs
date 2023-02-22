import React, { useEffect } from 'react';

function Signin(props) {
    useEffect(() => {
    window.location.href = process.env.REACT_APP_rgsevaUrl + '/signin/'; 
    }, []);
    return null;
}

export default Signin;