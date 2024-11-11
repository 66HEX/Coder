import React, { useState, useEffect, useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "@studio-freight/react-lenis"; // Import the hook to access Lenis

gsap.registerPlugin(SplitText, CustomEase);

export default function Navbar({ isAnimationTriggered }) {
    const [activeSection, setActiveSection] = useState("");
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleButtonRef = useRef(null);
    const toggleButtonLine1Ref = useRef(null);
    const toggleButtonLine2Ref = useRef(null);
    const navMenuRef = useRef(null);
    const navRef = useRef(null);

    const childSplit = useRef(null);
    const parentSplit = useRef(null);

    const lenis = useLenis(); // Access the Lenis instance directly

    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        if (isAnimationTriggered) {
            gsap.fromTo(
                navRef.current,
                { y: "-100%", autoAlpha: 0 },
                { y: "0%", duration: 1, autoAlpha: 1, ease: "customEase" }
            );
        }
    }, [isAnimationTriggered]);

    useEffect(() => {

        const parent = document.querySelector(".navbar-link");

        const parentElements = document.querySelectorAll(".navbar-link");



        // Tylko dla widoku mobilnego (np. poniżej 640px)

        if (window.innerWidth < 640) {

            if (parent) {

                childSplit.current = new SplitText(".navbar-link", { type: "lines" });



                // Przesuwamy wszystkie linie o 100% w dół, aby były poza ekranem

                gsap.set(childSplit.current.lines, { y: "100%" });

            }

        }
        
        parentElements.forEach((parent) => {

            parent.classList.add("overflow-y-clip");

            parent.classList.add("overflow-x-visible");

        });

        parentSplit.current = new SplitText(".navbar-link", {

            type: "lines",

            linesClass: "line-wrapper",

        });

    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navMenuRef.current &&
                !navMenuRef.current.contains(event.target) &&
                !toggleButtonRef.current.contains(event.target)
            ) {
                setMobileMenuOpen(false);
                closeMenuAnimation();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    const closeMenuAnimation = () => {
        gsap.to(navMenuRef.current, {
            duration: 0.3,
            left: "100%",
            visibility: "visible",
            ease: "customEase",
            onComplete: () => animateText("out"),
        });
        gsap.to(toggleButtonLine1Ref.current, { duration: 0.2, rotate: 0, top: "42.5%", ease: "customEase" });
        gsap.to(toggleButtonLine2Ref.current, { duration: 0.2, rotate: 0, top: "57.5%", ease: "customEase" });
    };

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

    const animateText = (direction) => {
        if (childSplit.current) {
            gsap.from(childSplit.current.lines, { y: "100%" });

            gsap.to(childSplit.current.lines, {
                y: direction === "in" ? "0%" : "100%",
                duration: 0.8,
                ease: "customEase",
            });
        }
    };

    const handleToggle = () => {
        const isExpanded = !isMobileMenuOpen;

        gsap.to(toggleButtonLine1Ref.current, {
            duration: 0.2,
            rotate: isExpanded ? 45 : 0,
            top: isExpanded ? "50%" : "42.5%",
            ease: "customEase",
        });

        gsap.to(toggleButtonLine2Ref.current, {
            duration: 0.2,
            rotate: isExpanded ? -45 : 0,
            top: isExpanded ? "50%" : "57.5%",
            ease: "customEase",
        });

        if (isExpanded) {
            gsap.to(navMenuRef.current, {
                duration: 0.3,
                left: "40%",
                ease: "customEase",
                onComplete: () => animateText("in"),
            });
        } else {
            closeMenuAnimation();
        }
        setMobileMenuOpen(isExpanded);
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const section = document.getElementById(targetId);

        if (section && lenis) {
            lenis.scrollTo(section, { offset: -60 }); // Use scrollTo from the lenis instance
        }

        if (window.innerWidth < 640) {
            setMobileMenuOpen(false);
            handleToggle();
        }
    };

    return (
        <nav ref={navRef} id="nav" className="fixed w-screen  flex justify-between items-center z-30 p-4 bg-hexwhite shadow-xl"
             style={{visibility: "hidden"}}
        >
            <div className="flex items-center">
                <span className="text-hexblack font-NeueMontrealVariable font-bold uppercase leading-none text-lg">
                    hex the coder
                </span>
            </div>

            <button
                id="toggleButton"
                aria-controls="menu"
                aria-label="menu button"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                className="absolute top-0 right-2 h-12 w-12 rounded-2xl cursor-pointer z-50 md:hidden"
                onClick={handleToggle}
                ref={toggleButtonRef}
            >
                <div
                    ref={toggleButtonLine1Ref}
                    id="toggleButtonLine1"
                    className="absolute h-1 bg-hexblack w-1/2 top-[42.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
                <div
                    ref={toggleButtonLine2Ref}
                    id="toggleButtonLine2"
                    className="absolute h-1 bg-hexblack w-1/2 top-[57.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
            </button>

            <div
                ref={navMenuRef}
                className="flex fixed md:static top-0 left-0 px-4 w-full md:w-auto bg-hexwhite md:bg-transparent flex-col md:flex-row justify-center items-center min-h-svh h-full md:min-h-0 md:justify-between md:gap-8 font-NeueMontrealVariable font-semibold text-hexblack uppercase"
            >
                <ul className="flex flex-col md:flex-row items-center w-full md:w-auto">
                    {[{ href: "#home", label: "home" }, { href: "#about", label: "about" }, { href: "#works", label: "works" }, { href: "#contact", label: "contact" }].map((item, index) => (
                        <li key={index} className="relative group py-2 md:py-0 px-8 w-full ">
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href.replace("#", ""))}
                                className="text-hexblack text-fluid2 md:text-base flex items-center navbar-link w-full flex-grow leading-none">
                                <span
                                    className={`relative  before:content-[''] before:absolute before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 ${
                                        activeSection === item.href.replace("#", "")
                                            ? "before:bg-hexblack"
                                            : "before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100"
                                    }`}

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
