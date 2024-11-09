import Lenis from "@studio-freight/lenis";

// Define a type for global properties
type GlobalThisWithLenis = typeof globalThis & {
    lenis?: Lenis; // Optional lenis property
};

let lenisInstance: Lenis | null = null;

export const initializeLenis = () => {
    if (!lenisInstance) {
        lenisInstance = new Lenis({
            duration: 1.8,
            smoothWheel: true,
        });

        const raf: FrameRequestCallback = (time) => {
            lenisInstance!.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Use the newly defined type for globalThis
        (globalThis as GlobalThisWithLenis).lenis = lenisInstance;
    }
};

export const destroyLenis = () => {
    if (lenisInstance) {
        delete (globalThis as GlobalThisWithLenis).lenis; // Use the same type here
        lenisInstance = null;
    }
};
