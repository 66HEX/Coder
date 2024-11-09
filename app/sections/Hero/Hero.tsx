import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';
import { useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import {useGSAP} from "@gsap/react";

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
            <div className="h-full w-full bg-hexblack flex flex-col justify-center items-center overflow-hidden relative rounded-xl">
                <div className="w-full flex flex-col items-start text-hexwhite p-4">
                    <h2 className="hero-web font-NeueMontreal font-semibold text-fluid uppercase leading-none">web</h2>
                    <div>
                        <h2 className="hero-developer font-NeueMontreal font-semibold text-fluid uppercase leading-none -mt-2 md:-mt-4 xl:-mt-8">developer</h2>
                        <div className="w-full flex justify-end -mt-2 md:-mt-4 xl:-mt-8">
                            <h2 className="hero-plus font-EikoItalic font-light text-fluid uppercase leading-none">+</h2>
                            <h2 className="hero-designer font-NeueMontreal font-semibold text-fluid uppercase leading-none ml-4 text-right">designer</h2>
                        </div>
                    </div>
                </div>
                <div
                    className="hero-paragraph absolute bottom-4 xl:bottom-28 right-4 text-hexgray font-NeueMontreal text-base md:text-2xl">
                    <p>For innovative brands,</p>
                    <p>digital products and</p>
                    <p>immersive experiences.</p>
                </div>
            </div>
        </section>
    );
}
