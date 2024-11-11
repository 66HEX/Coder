import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from 'gsap/CustomEase';
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { aboutData } from '@/app/data/aboutData';

gsap.registerPlugin(SplitText, CustomEase);

export default function About() {
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const techRef = useRef(null);
    const langRef = useRef(null);

    useGSAP(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const animateText = (lines) => {
            gsap.fromTo(
                lines,
                { y: "100%" },
                {
                    y: "0%",
                    duration: 1,
                    ease: "customEase",
                }
            );
        };

        const animateImage = () => {
            gsap.fromTo(
                imageRef.current,
                { clipPath: "inset(0% 0% 100% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1,
                    ease: "customEase",
                }
            );
        };

        const initializeSplitText = () => {
            const childSplit = new SplitText(".about-description", { type: "lines" });
            const techSplit = new SplitText(".technology-column", { type: "lines" });
            const langSplit = new SplitText(".languages-column", { type: "lines" });
            const parentSplit = new SplitText(".about-description, .technology-column, .languages-column", { type: "lines", linesClass: "line-wrapper overflow-hidden" });

            const lines = childSplit.lines;
            const techLines = techSplit.lines;
            const langLines = langSplit.lines;

            const textObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(lines);
                            textObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.01 }
            );

            const techObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(techLines);
                            techObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.01 }
            );

            const langObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(langLines);
                            langObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.01 }
            );

            const imageObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateImage();
                            imageObserver.disconnect();
                        }
                    });
                },
                { threshold: 0.01 }
            );

            // Observing elements
            if (textRef.current) textObserver.observe(textRef.current);
            if (techRef.current) techObserver.observe(techRef.current);
            if (langRef.current) langObserver.observe(langRef.current);
            if (imageRef.current) imageObserver.observe(imageRef.current);
        };

        const handleFontLoad = async () => {
            if (document.fonts) {
                await document.fonts.ready;  // Wait for all fonts to load
                setTimeout(() => {
                    initializeSplitText();   // Initialize SplitText after fonts are ready and 200ms delay
                }, 200);
            }
        };

        // Trigger font loading listener
        handleFontLoad();

        return () => {
            // Cleanup observers if needed
        };
    }, []);

    return (
        <section
            id="about"
            className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center font-NeueMontrealVariable"
        >
            <div className="h-full w-full flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 order-2 md:order-1 flex flex-col p-4 bg-white rounded-xl">
                    <p className="about-description text-xl md:text-2xl">
                        {aboutData.description}
                    </p>
                    <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <h3 className="technology-column font-semibold text-xl md:text-2xl mb-4">Technologies &
                                Tools</h3>
                            <ul className="list-disc ml-5">
                                {aboutData.technologies.map((tech, index) => (
                                    <li key={index} className="technology-column">{tech}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="languages-column font-semibold text-xl md:text-2xl mb-4">Languages</h3>
                            <ul className="list-disc ml-5">
                                {aboutData.languages.map((lang, index) => (
                                    <li key={index} className="languages-column">{lang}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <Image
                    src={aboutData.imageUrl}  // URL zdjęcia z danych
                    alt="Zdjęcie profilowe"
                    width={500}
                    height={500}
                    className="object-cover about-photo md:w-1/3 md:ml-4 order-1 md:order-2 mb-4 md:mb-0 rounded-xl"
                />
            </div>
        </section>
    );
}
