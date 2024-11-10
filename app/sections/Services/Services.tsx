import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

export default function Services() {
    const headerRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const childSplit = new SplitText(".works-title", {
            type: "lines",
        });

        const parentSplit = new SplitText(".works-title", {
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
                        gsap.delayedCall(0, () => {
                            gsap.to(title, {
                                scale: 0.75,
                                x: "-12.5%",
                                duration: 0.75,
                                ease: "customEase"
                            });
                        });
                    }
                }
            );
        };

        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateHeader();
                        headerObserver.disconnect();
                    }
                });
            },
        );

        if (headerRef.current) headerObserver.observe(headerRef.current);

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    return (
        <section className="w-screen h-svh text-hexblack p-4 flex flex-col justify-center items-center">
            <h1
                ref={headerRef}
                className="works-title font-NeueMontreal font-semibold text-fluid3 uppercase leading-none text-left w-full mb-8"
            >
                Services
            </h1>

            {/* Grid z dwiema kolumnami */}
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                {/* Lewa kolumna z kafelkami (usługi) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-xl">
                        <h2 className="font-semibold text-xl mb-4">Web Development</h2>
                        <p>Creating responsive and interactive websites using modern technologies like React, Next.js, and more.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl">
                        <h2 className="font-semibold text-xl mb-4">Web Design</h2>
                        <p>Designing beautiful and user-friendly websites with a focus on modern design trends and UI/UX principles.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl">
                        <h2 className="font-semibold text-xl mb-4">E-commerce Solutions</h2>
                        <p>Building scalable e-commerce platforms with payment gateway integration and user-focused design.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xl">
                        <h2 className="font-semibold text-xl mb-4">SEO Optimization</h2>
                        <p>Optimizing websites for better search engine rankings and visibility through content and technical improvements.</p>
                    </div>
                </div>

                {/* Prawa kolumna z opisem */}
                <div className="flex flex-col justify-start items-start p-4">
                    <p className="text-lg">
                        As a web developer and designer, I provide a full range of services to help you create and enhance your online presence.
                        Whether you're looking for custom web development, modern design, or SEO optimization, I offer tailor-made solutions
                        to fit your business needs. Let's build something amazing together!
                    </p>
                </div>
            </div>
        </section>
    );
}
