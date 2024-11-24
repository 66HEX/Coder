"use client"
import React, { useState, useEffect, useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(SplitText, CustomEase);

export default function Dock() {
    const [activeSection, setActiveSection] = useState("");
    const [isAnimationTriggered, setAnimationTriggered] = useState(false); // State for animation trigger
    const navMenuRef = useRef(null);
    const navRef = useRef(null);
    const lenis = useLenis();

    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationTriggered(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isAnimationTriggered) {
            gsap.fromTo(
                navRef.current,
                { y: "100%", autoAlpha: 0 },
                { y: "0%", duration: 1, autoAlpha: 1, ease: "customEase" }
            );
        }
    }, [isAnimationTriggered]);

    useEffect(() => {
        gsap.set(navMenuRef.current, { left: "100%" });

        const sections = document.querySelectorAll("section");
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const handleScroll = (e, targetId) => {
        e.preventDefault();

        if (window.location.pathname !== "/") {
            window.location.href = `/${targetId ? `#${targetId}` : ''}`;
        } else {
            const section = document.getElementById(targetId);

            if (section && lenis) {
                lenis.scrollTo(section, { offset: -15 });
            }
        }
    };


    return (
        <nav ref={navRef} id="nav" className="fixed bottom-2 left-1/2 transform -translate-x-1/2 flex justify-between items-center z-50"

        >
            <div
                ref={navMenuRef}
                className="flex bg-textPrimary flex-row items-center justify-between md:gap-8 font-NeueMontrealVariable text-card uppercase px-8 py-4 rounded-lg shadow-card "
            >
                <ul className="flex flex-row items-center">
                    {[{ href: "#home", label: "home" }, { href: "#about", label: "about" }, { href: "#works", label: "works" }, { href: "#contact", label: "contact" }].map((item, index) => (
                        <li key={index} className="relative group px-2 md:px-8 w-full ">
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href.replace("#", ""))}
                                className="text-base flex items-center navbar-link w-full flex-grow leading-none">
                                <span
                                    className={`relative before:content-[''] before:absolute before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 
                                    ${
                                        activeSection === item.href.replace("#", "")
                                            ? "before:bg-card"
                                            : "before:border-2 before:border-card before:opacity-0 group-hover:before:opacity-100"
                                    }
                                            before:hidden md:before:block`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
