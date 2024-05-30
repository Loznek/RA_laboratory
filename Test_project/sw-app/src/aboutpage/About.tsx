import {Link} from "react-router-dom";
import React from "react";
import '../app.css';
import PICTURES from "../Pictures/Pictures"; // Import your CSS file


export const AboutPage = () => {
    const images = [
        PICTURES.ra,
        PICTURES.keystone,
        PICTURES.gpql,
    ];
    return (
        <div className="opening-page">
            <div className="content-wrapper">
                <p><b>This project created by Zoltán Kende for the first Project Laboratory subject in the Computer Science Engineering MSC programme</b> </p>
                <h2>{"Used technologies"}</h2>
                <div className="image-container">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${image}`}/>
                    ))}
                </div>
                <h3>{"Department"}</h3>
                <img height={60} src={PICTURES.aut} title="Aut"/>
                <br/>
                <button className="admin-button" onClick={() => window.location.href = "/admin"}>
                    {"Go to Admin Page"}
                </button>
            </div>
        </div>
    );
}