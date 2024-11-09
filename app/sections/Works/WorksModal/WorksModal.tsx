import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface ModalProps {
    modal: {
        active: boolean;
        index: number; // Retain this if it’s part of the ModalProps
    };
}

const scaleAnimation = {
    initial: { scale: 0.2, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0.2, x: "-50%", y: "-50%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
};

export default function WorksModal({ modal }: ModalProps) {
    const { active } = modal; // Remove index since it's not being used
    const modalContainer = useRef<HTMLDivElement>(null);
    const cursor = useRef<HTMLDivElement>(null);
    const cursorLabel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalContainer.current && cursor.current && cursorLabel.current) {
            const xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
            const yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
            const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
            const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e; // Use clientX and clientY for viewport-relative position
                xMoveCursor(clientX);
                yMoveCursor(clientY);
                xMoveCursorLabel(clientX);
                yMoveCursorLabel(clientY);
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [active]);

    return (
        <>
            <motion.div
                ref={modalContainer}
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                className="h-32 w-32 hidden lg:flex fixed overflow-hidden pointer-events-none items-center justify-center z-30" // Change to 'fixed'
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
            <motion.div
                ref={cursor}
                className="text-white w-32 h-32 rounded-full bg-hexblack bg-opacity-70 backdrop-blur-xl fixed z-40 hidden lg:flex items-center justify-center pointer-events-none" // Change to 'fixed'
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
            />
            <motion.div
                ref={cursorLabel}
                className={`bg-transparent font-NeueMontreal text-base text-hexwhite fixed z-50 hidden lg:flex items-center justify-center pointer-events-none ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} // Change to 'fixed'
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                style={{ transition: 'opacity 0.5s ease-in-out' }}
            >
                View &#8599;
            </motion.div>
        </>
    );
}
