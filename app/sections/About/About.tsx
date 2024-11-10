import { gsap } from "gsap";
import React, { useRef } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from 'gsap/CustomEase';
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase);

export default function About() {
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const techRef = useRef(null); // New reference for Technologies & Tools section
    const langRef = useRef(null); // New reference for Languages section

    useGSAP(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const animateText = (words) => {
            gsap.fromTo(
                words,
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

        const splitTextElements = () => {
            const childSplit = new SplitText(".about-description", { type: "words" });
            const techSplit = new SplitText(".technology-column", { type: "words" }); // Split Technologies & Tools
            const langSplit = new SplitText(".languages-column", { type: "words" }); // Split Languages
            const parentSplit = new SplitText(".about-description, .technology-column, .languages-column", { type: "lines", linesClass: "line-wrapper overflow-hidden" });

            const words = childSplit.words;
            const techWords = techSplit.words; // Lines for Technologies
            const langWords = langSplit.words; // Lines for Languages

            const textObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(words);
                            textObserver.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.01,
                }
            );

            const techObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(techWords); // Animate Technologies
                            techObserver.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.01,
                }
            );

            const langObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(langWords); // Animate Languages
                            langObserver.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.01,
                }
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
                {
                    threshold: 0.01,
                }
            );

            // Observing elements
            if (textRef.current) textObserver.observe(textRef.current);
            if (techRef.current) techObserver.observe(techRef.current); // Observe Technologies & Tools
            if (langRef.current) langObserver.observe(langRef.current); // Observe Languages
            if (imageRef.current) imageObserver.observe(imageRef.current);
        };

        // Ensure everything is rendered before applying SplitText
        splitTextElements();

        return () => {

        };
    }, []);

    return (
        <section
            id="about"
            className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center NeueMontrealVariable"
        >
            <div className="h-full w-full flex flex-col md:flex-row">
                <div ref={textRef} className="w-full md:w-2/3 order-2 md:order-1 flex flex-col p-4 bg-white rounded-xl">
                    <p className="about-description text-xl md:text-2xl">
                        I’m Marek Jóźwiak, a web designer and developer with a rich background in electronics, based in
                        Poland. Originally trained as an electronician, I possess a technical foundation that
                        enhances my problem-solving approach to web development. With experience as an electronics
                        technician, I bring a unique, precision-oriented perspective to my design and coding work,
                        blending visual creativity with technical functionality to create digital solutions that are as
                        reliable as they are engaging.
                    </p>
                    <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div ref={techRef} className="w-full md:w-1/2">
                            <h3 className=" technology-column font-semibold text-xl md:text-2xl mb-4">Technologies & Tools</h3>
                            <ul className="list-disc ml-5">
                                <li className="technology-column">JavaScript (ES6+)</li>
                                <li className="technology-column">React & Next.js</li>
                                <li className="technology-column">HTML & CSS (Sass, Tailwind)</li>
                                <li className="technology-column">Node.js & Express</li>
                                <li className="technology-column">Git & GitHub</li>
                                <li className="technology-column">GSAP</li>
                                <li className="technology-column">Figma</li>
                            </ul>
                        </div>
                        <div ref={langRef} className="w-full md:w-1/2">
                            <h3 className="languages-column font-semibold text-xl md:text-2xl mb-4">Languages</h3>
                            <ul className="list-disc ml-5">
                                <li className="languages-column">English (B2)</li>
                                <li className="languages-column">Polish (native)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Image
                    ref={imageRef}
                    src="/images/about-photo22.png"
                    alt="Zdjęcie profilowe"
                    width={500}
                    height={500}
                    className="object-cover about-photo md:w-1/3 md:ml-4 order-1 md:order-2 mb-4 md:mb-0 rounded-xl"
                />
            </div>
        </section>
    );
}
