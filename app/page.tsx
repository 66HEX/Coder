"use client";
import { useEffect } from "react";
import Hero from "@/app/sections/Hero/Hero";
import About from "@/app/sections/About/About";
import Works from "@/app/sections/Works/Works";
import Testimonials from "@/app/sections/Testimonials/Testimonials";
import Contact from "@/app/sections/Contact/Contact";

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <main className="bg-background">
                <Hero />
                <About />
                <Works />
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
}
