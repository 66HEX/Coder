import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { SplitText } from "@/app/utils/gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

interface TextWrapperProps {
    children: ReactNode;
    className?: string;
}

const AnimatedLink: React.FC<TextWrapperProps> = ({ children, className }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const copyRef = useRef<HTMLDivElement | null>(null);

    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const textElement = textRef.current;
        const copyElement = copyRef.current;

        const text = new SplitText(textElement, {
            type: 'lines',
            position: 'relative',
        });
        const copy = new SplitText(copyElement, {
            type: 'lines',
            position: 'relative',
        });

        const timeline = gsap.timeline({ paused: true });

        timeline.to(text.lines, {
            y: '-100%',
            rotationX: 90,
            opacity: 0,
            duration: 0.5,
            ease: 'customEase',
            stagger: 0.025,
        });

        timeline.to(copy.lines, {
            y: '-100%',
            rotationX: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.025,
            ease: 'customEase',
        }, 0);

        const handleMouseEnter = () => {
            timeline.play();
        };

        const handleMouseLeave = () => {
            timeline.reverse();
        };

        const parentElement = wrapper?.parentElement;
        if (parentElement) {
            parentElement.addEventListener('mouseenter', handleMouseEnter);
            parentElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (wrapper) {
                wrapper.removeEventListener('mouseenter', handleMouseEnter);
                wrapper.removeEventListener('mouseleave', handleMouseLeave);
            }
            text.revert();
        };
    }, [children]);

    return (
        <div
            ref={wrapperRef}
            className={`relative flex cursor-pointer ${className}`}
        >
            <div ref={textRef} className="inline-block">
                {children}
            </div>
            <div ref={copyRef} className="absolute top-0 left-0 inline-block"
                 style={{ transform: 'translateY(100%)' }}
            >
                {children}
            </div>
        </div>
    );
};

export default AnimatedLink;
