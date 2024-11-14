"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }) {
    return (
        <ReactLenis root options={{ lerp: 0.07, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;