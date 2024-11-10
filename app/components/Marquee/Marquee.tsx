'use client'
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(CustomEase);

// Placeholder images
import Picture1 from '@/public/images/about-photo22.png';
import Picture2 from '@/public/images/about-photo22.png';
import Picture3 from '@/public/images/about-photo22.png';
import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";

export default function Marquee() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const testimonialsData = [
        {
            text: "This product changed my life! Highly recommend to everyone.",
            author: "John Doe",
            role: "Product Manager",
            src: Picture1
        },
        {
            text: "Exceptional service and top quality. Truly satisfied!",
            author: "Jane Smith",
            role: "Marketing Specialist",
            src: Picture2
        },
        {
            text: "Outstanding experience, would definitely use again!",
            author: "Alice Brown",
            role: "UX Designer",
            src: Picture3
        },
        {
            text: "Outstanding experience, would definitely use again!",
            author: "Alice Brown",
            role: "UX Designer",
            src: Picture3
        },
        {
            text: "Outstanding experience, would definitely use again!",
            author: "Alice Brown",
            role: "UX Designer",
            src: Picture3
        }
    ];

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

                {/* Cytat na środku */}
                <div className="text-center mb-auto">
                    <p className="text-xl md:text-2xl font-NeueMontrealVariable italic">"{text}"</p>
                </div>

                {/* Zdjęcie i informacje o autorze w lewym dolnym rogu */}
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
