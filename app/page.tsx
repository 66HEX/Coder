"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Hero from "@/app/sections/Hero/Hero";
import About from "@/app/sections/About/About";

import React, { useEffect, useState } from "react";
import Works from "@/app/sections/Works/Works";
import Contact from "@/app/sections/Contact/Contact";
import Preloader from "@/app/sections/Preloader/Preloader";
import Testimonials from "@/app/sections/Testimonials/Testimonials";

export default function Home() {
    const [isHeroAnimationTriggered, setIsHeroAnimationTriggered] = useState(false);
    const [isPreloaderAnimationTriggered, setIsPreloaderAnimationTriggered] = useState(false);
    const [isNavbarAnimationTriggered, setIsNavbarAnimationTriggered] = useState(false); // Nowy stan

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsPreloaderAnimationTriggered(true);

    }, []);

    const triggerHeroAnimation = () => {
        setIsHeroAnimationTriggered(true);
        setIsNavbarAnimationTriggered(true);
        window.scrollTo(0, 0);// Ustawienie animacji navbaru
    };

    return (
        <div>
            <main className="bg-hexwhite">
                <Navbar isAnimationTriggered={isNavbarAnimationTriggered} /> {/* Przekazanie stanu */}
                <Preloader onComplete={triggerHeroAnimation} isAnimationTriggered={isPreloaderAnimationTriggered} />
                <Hero isAnimationTriggered={isHeroAnimationTriggered} />
                <About />
                <Works />
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
}
