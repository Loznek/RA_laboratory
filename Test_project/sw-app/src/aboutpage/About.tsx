import {Link} from "react-router-dom";
import React from "react";

export const About = () => {
    return (
        <div className="opening-page" style={{ background: '#000000' }}>
            <div className="content-wrapper">
                <h1>{"About Page"}</h1>
                <button className="admin-button" onClick={() => window.location.href = "/admin/*"}>
                    {"Go to Admin Page"}
                </button>
            </div>
        </div>
    );
}