import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        const timeline = gsap.timeline({
            repeat: 0,
            onStart: () => {
                // Ensure that the progress bar starts at 0% width
                gsap.set(".progress-bar", { width: "0%" });
            },
            onComplete: onComplete,
        });

        timeline
            .to(".progress-bar", {
                opacity: 1,
                duration: 0.1,
                ease: "customEase",
            })
            .to(".progress-bar", {
                width: "25%",
                duration: 0.6,
                ease: "customEase",
            })
            .to(".numbers-container", {
                y: `-20%`,
                duration: 0.6,
                ease: "customEase",
            }, "<")
            .to(".progress-bar", {
                width: "50%",
                duration: 0.6,
                ease: "customEase",
            })
            .to(".numbers-container", {
                y: `-40%`,
                duration: 0.6,
                ease: "customEase",
            }, "<")
            .to(".progress-bar", {
                width: "75%",
                duration: 0.6,
                ease: "customEase",
            })
            .to(".numbers-container", {
                y: `-60%`,
                duration: 0.6,
                ease: "customEase",
            }, "<")
            .to(".progress-bar", {
                width: "100%",
                duration: 0.6,
                ease: "customEase",
            })
            .to(".numbers-container", {
                y: `-80%`,
                duration: 0.6,
                ease: "customEase",
            }, "<")
            .to(".progress-bar", {
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 0.6,
                ease: "customEase",
            })
            .to(".preloader", {
                opacity: 0,
                display: "none",
            });

    }, []);

    return (
        <div className="preloader fixed inset-0 bg-background z-50 flex items-end">
            <div
                className="progress-bar h-16 md:h-24 bg-black relative"
                style={{ width: "0%", opacity: 0, clipPath: "inset(0% 0% 0% 0%)"  }}
            >
                <div
                    className="absolute top-1/2 right-0 h-16 md:h-24 -translate-y-1/2 p-4 font-AeonikProRegular text-6xl md:text-8xl overflow-hidden text-card"
                >
                    <div className="numbers-container flex flex-col items-end justify-center">
                        <p className="number">0%</p>
                        <p className="number">25%</p>
                        <p className="number">50%</p>
                        <p className="number">75%</p>
                        <p className="number">100%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
