import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(SplitText, CustomEase);

interface LightboxProps {
    active: boolean;
    project: {
        title: string;
        images: string[];
        technologies: string[];
        description?: string[];
        roles?: string[];
        challengesAndSolutions?: string[];
        liveLink?: string;
    };
    closeLightbox: () => void;
}


const Lightbox: React.FC<LightboxProps> = ({ active, project, closeLightbox }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
    const lightboxRef = useRef<HTMLDivElement | null>(null);
    const insetBackgroundRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);
    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        const lightbox = lightboxRef.current;
        const insetBackground = insetBackgroundRef.current;
        const childSplit = new SplitText(".lightbox-text", { type: "lines" });
        const parentSplit = new SplitText(".lightbox-text", { type: "lines", linesClass: "line-wrapper overflow-hidden" });
        const lines = childSplit.lines;

        if (active) {
            if (lightbox && insetBackground) {
                const tl = gsap.timeline();
                tl.fromTo(
                    insetBackground,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "customEase" },

                );
                tl.fromTo(
                    insetBackground,
                    { clipPath: "inset(0% 0% 0% 0%)" },
                    { clipPath: "inset(100% 0% 0% 0%)", duration: 1, ease: "customEase" },1.5
                );

                tl.fromTo(
                    lightbox,
                    { opacity: 0 },
                    { opacity: 1 , duration: 0.1, ease: "customEase" }, 1
                );
                tl.fromTo(
                    imageContainerRef.current,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "customEase",},2
                );
                tl.fromTo(
                    lines,
                    { y: "100%" },
                    { y: "0%", duration: 1, ease: "customEase"},2
                );

            }
        } else {
            if (lightbox && insetBackground) {
                const tl = gsap.timeline();
                tl.fromTo(
                    insetBackground,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5, ease: "customEase", onComplete: closeLightboxAfterAnimation }
                );
                tl.fromTo(
                    lightbox,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5, ease: "customEase" },
                );
            }
        }
    }, [active]);

    const closeLightboxAfterAnimation = () => {
        closeLightbox();
    };

    const handleClickClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (active) {
            const timeline = gsap.timeline({
                defaults: {
                    duration: 3,
                    ease: "customEase",
                },
                onComplete: closeLightboxAfterAnimation,
            });

            timeline
                .fromTo(
                    lightboxRef.current,
                    { clipPath: "inset(0% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "customEase" }
                )
                .fromTo(
                    insetBackgroundRef.current,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "customEase" },0
                )
                .fromTo(
                    insetBackgroundRef.current,
                    { clipPath: "inset(0% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "customEase" },1.5
                );

        }
    };

    const goToPreviousImage = () => {
        const previousIndex = currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;

        // Animacja wyjścia aktualnego obrazka w prawo
        gsap.to(imageRef.current, {
            x: '100%', // Current image moves to the right
            duration: 0.5,
            ease: "customEase",
            onComplete: () => {
                // Update the current image index and set the new image
                setCurrentImageIndex(previousIndex); // You may need to update this depending on your state handling

                // Reset position of the new image (entering from the left)
                gsap.set(imageRef.current, { x: '-100%' });

                // Animacja wejścia nowego obrazka z lewej
                gsap.to(imageRef.current, {
                    x: '0%', // New image moves to its original position
                    duration: 0.5,
                    ease: "customEase",
                });
            }
        });
    };


    const goToNextImage = () => {
        const nextIndex = currentImageIndex === project.images.length - 1 ? 0 : currentImageIndex + 1;

        // Animacja wyjścia aktualnego obrazka w lewo
        gsap.to(imageRef.current, {
            x: '-100%',
            duration: 0.5,
            ease: "customEase",
            onComplete: () => {
                setCurrentImageIndex(nextIndex); // Zmień obrazek po zakończeniu animacji wyjścia

                // Animacja wchodzenia nowego obrazka z prawej
                gsap.fromTo(imageRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: "customEase" });
            },
        });
    };

    if (!active) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-30 font-NeueMontrealVariable"
            onClick={handleClickClose}
        >
            <div
                className="relative bg-hexwhite p-4 w-full h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                ref={lightboxRef}
            >
                <div className="w-full flex justify-start pb-4 ml-2">
                    <button
                        className="group text-base font-semibold uppercase"
                        onClick={handleClickClose}
                    >
                        back
                        <span
                            className="relative before:content-[''] before:absolute before:left-[-56px] before:top-1/2 before:-translate-y-3/4 before:w-2 before:h-2 before:rounded-full before:transition-opacity before:duration-300 before:border-2 before:border-hexblack before:opacity-0 group-hover:before:opacity-100"
                        ></span>
                    </button>
                </div>

                <div className="grid grid-cols-1  gap-4 md:flex md:flex-col xl:grid xl:grid-cols-2">
                    <div
                        className="w-full h-full col-span-1">
                        <div className="overflow-hidden bg-white relative rounded-xl mb-4">
                            <div ref={imageRef}>
                                <Image
                                    src={project.images[currentImageIndex]}
                                    alt={`${project.title} image ${currentImageIndex + 1}`}
                                    layout="responsive"
                                    width={400}
                                    height={300}
                                />
                            </div>
                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-hexblack text-3xl"
                                onClick={goToPreviousImage}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} className="text-hexblack"/>
                            </button>
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-hexblack text-3xl"
                                onClick={goToNextImage}
                            >
                                <FontAwesomeIcon icon={faChevronRight} className="text-hexblack"/>
                            </button>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 bg-white p-4 rounded-xl">
                            <div className="col-span-2 md:col-span-1">
                                {/* Project Title */}
                                <div className="text-xl md:text-2xl font-NeueMontrealVariable font-semibold uppercase mb-4">
                                    {project.title}
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <h3 className="font-semibold text-lg mb-2">Links:</h3>
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-hexblack font-semibold flex items-center hover:underline"
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2"/>
                                    Live Project
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="col-span-2 bg-white p-4 rounded-xl relative">
                            {/* Grid container for Technologies and Roles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Technologies Section */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Technologies:</h3>
                                    <ul className="list-disc ml-4">
                                        {project.technologies.map((tech, index) => (
                                            <li key={index} className="text-base mb-2">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Roles:</h3>
                                    <ul className="list-disc ml-4">
                                        {project.roles.map((role, index) => (
                                            <li key={index} className="text-base mb-2">
                                                {role}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-2 bg-white p-4 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Description:</h3>
                                {project.description?.map((desc, index) => (
                                    <p key={index} className="text-base mb-2">
                                        {desc}
                                    </p>
                                ))}
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2 mt-4">Challenges & Solutions:</h3>
                                <ul className="list-disc ml-4">
                                    {project.challengesAndSolutions.map((item, index) => (
                                        <li key={index} className="text-base mb-2">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 w-full h-full bg-hexblack flex justify-start items-end p-4"
                 ref={insetBackgroundRef}>
                <h1 className="font-NeueMontrealVariable text-hexgray font-semibold text-fluid uppercase leading-none">{project.title}</h1>
            </div>
        </div>
    );

};

export default Lightbox;
