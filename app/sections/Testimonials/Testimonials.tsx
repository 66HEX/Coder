import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Marquee from "@/app/components/Marquee/Marquee";

gsap.registerPlugin(SplitText, CustomEase);

export default function Testimonials() {
    const headerRef = useRef<HTMLHeadingElement | null>(null);



    useEffect(() => {
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const childSplit = new SplitText(".works-title", {
            type: "lines",
        });

        const parentSplit = new SplitText(".works-title", {
            type: "lines",
            linesClass: "line-wrapper overflow-hidden",
        });

        const title = childSplit.lines;

        const animateHeader = () => {
            gsap.fromTo(
                title,
                { y: "100%", scale: 1, x: 0 },
                {
                    y: "0%",
                    duration: 1,
                    ease: "customEase",
                    onComplete: () => {
                        gsap.delayedCall(0, () => {
                            gsap.to(title, {
                                scale: 0.75,
                                x: "-12.5%",
                                duration: 0.75,
                                ease: "customEase"
                            });
                        });
                    }
                }
            );
        };

        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateHeader();
                        headerObserver.disconnect();
                    }
                });
            },
        );


        if (headerRef.current) headerObserver.observe(headerRef.current);

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    return (
        <section id="testimonials" className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center">
            <Marquee/>
        </section>
    );
}
