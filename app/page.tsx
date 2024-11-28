"use client";
import { useState, useEffect } from "react";
import Hero from "@/app/sections/Hero/Hero";
import About from "@/app/sections/About/About";
import Works from "@/app/sections/Works/Works";
import Testimonials from "@/app/sections/Testimonials/Testimonials";
import Contact from "@/app/sections/Contact/Contact";
import Preloader from "@/app/components/Preloader/Preloader";

export default function Home() {
    const [isPreloaderComplete, setPreloaderComplete] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <main className="bg-background">
                <Preloader onComplete={() => setPreloaderComplete(true)} />
                <Hero isPreloaderComplete={isPreloaderComplete} />
                <About />
                <Works />
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
}
