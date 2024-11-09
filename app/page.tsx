"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Hero from "@/app/sections/Hero/Hero";
import About from "@/app/sections/About/About";
import { initializeLenis, destroyLenis } from "@/app/utils/LenisUtils";
import React, { useEffect, useState } from "react";
import Works from "@/app/sections/Works/Works";
import Contact from "@/app/sections/Contact/Contact";
import Preloader from "@/app/sections/Preloader/Preloader";
import Marquee from "@/app/components/Marquee/Marquee";
import Testimonials from "@/app/sections/Testimonials/Testimonials";
import Header from "@/app/components/Header/Header";

export default function Home() {
    const [isHeroAnimationTriggered, setIsHeroAnimationTriggered] = useState(false);
    const [isPreloaderAnimationTriggered, setIsPreloaderAnimationTriggered] = useState(false); // Stan kontrolujący animację preloadera

    useEffect(() => {
        window.scrollTo(0, 0);
        initializeLenis();
        setIsPreloaderAnimationTriggered(true);
        return () => {
            destroyLenis();
        };
    }, []);

    const triggerHeroAnimation = () => {
        setIsHeroAnimationTriggered(true);
    };

    return (
        <div>
            <main className="bg-hexwhite">
                <Navbar/>
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
