import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(CustomEase);

export default function Counter({ onComplete }) {
    const rectangleRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) return; // Skip animation if not visible
        CustomEase.create("customEase", "0.76,0,0.24,1");

        // Timeline do animacji
        const timeline = gsap.timeline({
            onComplete: () => {
                setIsVisible(false);
                onComplete();
            }
        });

        // Animacja skalowania div-a o klasie hexblack
        timeline.fromTo(
            rectangleRef.current,
            { scale: 0 },
            { scale: 1, duration: 1.5, ease: "customEase" }
        );

        return () => {
            timeline.kill();
        };
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <section
            className="fixed top-0 left-0 p-4 h-screen w-svh flex justify-center items-center overflow-hidden z-40">
            <div className="w-full h-12 bg-hexwhite"></div>
            <div className="w-full h-[calc(100vh-5rem)] bg-hexblack rounded-xl flex justify-center items-center"
                 ref={rectangleRef}

                 style={{
                     position: "absolute",
                     width: "100%", // Możesz dostosować szerokość
                     height: "100%", // Możesz dostosować wysokość
                     backgroundColor: "#1C1C1C",
                     zIndex: 10,
                 }}
            >

            </div>
        </section>
    );
}
