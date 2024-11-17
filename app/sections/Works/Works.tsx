"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import WorksModal from '@/app/sections/Works/WorksModal/WorksModal';
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { projects } from '@/app/data/worksData';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(SplitText, CustomEase);

interface ModalState {
    active: boolean;
    index: number;
}

export default function Works() {
    const router = useRouter();
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
    const imageRef = useRef<(HTMLDivElement | null)[]>([]);
    const imageElementRef = useRef<(HTMLImageElement | null)[]>([]);

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

    const handleClick = (id: string) => {
        router.push(`/works/${id}`);
    };


    return (
        <section id="works" className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {projects.map((work, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl"
                        ref={el => {
                            if (imageRef.current) imageRef.current[index] = el;
                        }}
                    >
                            <div className="relative overflow-hidden work-image cursor-pointer"
                                 onMouseEnter={() => handleMouseEnter(index)}
                                 onMouseLeave={() => handleMouseLeave(index)}
                                 onClick={() => handleClick(work.id)}
                            >
                                <Image
                                    src={work.images[0]}
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
                                <div className="absolute bottom-0 flex flex-row p-4 text-hexwhite rounded-b-xl technologies">
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
                    </div>
                ))}
            </div>
            <WorksModal modal={modal} />
        </section>
    );
}