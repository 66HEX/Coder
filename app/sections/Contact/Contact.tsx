import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "@/app/utils/gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(SplitText, CustomEase);

export default function Contact() {
    const headerRef = useRef<HTMLHeadingElement | null>(null);

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

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    return (
        <section
            id="contact"
            className="w-screen h-[400px] px-4 pb-4 flex flex-col justify-center items-center overflow-hidden relative font-AeonikProRegular"
        >
            <div
                className="w-full h-full flex flex-col justify-between items-start text-textPrimary bg-card shadow-cardShadow rounded-cardRadius text-xl md:text-2xl lg:text-3xl relative overflow-hidden"
            >
                <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold m-4">contact</p>

                <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col justify-center items-center text-center">
                    <h2 ref={headerRef}
                        className="about-title font-AeonikProSemibold text-fluid2 uppercase leading-none">
                        HAVE AN IDEA?
                    </h2>
                    <a href="mailto:hexthecoder@gmail.com"
                       className="text-base uppercase leading-none mt-4 group">
                        hexthecoder@gmail.com
                        <span
                            className="relative before:border-textPrimary  before:content-[''] before:absolute before:left-[-228px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </a>
                    <Link href="https://www.instagram.com/hexthecoder/" target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-4 md:hidden text-base uppercase">
                        instagram
                        <span
                            className="relative  before:content-[''] before:absolute before:left-[-99px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-4 md:hidden text-base uppercase">
                        linkedin
                        <span
                            className="relative before:border-textPrimary  before:content-[''] before:absolute before:left-[-80px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </Link>
                </div>

                <div className="w-full flex-grow  items-end hidden md:flex">
                    <ul className="flex w-full h-auto flex-row justify-between items-start gap-2 p-4 text-base uppercase">
                        <li>
                            <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank"
                                  rel="noopener noreferrer"
                                  className="group">
                                linkedin
                                <span
                                    className="relative before:border-textPrimary before:content-[''] before:absolute before:left-[-80px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://www.instagram.com/hexthecoder/" target="_blank"
                                  rel="noopener noreferrer"
                                  className="group">
                                instagram
                                <span
                                    className="relative before:border-textPrimary before:content-[''] before:absolute before:left-[-99px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
