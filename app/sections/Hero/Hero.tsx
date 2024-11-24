import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';
import React, { useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import {useGSAP} from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(SplitText, CustomEase);

export default function Hero({ isAnimationTriggered }) {
    const sectionRef = useRef(null);

    useGSAP(() => {
        if (!isAnimationTriggered) return;

        const section = sectionRef.current;
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const animateSection = () => {
            const webSplit = new SplitText(".hero-web", { type: "lines" });
            const developerSplit = new SplitText(".hero-developer", { type: "lines" });
            const plusSplit = new SplitText(".hero-plus", { type: "lines" });
            const designerSplit = new SplitText(".hero-designer", { type: "lines" });
            const yearSplit = new SplitText(".hero-year", { type: "lines" });
            const paragraphSplit = new SplitText(".hero-paragraph", { type: "lines" });

            new SplitText(".hero-web, .hero-developer, .hero-plus, .hero-designer, .hero-year, .hero-paragraph", {
                type: "lines",
                linesClass: "line-wrapper overflow-hidden",
            });

            const timeline = gsap.timeline();

            timeline.fromTo(webSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" });
            timeline.fromTo(developerSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" }, "-=1");
            timeline.fromTo(plusSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" }, "-=1");
            timeline.fromTo(designerSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" }, "-=1");
            timeline.fromTo(yearSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" }, "-=1");
            timeline.fromTo(paragraphSplit.lines, { y: "100%" }, { y: "0%", duration: 1, ease: "customEase" }, "-=1");
            timeline.fromTo(
                ".top-right-image",
                { x: "100%", y: "-100%", opacity: 0 },
                { x: "0%", y: "0%", opacity: 1, duration: 1, ease: "customEase" },
                "-=1"
            );
            timeline.fromTo(
                ".bottom-left-image",
                { x: "-100%", y: "100%", opacity: 0 },
                { x: "0%", y: "0%", opacity: 1, duration: 1, ease: "customEase" },
                "-=1"
            );
            return () => {
                webSplit.revert();
                developerSplit.revert();
                plusSplit.revert();
                designerSplit.revert();
                yearSplit.revert();
                paragraphSplit.revert();
            };
        };

        animateSection();

        return () => {
        };
    }, [isAnimationTriggered]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="h-svh w-screen p-4"
        >
            <div
                className="h-full w-full bg-card shadow-cardShadow flex flex-col justify-center items-center overflow-hidden relative rounded-cardRadius">
                <div className="w-full flex flex-col items-start text-textPrimary p-4 z-30">
                    <h2 className="hero-web font-NeueMontrealVariable font-semibold text-fluid uppercase leading-none">web</h2>
                    <div>
                        <h2 className="hero-developer font-NeueMontrealVariable font-semibold text-fluid uppercase leading-none -mt-2 md:-mt-4 xl:-mt-8">developer</h2>
                        <div className="w-full flex justify-end -mt-2 md:-mt-4 xl:-mt-8 font-semibold">
                            <h2 className="hero-plus font-EikoItalic font-light text-fluid uppercase leading-none">+</h2>
                            <h2 className="hero-designer font-NeueMontrealVariable text-fluid uppercase leading-none ml-4 text-right">designer</h2>
                        </div>
                    </div>
                </div>
                <div
                    className="hero-paragraph absolute bottom-4 xl:bottom-28 right-4 text-textSecondary font-NeueMontrealVariable text-base md:text-2xl z-30">
                    <p>For innovative brands,</p>
                    <p>digital products and</p>
                    <p>immersive experiences.</p>
                </div>
                <div className="absolute -top-32 -right-32 z-0 top-right-image">
                    <Image
                        src="/images/blob1.png"
                        alt="Zdjęcie profilowe"
                        width={300}
                        height={300}
                    />
                </div>
                <div className="absolute -bottom-32 -left-32 z-0 bottom-left-image">
                    <Image
                        src="/images/blob1.png"
                        alt="Zdjęcie profilowe"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </section>
    );
}
