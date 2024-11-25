"use client"
import React, { useState, useRef, useEffect } from "react";
import { CustomEase } from "gsap/CustomEase";
import gsap from "gsap";
import Link from "next/link";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(SplitText, CustomEase);

const Menu: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const toggleButtonLine1Ref = useRef<HTMLDivElement>(null);
    const toggleButtonLine2Ref = useRef<HTMLDivElement>(null);
    const navMenuRef = useRef<HTMLUListElement>(null);
    const menuLinksRef = useRef<HTMLLIElement[]>([]);
    const lenis = useLenis();

    CustomEase.create("customEase", "0.76,0,0.24,1");

    const addToMenuLinksRef = (el: HTMLLIElement) => {
        if (el && !menuLinksRef.current.includes(el)) {
            menuLinksRef.current.push(el);
        }
    };

    const handleToggle = () => {
        const isXLView = window.matchMedia("(min-width: 768px)").matches;
        const smallClosedSize = "4rem";
        const largeClosedSize = "5rem";
        const smallOpenWidth = "15rem";
        const smallOpenHeight = "20rem";
        const largeOpenWidth = "20rem";
        const largeOpenHeight = "25rem";

        const closedSize = isXLView ? largeClosedSize : smallClosedSize;
        const openWidth = isXLView ? largeOpenWidth : smallOpenWidth;
        const openHeight = isXLView ? largeOpenHeight : smallOpenHeight;

        const childSplit = new SplitText(menuLinksRef.current, { type: "lines" });
        new SplitText(menuLinksRef.current, {
            type: "lines",
            linesClass: "line-wrapper overflow-hidden",
        });
        const links = childSplit.lines;


        if (!isToggled) {
            gsap.to(navRef.current, {
                duration: 0.5,
                width: openWidth,
                height: openHeight,
                ease: "customEase",
                borderRadius: "1rem",
            });
            gsap.to(toggleButtonRef.current, {
                duration: 0.25,
                top: "0",
                right: "0",
                ease: "customEase",
            });
            gsap.to(toggleButtonLine1Ref.current, {
                duration: 0.25,
                rotate: 45,
                top: "50%",
                left: "50%",
                ease: "customEase",
            });
            gsap.to(toggleButtonLine2Ref.current, {
                duration: 0.25,
                rotate: -45,
                top: "50%",
                left: "50%",
                ease: "customEase",
            });
            gsap.to(navMenuRef.current, {
                duration: 0.5,
                visibility: "visible",
                opacity: 1,
                ease: "customEase",
            });

            gsap.fromTo(
                links,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    delay: 0.25,
                    duration: 0.75,
                    ease: "customEase",
                    stagger: 0.1,
                }
            );
        } else {
            gsap.to(links, {
                duration: 0.75,
                y: "100%",
                opacity: 0,
                ease: "customEase",
                stagger: 0.1,
                onComplete: () => {
                    gsap.to(navRef.current, {
                        duration: 0.5,
                        width: closedSize,
                        height: closedSize,
                        ease: "customEase",
                        borderRadius: "1rem",
                    });

                    gsap.to(toggleButtonRef.current, {
                        duration: 0.25,
                        top: "0vh",
                        right: "0vh",
                        ease: "customEase",
                    });

                    gsap.to(toggleButtonLine1Ref.current, {
                        duration: 0.25,
                        rotate: 0,
                        top: "42.5%",
                        left: "50%",
                        ease: "customEase",
                    });

                    gsap.to(toggleButtonLine2Ref.current, {
                        duration: 0.25,
                        rotate: 0,
                        top: "57.5%",
                        left: "50%",
                        ease: "customEase",
                    });

                    gsap.to(navMenuRef.current, {
                        duration: 0.25,
                        visibility: "hidden",
                        opacity: 0,
                        ease: "customEase",
                    });
                    gsap.to(links, {
                        duration: 0.75,
                        opacity: 1,
                        y: "0%",
                        ease: "customEase",
                    });
                },
            });
        }


        setIsToggled(!isToggled);
    };


    const handleScroll = (e, targetId) => {
        e.preventDefault();
        if (window.location.pathname !== "/") {
            window.location.href = `/${targetId ? `#${targetId}` : ""}`;
        } else {
            const section = document.getElementById(targetId);

            if (section && lenis) {
                lenis.scrollTo(section, { offset: -15 });
            }
        }
        handleToggle();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                handleToggle();
            }
        };

        if (isToggled) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isToggled, handleToggle]);

    const headerData = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "works", label: "Works" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-4 right-4 h-16 w-16 md:h-20 md:w-20 bg-card rounded-2xl z-30 shadow-cardShadow"
        >
            <button
                id="toggleButton"
                className="absolute top-0 right-0 h-16 w-16 md:h-20 md:w-20 rounded-full bg-card cursor-pointer z-40 shadow-cardShadow"
                onClick={handleToggle}
                ref={toggleButtonRef}
            >
                <div
                    ref={toggleButtonLine1Ref}
                    id="toggleButtonLine1"
                    className="absolute w-1/2 border border-textPrimary top-[42.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                ></div>
                <div
                    ref={toggleButtonLine2Ref}
                    id="toggleButtonLine2"
                    className="absolute w-1/2 border border-textPrimary top-[57.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                ></div>
            </button>
            <ul
                className="h-full w-full flex flex-col items-center justify-center gap-4 p-4 opacity-0 invisible"
                ref={navMenuRef}
            >
                {headerData.map((item) => (
                    <li
                        key={item.id}
                        className="w-full list-none flex items-center justify-between"
                        ref={addToMenuLinksRef}
                    >
                        <Link
                            href={`#${item.id}`}
                            className="font-AeonikProRegular text-4xl md:text-6xl text-textPrimary"
                            onClick={(e) => handleScroll(e, item.id)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
