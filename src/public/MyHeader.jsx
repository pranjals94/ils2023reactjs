import React from 'react';

function MyHeader(props) {
    return (
        <>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <img src='../logo.png' style={{height:"80px"}}></img>
                    </a>
{/*                     
                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Home</a>
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
                        <a className="py-2 text-dark text-decoration-none" href="#">Accomm</a>
                    </nav> */}
                </div>
            </header>        
        </>
    );
}
export default MyHeader;