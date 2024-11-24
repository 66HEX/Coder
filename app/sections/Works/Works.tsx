"use client"
import Image from "next/image";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import WorksModal from '@/app/sections/Works/WorksModal/WorksModal';
import { CustomEase } from "gsap/CustomEase";
import { projects } from '@/app/data/worksData';

gsap.registerPlugin(CustomEase);

interface ModalState {
    active: boolean;
    index: number;
}

export default function Works() {
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
    const imageRef = useRef<(HTMLDivElement | null)[]>([]);

    CustomEase.create("customEase", "0.76,0,0.24,1");

    const handleMouseEnter = (index: number) => {
        setModal({ active: true, index });
    };

    const handleMouseLeave = (index: number) => {
        setModal({ active: false, index });
    };

    const handleClick = (liveLink: string) => {
        window.open(liveLink, "_blank");
    };

    return (
        <section id="works" className="w-screen text-textPrimary px-4 pb-4 flex flex-col justify-center items-center font-NeueMontrealVariable">
            <div className="flex flex-col gap-4 w-full">
                {projects.map((work, index) => (
                    <div key={index} className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-y-4 gap-x-0 md:gap-x-4">
                        <div
                            className="relative overflow-hidden rounded-cardRadius bg-card shadow-cardShadow p-4 flex flex-col justify-start items-start col-span-2"
                            ref={el => {
                                if (imageRef.current) imageRef.current[index] = el;
                            }}
                        >
                            <div className="text-hexblack">
                                <p className="uppercase text-sm xl:text-base bg-textPrimary text-card px-4 py-1 rounded-full font-semibold mb-4">{work.title}</p>
                            </div>
                            <div
                                className="relative overflow-hidden work-image cursor-pointer rounded-cardRadius"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => handleClick(work.liveLink)}
                            >
                                <Image
                                    src={work.images[0]}
                                    alt={work.title}
                                    layout="responsive"
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-auto"
                                />
                            </div>
                        </div>
                        <div
                            className="col-span-1 md:col-span-2 xl:col-span-1 inline-flex flex-col items-start p-4 bg-card shadow-cardShadow rounded-cardRadius">
                            <p className="uppercase text-sm xl:text-base border-2 border-textPrimary text-textPrimary px-4 py-1 rounded-full font-semibold inline">
                                Description
                            </p>
                            {work.description && work.description.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4">{desc}</p>
                            ))}
                            <p className="uppercase text-sm xl:text-base border-2 border-textPrimary text-textPrimary px-4 py-1 rounded-full font-semibold inline mt-8">
                                Challenges
                            </p>
                            {work.challenge && work.challenge.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4">{desc}</p>
                            ))}
                            <p className="uppercase text-sm xl:text-base border-2 border-textPrimary text-textPrimary px-4 py-1 rounded-full font-semibold inline mt-8">
                                Solutions
                            </p>
                            {work.solution && work.solution.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4">{desc}</p>
                            ))}
                            <button
                                onClick={() => handleClick(work.liveLink)}
                                className="uppercase text-xl xl:text-2xl bg-textPrimary hover:bg-transparent text-card border-2 hover:border-textPrimary hover:text-textPrimary transition duration-300 px-4 py-1 rounded-full font-semibold w-full mt-8">
                                Live Demo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <WorksModal modal={modal}/>
        </section>
    );
}
