import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import WorksModal from '@/app/sections/Works/WorksModal/WorksModal';
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/app/utils/gsap/SplitText"; // Assuming SplitText is imported here

gsap.registerPlugin(SplitText, CustomEase);

interface ModalState {
    active: boolean;
    index: number;
}

export default function Works() {
    const headerRef = useRef(null);
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
    const imageRef = useRef<(HTMLDivElement | null)[]>([]);
    const imageElementRef = useRef<(HTMLImageElement | null)[]>([]); // Add references to image elements
    CustomEase.create("customEase", "0.76,0,0.24,1");

    const handleMouseEnter = (index: number) => {
        setModal({ active: true, index });

        if (imageElementRef.current[index]) {
            gsap.to(imageElementRef.current[index], {
                scale: 1.05,
                transformOrigin: "center center",
                duration: 0.5,
                ease: "customEase"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        setModal({ active: false, index });

        if (imageElementRef.current[index]) {
            gsap.to(imageElementRef.current[index], {
                scale: 1,
                transformOrigin: "center center",
                duration: 0.5,
                ease: "customEase"
            });
        }
    };

    const works = [
        {
            title: "Text Placeholder",
            image: "",
            technologies: [],
            textContent: "New projects in the works. Stay tuned!",
        },
        {
            title: "Project One",
            image: "/images/mockup11.png",
            technologies: ["Next.js", "GSAP", "Tailwind CSS"],
        },
        {
            title: "Project Two",
            image: "/images/mockup22.png",
            technologies: ["React", "Node.js", "MongoDB"],
        },
        {
            title: "Project Three",
            image: "/images/mockup33.png",
            technologies: ["Vue.js", "Nuxt.js", "SASS"],
        },
    ];

    useGSAP(() => {
        const childSplit = new SplitText(".works-header", { type: "lines" });
        const parentSplit = new SplitText(".works-header", { type: "lines", linesClass: "line-wrapper overflow-hidden" });


        // Custom Ease for animation
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const lines = childSplit.lines;

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

        // Apply animation when the text comes into view
        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateText(lines); // Animate text when header section is visible
                        headerObserver.disconnect(); // Stop observing once the animation triggers
                    }
                });
            },
            {
                threshold: 0.01,
            }
        );

        if (headerRef.current) headerObserver.observe(headerRef.current);

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const animateImage = (element: HTMLElement) => {
            const image = element.querySelector(".work-image");
            const technologies = element.querySelector(".technologies");

            if (image && technologies) {
                const tl = gsap.timeline();

                tl.fromTo(
                    image,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "customEase" }
                )
                    .fromTo(
                        technologies,
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "customEase" },
                        "-=0.5"
                    );
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateImage(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                }
            });
        });

        imageRef.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section id="works" className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {works.map((work, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl shadow-xl"
                        ref={el => {
                            if (imageRef.current) imageRef.current[index] = el;
                        }}
                    >
                        {work.textContent ? (
                            <div className="relative flex justify-center items-center h-full bg-white rounded-xl p-4">
                                <p
                                    className="works-header text-xl md:text-2xl text-center font-NeueMontrealVariable"
                                    ref={headerRef}
                                >
                                    {work.textContent}
                                </p>
                            </div>
                        ) : (
                            <div className="relative overflow-hidden work-image"
                                 onMouseEnter={() => handleMouseEnter(index)}
                                 onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    layout="responsive"
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-auto rounded-xl"
                                    ref={el => {
                                        if (imageElementRef.current) imageElementRef.current[index] = el;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-100 rounded-xl"></div>
                                <div className="absolute bottom-0 flex flex-row p-4 text-hexwhite rounded-b-xl technologies opacity-0">
                                    <div className="flex flex-wrap gap-2">
                                        {work.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="font-NeueMontrealVariable text-sm lg:text-base text-white border border-hexwhite rounded-md py-1 px-3"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <WorksModal modal={modal} />
        </section>
    );
}
