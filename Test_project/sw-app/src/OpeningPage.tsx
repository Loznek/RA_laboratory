import React from 'react';
import './App.css';
import PICTURES from "./Pictures/Pictures"; // Import your CSS file


export const OpeningPage = () => {


    return (
        <div className="opening-page" style={{ background: '#000000' }}>
            <div className="content-wrapper">
                <img  height={300} src={PICTURES.swLogo} title="saber" />
                <h1>{"Star Wars Admin"}</h1>
                <p>{"A React-admin solution"}</p>
                    <button className="admin-button" onClick={() => window.location.href = "/admin"}>
                        {"Go to Admin Page"}
                    </button>
            </div>
        </div>
    );
};

