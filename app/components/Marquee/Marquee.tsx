'use client'
import { useScroll, useTransform, motion } from 'framer-motion';
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";
import Image from 'next/image';
import { useRef } from 'react';
import { testimonialsData } from '@/app/data/testimonialsData';

gsap.registerPlugin(CustomEase);


export default function Marquee() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    return (
        <main className="">
            <div className="" />
            <div ref={container} className="flex space-x-4">
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        {...testimonial}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </main>
    );
}

const TestimonialCard = ({ text, author, role, src, progress }) => {
    const translateX = useTransform(progress, [0, 1], [150, -150]);

    return (
        <motion.div style={{ x: translateX }} className="w-[400px] h-[300px] flex-shrink-0">
            <div className="relative flex flex-col justify-center items-center h-full border p-4 rounded-xl shadow-xl bg-white">

                <div className="text-center mb-auto">
                    <p className="text-xl md:text-2xl font-NeueMontrealVariable italic">"{text}"</p>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="relative h-[60px] w-[60px] rounded-md overflow-hidden mr-4">
                        <Image style={{ objectFit: "cover" }} src={src} alt={author} fill />
                    </div>
                    <div>
                        <p className="font-NeueMontrealVariable font-semibold text-base">{author}</p>
                        <p className="text-sm font-NeueMontrealVariable">{role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
