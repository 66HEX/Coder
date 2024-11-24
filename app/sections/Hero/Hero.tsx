import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';
import React, { useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import {useGSAP} from "@gsap/react";
import Image from "next/image";
import {Scene} from "@/app/components/Scene/Scene";

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
            <div className="h-1/3 w-full"></div>
            <div
                className="h-2/3 w-full bg-card shadow-cardShadow flex flex-col justify-center items-center overflow-hidden relative rounded-cardRadius">
                <Scene />
            </div>
        </section>
    );
}
