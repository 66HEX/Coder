import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "@/app/utils/gsap/SplitText";
import Link from "next/link";
import Image from "next/image";

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
            className="w-screen bg-hexwhite h-[400px] px-4 pb-4 flex flex-col justify-center items-center overflow-hidden relative"
        >
            <div
                className="w-full h-full flex flex-col justify-between items-center text-hexblack bg-white rounded-lg font-MoriRegular text-xl md:text-2xl lg:text-3xl relative overflow-hidden"
            >
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col justify-center items-center text-center">
                    <h2 ref={headerRef}
                        className="about-title font-NeueMontrealSemibold  text-fluid2 uppercase leading-none">
                        HAVE AN IDEA?
                    </h2>
                    <a href="mailto:hexthecoder@gmail.com"
                       className="font-NeueMontrealVariable text-base uppercase leading-none mt-4 group">
                        hexthecoder@gmail.com
                        <span
                            className="relative  before:content-[''] before:absolute before:left-[-228px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </a>
                    <Link href="https://www.instagram.com/hexthecoder/" target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-4 md:hidden font-NeueMontrealLight text-base uppercase">
                        instagram
                        <span
                            className="relative  before:content-[''] before:absolute before:left-[-99px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-4 md:hidden font-NeueMontrealVariable  text-base uppercase">
                        linkedin
                        <span
                            className="relative  before:content-[''] before:absolute before:left-[-80px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                    </Link>
                </div>

                <div className="w-full flex-grow  items-end hidden md:flex">
                    <ul className="flex w-full h-auto flex-row justify-between items-start gap-2 p-4 font-NeueMontrealLight text-base uppercase">
                        <li>
                            <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank"
                                  rel="noopener noreferrer"
                                  className="group">
                                linkedin
                                <span
                                    className="relative  before:content-[''] before:absolute before:left-[-80px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://www.instagram.com/hexthecoder/" target="_blank"
                                  rel="noopener noreferrer"
                                  className="group">
                                instagram
                                <span
                                    className="relative  before:content-[''] before:absolute before:left-[-99px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100">
                        </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="absolute -top-40 md:-top-32 -right-32 z-0">
                    <Image
                        src="/images/35.png"
                        alt="3D Abstract Shape"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </section>
    );
}
