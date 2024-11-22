'use client'
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import { testimonialsData } from '@/app/data/testimonialsData';
import horizontalLoop from '@/app/utils/HorizontalLoop';

gsap.registerPlugin(CustomEase, Observer);

export default function Marquee() {
    const container = useRef();

    useLayoutEffect(() => {
        const speed = 1;  // Speed of the loop
        document.fonts.ready.then(() => {
            const loop = horizontalLoop('.testimonial-card', {
                repeat: -1, // Infinite loop
                speed: speed,
                paddingRight: 16,
            });

            let tl;

            Observer.create({
                target: window,
                type: 'wheel',
                onChangeY: (self) => {
                    tl && tl.kill();
                    const factor = self.deltaY > 0 ? 1 : -1;
                    tl = gsap.timeline()
                        .to(loop, { timeScale: speed * factor, duration: 0.25 })
                        .to(loop, { timeScale: 1 * factor, duration: 1 });
                },
            });
        });
    }, []);

    return (
        <main>
            <div ref={container} className="testimonial-container flex space-x-4 overflow-hidden">
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        {...testimonial}
                    />
                ))}
            </div>
        </main>
    );
}

const TestimonialCard = ({ text, author, role, src }) => {
    return (
        <div className="testimonial-card w-[350px] md:w-[400px] h-[200px] xl:h-[250px] flex-shrink-0">
            <div className="relative flex flex-col justify-start items-start h-full p-4 rounded-lg bg-white">
                <div className="text-left mb-auto">
                    <p className="text-xl xl:text-2xl font-NeueMontrealVariable italic">"{text}"</p>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="relative h-[60px] w-[60px] rounded-md overflow-hidden mr-4">
                        <Image style={{ objectFit: "cover" }} src={src} alt={author} fill />
                    </div>
                    <div>
                        <p className="font-NeueMontrealVariable font-semibold text-base">{author}</p>
                        <p className="text-sm font-NeueMontrealVariable text-hexgray">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
