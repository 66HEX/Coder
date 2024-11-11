import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(CustomEase);

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
    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        const lightbox = lightboxRef.current;
        const insetBackground = insetBackgroundRef.current;

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
                    { opacity: 1 , duration: 0.1, ease: "customEase" },
                    1
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
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === project.images.length - 1 ? 0 : prevIndex + 1));
    };

    if (!active) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-30 font-NeueMontrealVariable"
            onClick={handleClickClose} // Handle click on background
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image section */}
                    <div className="w-full h-full flex justify-center items-center rounded-xl shadow-xl overflow-hidden relative">
                        <Image
                            src={project.images[currentImageIndex]}
                            alt={`${project.title} image ${currentImageIndex + 1}`}
                            layout="responsive"
                            width={400}
                            height={300}
                        />
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

                    {/* Project details section */}
                    <div className="flex flex-col justify-start items-start space-y-4 bg-white rounded-xl shadow-xl p-4">
                        <h2 className="text-xl md:text-2xl font-NeueMontrealVariable font-semibold uppercase">{project.title}</h2>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="text-base bg-hexgray text-white px-2 py-1 rounded-md">
                                {tech}
                            </span>
                            ))}
                        </div>

                        {/* Roles */}
                        <div className="text-base">
                            <h3 className="font-semibold text-lg">Roles:</h3>
                            <ul>
                                {project.roles.map((role, index) => (
                                    <li key={index} className="mb-2">{role}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Description */}
                        <div className="text-base">
                            <h3 className="font-semibold text-lg">Description:</h3>
                            {project.description?.map((desc, index) => (
                                <p key={index} className="mb-4">{desc}</p>
                            ))}
                        </div>

                        {/* Challenges & Solutions */}
                        <div className="text-base">
                            <h3 className="font-semibold text-lg">Challenges & Solutions:</h3>
                            <ul>
                                {project.challengesAndSolutions.map((item, index) => (
                                    <li key={index} className="mb-2">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Live Project Link */}
                        <div>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-hexblack font-semibold flex items-center"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                                Live Project
                            </a>
                        </div>


                    </div>
                </div>
            </div>

            {/* Background title section */}
            <div className="fixed inset-0 w-full h-full bg-hexblack flex justify-start items-end p-4" ref={insetBackgroundRef}>
                <h1 className="font-NeueMontrealVariable text-hexgray font-semibold text-fluid uppercase leading-none">{project.title}</h1>
            </div>
        </div>
    );

};

export default Lightbox;
