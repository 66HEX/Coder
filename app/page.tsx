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

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsPreloaderAnimationTriggered(true);

    }, []);

    const triggerHeroAnimation = () => {
        setIsHeroAnimationTriggered(true);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <main className="bg-hexwhite">
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
