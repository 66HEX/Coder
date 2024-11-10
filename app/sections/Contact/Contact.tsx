import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "@/app/utils/gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(SplitText, CustomEase);

export default function Contact() {
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const starRef = useRef<HTMLSpanElement | null>(null);  // Ref dla gwiazdki

    useEffect(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const childSplit = new SplitText(".about-title", { type: "lines" });

        new SplitText(".about-title", {
            type: "lines",
            linesClass: "line-wrapper overflow-hidden",
        });

        const title = childSplit.lines;

        const animateHeader = () => {
            gsap.fromTo(
                title,
                { y: "100%", scale: 1, x: 0 },
                {
                    y: "0%",
                    duration: 1,
                    ease: "customEase",
                    onComplete: () => {
                        animateStar();
                    },
                }
            );
        };

        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateHeader();
                    headerObserver.disconnect();
                }
            });
        });

        if (headerRef.current) headerObserver.observe(headerRef.current);

        const animateStar = () => {
            gsap.to(starRef.current, {
                rotation: 360,
                repeat: -1,
                duration: 10,
                ease: "linear",
            });
        };

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    return (
        <section
            id="contact"
            className="w-screen bg-hexwhite h-[400px] px-4 pb-4 flex flex-col justify-center items-center overflow-hidden relative"
        >
            <div
                className="w-full h-full flex flex-col justify-between items-center text-hexgray bg-hexblack rounded-xl font-MoriRegular text-xl md:text-2xl lg:text-3xl relative"
            >
                {/* Centered content */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col justify-center items-center text-center">
                    <h2 ref={headerRef} className="about-title font-NeueMontrealVariable font-semibold text-fluid2 uppercase leading-none">
                        <span ref={starRef} className="inline-block">✺</span> HAVE AN IDEA?
                    </h2>
                    <p className="about-title font-NeueMontrealVariable font-semibold text-xl md:text-2xl uppercase leading-none mt-4">
                        drop me an email:
                    </p>
                    <a href="mailto:hexthecoder@gmail.com"
                       className="about-title font-NeueMontrealVariable font-semibold text-base uppercase leading-none mt-4">
                        hexthecoder@gmail.com
                    </a>
                </div>

                <div className="w-full flex-grow flex items-end">
                    <ul className="flex w-full h-auto flex-row justify-between items-start gap-2 p-4 font-NeueMontrealVariable font-semibold text-base uppercase">
                        <li>
                            <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank"
                                  rel="noopener noreferrer">
                                linkedin
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="block">
                                <p className="inline-flex font-EikoItalic mr-1">©</p>
                                <p className="inline-flex">2024</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/hexthecoder/" target="_blank"
                                  rel="noopener noreferrer">
                                instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
