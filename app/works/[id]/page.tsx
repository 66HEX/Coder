"use client";
import { projects } from '@/app/data/worksData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Contact from "@/app/sections/Contact/Contact";
import WorksDetailModal from "@/app/sections/Works/WorksDetailModal/WorksDetailModal";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from 'gsap/CustomEase';
import { gsap } from "gsap";

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

    // Refs for the elements to animate
    const techRefs = useRef<React.RefObject<HTMLParagraphElement>[]>(project.technologies.map(() => React.createRef<HTMLParagraphElement>()));
    const roleRefs = useRef<React.RefObject<HTMLParagraphElement>[]>(project.roles.map(() => React.createRef<HTMLParagraphElement>()));
    const descRefs = useRef<React.RefObject<HTMLParagraphElement>[]>(project.description.map(() => React.createRef<HTMLParagraphElement>()));
    const chalRefs = useRef<React.RefObject<HTMLLIElement>[]>(project.challengesAndSolutions.map(() => React.createRef<HTMLLIElement>()));
    const linkRef = useRef<HTMLAnchorElement>(null);
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

    useEffect(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const initializeSplitText = () => {
            const titleElement = headerRef.current;
            const linkElement = linkRef.current;

            if (titleElement) {
                const titleSplit = new SplitText(titleElement, { type: "lines" });
                const parentSplit = new SplitText(titleElement, { type: "lines", linesClass: "line-wrapper overflow-hidden" });

                const titleLines = titleSplit.lines;
                const titleObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(titleLines);
                            titleObserver.disconnect();
                        }
                    });
                }, { threshold: 0.01 });
                titleObserver.observe(titleElement);
            }

            if (linkElement) {
                const linkSplit = new SplitText(titleElement, { type: "lines" });
                const parentSplit = new SplitText(titleElement, { type: "lines", linesClass: "line-wrapper overflow-hidden" });

                const linkLines = linkSplit.lines;
                const linkObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateText(linkLines);
                            linkObserver.disconnect();
                        }
                    });
                }, { threshold: 0.01 });
                linkObserver.observe(titleElement);
            }

            techRefs.current.forEach(ref => {
                if (ref.current) {
                    const split = new SplitText(ref.current, { type: "lines" });
                    new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                    const lines = split.lines;

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                animateText(lines);
                                observer.disconnect();
                            }
                        });
                    }, { threshold: 0.01 });

                    observer.observe(ref.current);
                }
            });

            roleRefs.current.forEach(ref => {
                if (ref.current) {
                    const split = new SplitText(ref.current, { type: "lines" });
                    new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });
                    const lines = split.lines;

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                animateText(lines);
                                observer.disconnect();
                            }
                        });
                    }, { threshold: 0.01 });

                    observer.observe(ref.current);
                }
            });

            descRefs.current.forEach((ref, index) => {
                if (ref.current) {
                    const descSplit = new SplitText(ref.current, { type: "lines" });
                    new SplitText(ref.current, { type: "lines", linesClass: "line-wrapper overflow-hidden" });

                    const descLines = descSplit.lines;
                    const descObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                animateText(descLines);
                                descObserver.disconnect();
                            }
                        });
                    }, { threshold: 0.01 });
                    descObserver.observe(ref.current);
                }
            });

            chalRefs.current.forEach(ref => {
                if (ref.current) {
                    const split = new SplitText(ref.current, {type: "lines"});
                    new SplitText(ref.current, {type: "lines", linesClass: "line-wrapper overflow-hidden"});
                    const lines = split.lines;

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                animateText(lines);
                                observer.disconnect();
                            }
                        });
                    }, {threshold: 0.01});

                    observer.observe(ref.current);
                }
            });

            if (imageRef.current) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateImage();
                            imageObserver.disconnect();
                        }
                    });
                }, { threshold: 0.01 }); // Trigger when 20% of the image is in view
                imageObserver.observe(imageRef.current);
            }
        };


        // Wait for font load and initialize animations
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
            // Cleanup observers if needed
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
            <div className="h-screen w-full p-4">
                <div className="h-full w-full bg-hexblack rounded-xl p-4 flex justify-start items-end">
                    <h2
                        ref={headerRef}
                        className="font-NeueMontrealVariable font-semibold text-fluid uppercase leading-none text-hexgray header-split"
                    >
                        {project.title}
                    </h2>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="w-full px-4 mb-4">
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
                            <div className="flex mt-4 space-x-4">
                                {project.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={` rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-hexblack" : ""}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} thumbnail ${index + 1}`}
                                            layout="responsive"
                                            width={80}
                                            height={56}
                                        />
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
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2"/>
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
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2"/>
                                                    GitHub Link
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl block md:hidden xl:block">
                                    <h3 className="font-semibold text-lg md:text-2xl mb-2 md:mb-4 link-split">Links:</h3>
                                    <div className="flex flex-row">
                                        <div className="flex-grow" ref={linkRef}>
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-hexblack font-semibold flex items-center hover:underline link-split"
                                            >
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2"/>
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
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2"/>
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
