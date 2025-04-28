import { useEffect, useState } from "react";
import "../HomeContent/HomeContent.css";
import { Link } from "react-router-dom";

export default function HomeContent() {
    const logoName = "AldeMart";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [logoContent, setLogoContent] = useState("");

    useEffect(() => {
        let timeOut;
        const intervalTime = isTyping ? 500 : 300;
        if (isTyping && currentIndex < logoName.length) {
            timeOut = setTimeout(() => {
                setLogoContent((prev) => (prev + logoName.charAt(currentIndex)));
                setCurrentIndex((prev) => (prev + 1));
            }, intervalTime);
        } else if (!isTyping && currentIndex > 0) {
            timeOut = setTimeout(() => {
                setLogoContent((prev) => (prev.slice(0, -1)));
                setCurrentIndex((prev) => (prev - 1));
            }, intervalTime);           
        } else if (currentIndex === logoName.length) {
            setIsTyping(false);
        } else if (currentIndex === 0) {
            setIsTyping(true);
        }

        return () => clearTimeout(timeOut);
    }, [currentIndex, isTyping, logoContent, logoName]);

    return (
        <div className="home-wrapper">
            <div className="home-header-container">
                <h1 className="header-title">
                    Welcome to <span className="logo-wrapper">
                        <span className="logo-content">{logoContent}</span>
                        <span className="cursor">|</span>
                    </span>
                </h1>
            </div>
            <div className="text-description-container">
                <div className="home-content-container">
                    <h3 className="text-title">
                    Inspiring and Proud Tone
                    </h3>
                    <p className="text-content">
                        We proudly support UMKM businesses across the archipelago, helping artisans and entrepreneurs turn dreams into reality. Through AldeMart, 
                        authentic Indonesian products reach the world — empowering communities, preserving traditions, and building a brighter future for small businesses.
                    </p>
                </div>
                <div className="home-content-container">
                    <h3 className="text-title">
                        Simple and Friendly Tone
                    </h3>
                    <p className="text-content">
                        We believe every Indonesian product deserves the spotlight. 
                        At AldeMart, we help UMKM businesses showcase their amazing creations, connect with more customers, 
                        and build lasting success. Join us in celebrating and supporting Indonesia's best talents!
                    </p>
                </div>
                <div className="home-content-container">
                    <h3 className="text-title">
                    Modern and Energetic Tone
                    </h3>
                    <p className="text-content">
                        AldeMart is a dynamic platform made for Indonesian UMKMs who are ready to level up. 
                        We help local businesses strengthen their production, expand their market reach, and tell their unique story to the world. It's time for Indonesia's 
                        finest to take center stage — and it starts here at AldeMart.
                    </p>
                </div>
            </div>
        </div>
    )
}