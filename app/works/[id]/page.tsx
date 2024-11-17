"use client";
import { projects } from '@/app/data/worksData';
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Contact from "@/app/sections/Contact/Contact";
import WorksDetailModal from "@/app/sections/Works/WorksDetailModal/WorksDetailModal";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from 'gsap/CustomEase';
import { gsap } from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase);

export const dynamic = 'force-dynamic';

interface ModalState {
    active: boolean;
    index: number;
}

const WorkDetailPage = ({ params }) => {
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Dodany stan dla indeksu aktualnego zdjęcia
    const { id } = params;
    const project = projects.find((project) => project.id === id);
    if (!project) {
        return <h2>Project not found</h2>;
    }

    const techRefs = useRef<React.RefObject<HTMLLIElement>[]>(project.technologies.map(() => React.createRef<HTMLLIElement>()));
    const roleRefs = useRef<React.RefObject<HTMLLIElement>[]>(project.roles.map(() => React.createRef<HTMLLIElement>()));
    const descRefs = useRef<React.RefObject<HTMLParagraphElement>[]>(project.description.map(() => React.createRef<HTMLParagraphElement>()));
    const chalRefs = useRef<React.RefObject<HTMLLIElement>[]>(project.challengesAndSolutions.map(() => React.createRef<HTMLLIElement>()));

    const sectionRef = useRef(null);
    const linkRef = useRef(null);
    const imageRef = useRef(null);
    const headerRef = useRef(null);

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

    useGSAP(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const initializeSplitText = () => {
            const sectionElement = sectionRef.current;

            if (!sectionElement) return;

            const animateAllElements = () => {
                // Animacja tytułu
                if (headerRef.current) {
                    const titleSplit = new SplitText(headerRef.current, { type: "lines" });
                    new SplitText(headerRef.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                    animateText(titleSplit.lines);
                }

                // Animacja linku
                if (linkRef.current) {
                    const linkSplit = new SplitText(linkRef.current, { type: "lines" });
                    new SplitText(linkRef.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                    animateText(linkSplit.lines);
                }

                // Animacja techRefs
                techRefs.current.forEach(ref => {
                    if (ref.current) {
                        const split = new SplitText(ref.current, { type: "lines" });
                        new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                        animateText(split.lines);
                    }
                });

                // Animacja roleRefs
                roleRefs.current.forEach(ref => {
                    if (ref.current) {
                        const split = new SplitText(ref.current, { type: "lines" });
                        new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                        animateText(split.lines);
                    }
                });

                // Animacja descRefs
                descRefs.current.forEach(ref => {
                    if (ref.current) {
                        const descSplit = new SplitText(ref.current, { type: "lines" });
                        new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                        animateText(descSplit.lines);
                    }
                });

                // Animacja chalRefs
                chalRefs.current.forEach(ref => {
                    if (ref.current) {
                        const split = new SplitText(ref.current, { type: "lines" });
                        new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                        animateText(split.lines);
                    }
                });

                // Animacja obrazu
                if (imageRef.current) {
                    animateImage();
                }
            };

            // Tworzenie IntersectionObserver dla sekcji
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateAllElements();
                        observer.disconnect(); // Odłączenie obserwatora po uruchomieniu animacji
                    }
                });
            }, { threshold: 0.1 }); // Procent widoczności sekcji wymagany do uruchomienia

            observer.observe(sectionElement);
        };

        // Czekaj na załadowanie czcionek i inicjalizuj animacje
        const handleFontLoad = async () => {
            if (document.fonts) {
                await document.fonts.ready;
                setTimeout(() => {
                    initializeSplitText();
                }, 200);
            }
        };

        handleFontLoad();

        return () => {
            // Cleanup observer (jeśli istnieje)
        };
    }, []);


    const handleMouseEnter = (index: number) => {
        setModal({ active: true, index });
    };

    const handleMouseLeave = (index: number) => {
        setModal({ active: false, index });
    };

    return (
        <div className="w-screen bg-hexwhite font-NeueMontrealVariable">
            {/* Header Section */}
            <div className=" w-full p-4">
                <div className="h-full w-full bg-white rounded-xl p-4 flex justify-start items-end">
                    <h2
                        ref={headerRef}
                        className="font-NeueMontrealVariable font-semibold text-fluid uppercase leading-none text-hexblack header-split"
                    >
                        {project.title}
                    </h2>
                </div>
            </div>

            {/* Main Content Section */}
            <div ref={sectionRef} className="w-full px-4 mb-4 text-hexblack">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:flex md:flex-col xl:grid xl:grid-cols-3 xl:gap-4">
                        <div className="xl:col-span-2 w-full mb-4">
                            <div
                                className="rounded-xl overflow-hidden"
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={() => handleMouseLeave(0)}
                            >
                                {/* Główne zdjęcie */}
                                <Image
                                    ref={imageRef}
                                    src={project.images[currentImageIndex]}
                                    alt={project.title}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                />
                            </div>
                            {/* Pasek miniatur */}
                            <div className="flex mt-4 space-x-2">
                                {[...project.images, ...new Array(3 - project.images.length).fill(null)].map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => img && setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-hexblack" : ""}`}
                                        style={{ width: `calc(33.333% - 6px)` }}
                                    >
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={`${project.title} thumbnail ${index + 1}`}
                                                layout="responsive"
                                                width={100}
                                                height={100}
                                            />
                                        ) : (

                                            <div className="w-full h-0" style={{ paddingTop: '56.25%' }} />
                                        )}
                                    </button>
                                ))}
                            </div>


                        </div>
                        <div className="relative xl:col-span-1 grid grid-cols-1">
                            {/* Technologies and Roles */}
                            <div className="col-span-2">
                                <div className="grid grid-cols-2 mb-4 rounded-xl bg-white">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 tech-split">Technologies:</h3>
                                        <ul className="list-disc ml-4">
                                            {project.technologies.map((tech, index) => (
                                                <li ref={techRefs.current[index]} key={index}
                                                    className="text-base tech-split">
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 role-split">Roles:</h3>
                                        <ul className="list-disc ml-4">
                                            {project.roles.map((role, index) => (
                                                <li ref={roleRefs.current[index]} key={index}
                                                    className="text-base tech-split">
                                                    {role}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                                <div className="bg-white rounded-xl mb-0 md:mb-4 xl:mb-0 p-4">
                                    <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 desc-split">Description:</h3>
                                    {project.description?.map((desc, index) => (
                                        <p ref={descRefs.current[index]} key={index}
                                           className="text-base mb-2 desc-split">{desc}</p>
                                    ))}
                                </div>
                                <div>
                                    <div className="bg-white p-4 rounded-xl">
                                        <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 chal-split">Challenges
                                            & Solutions:</h3>
                                        <ul className="list-disc ml-4">
                                            {project.challengesAndSolutions.map((item, index) => (
                                                <li ref={chalRefs.current[index]} key={index}
                                                    className="text-base mb-2 chal-split">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl hidden md:block xl:hidden mt-4">
                                        <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 link-split">Links:</h3>
                                        <div className="flex flex-row">
                                            <div className="flex-grow">
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-hexblack font-semibold flex items-center hover:underline link-split"
                                                >
                                                    Live Project
                                                </a>
                                            </div>
                                            <div className="flex-grow">
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-hexblack font-semibold flex items-center hover:underline link-split"
                                                >

                                                    GitHub Link
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl block md:hidden xl:block">
                                    <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 link-split">Links:</h3>
                                    <div className="flex flex-row" ref={linkRef}>
                                        <div className="flex-grow ">
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-hexblack font-semibold flex items-center hover:underline link-split"
                                            >

                                                Live Project
                                            </a>
                                        </div>
                                        <div className="flex-grow ml-12 md:ml-24">
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-hexblack font-semibold flex items-center hover:underline link-split"
                                            >

                                                GitHub Link
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WorksDetailModal modal={modal}/>
            <Contact/>
        </div>

    );
};

export default WorkDetailPage;
