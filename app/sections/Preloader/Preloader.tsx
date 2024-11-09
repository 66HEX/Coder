import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';
import { useRef, useState } from "react";
import { SplitText } from "@/app/utils/gsap/SplitText";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase);

export default function Preloader({ onComplete, isAnimationTriggered }) {
    const [isVisible, setIsVisible] = useState(true);
    const sectionRef = useRef(null);

    useGSAP(() => {
        if (!isAnimationTriggered || !isVisible) return;

        const section = sectionRef.current;
        CustomEase.create("customEase", "0.76,0,0.24,1");

        const animateSection = () => {
            const nameSplit = new SplitText(".preloader-name", { type: "lines" });
            const surnameSplit = new SplitText(".preloader-surname", { type: "lines" });

            new SplitText(".preloader-name, .preloader-surname", {
                type: "lines",
                linesClass: "line-wrapper overflow-hidden",
            });

            gsap.set(".preloader-name", { visibility: 'visible' });
            gsap.set(".preloader-surname", { visibility: 'visible' });

            const timeline = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    onComplete();
                }
            });

            timeline.fromTo(
                nameSplit.lines,
                { y: "100%" },
                { y: "0%", autoAlpha: 1, duration: 1, ease: "customEase" }
            );
            timeline.fromTo(
                surnameSplit.lines,
                { y: "100%" },
                { y: "0%", duration: 1, ease: "customEase" }, 0
            );
            timeline.to({}, { duration: 1 });
            timeline.fromTo(
                nameSplit.lines,
                { y: "0%" },
                { y: "-100%", duration: 1, ease: "customEase" }, 1
            );
            timeline.fromTo(
                surnameSplit.lines,
                { y: "0%" },
                { y: "-100%", duration: 1, ease: "customEase" }, 1
            );

            return () => {
                nameSplit.revert();
                surnameSplit.revert();
            };
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSection();
                        observer.disconnect();
                    }
                });
            },
        );

        if (section) {
            observer.observe(section);
        }

        return () => {
            observer.disconnect();
        };
    }, [isVisible, isAnimationTriggered, onComplete]);

    if (!isVisible) return null;

    return (
        <section
            ref={sectionRef}
            id="preloader"
            className="fixed top-0 left-0 h-svh w-screen p-4 bg-hexwhite flex flex-col justify-center items-center overflow-hidden z-30"
        >
            <div className="text-hexwhite bg-hexblack w-full rounded-xl p-4 h-full flex flex-col items-start justify-center">
                <h2 className="preloader-name font-NeueMontreal font-semibold text-fluid uppercase leading-none text-left" style={{visibility: 'hidden'}}>
                    marek
                </h2>
                <h2 className="preloader-surname font-NeueMontreal font-semibold text-fluid uppercase leading-none text-left" style={{visibility: 'hidden'}}>
                    jóźwiak
                </h2>
            </div>
        </section>
    );
}
