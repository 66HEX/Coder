"use client";
import Hero from "@/app/sections/Hero/Hero";
import Works from "@/app/sections/Works/Works";
import Contact from "@/app/sections/Contact/Contact";
import Testimonials from "@/app/sections/Testimonials/Testimonials";
import About from "@/app/sections/About/About";

export default function Home() {

    return (
        <div>
            <main className="bg-background">
                <Hero />
                <About/>
                <Works/>
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
}
