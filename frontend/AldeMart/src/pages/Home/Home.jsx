import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import HomeContent from "../../components/HomeContent/HomeContent";

export default function Home() {

    const titleName = "AldeMart";
    const [titleIndex, setTitleIndex] = useState();


    useEffect(() => {

    }, []);

    return (
        <div className="home-container">
            <Navbar />
            <main className="main-content">
               <HomeContent />
            </main>
            <Footer />
        </div>
    )
}




