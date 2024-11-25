import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { CustomEase } from "gsap/CustomEase";
import { aboutData } from '@/app/data/aboutData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin( CustomEase );

export default function About() {
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const accordionContentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => setScreenWidth(window.innerWidth);
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    CustomEase.create("customEase", "0.76,0,0.24,1");

    useEffect(() => {
        accordionContentRefs.current.forEach((contentRef, index) => {
            if (contentRef) {
                const height = screenWidth < 768
                    ? '100px' // sm:
                    : screenWidth >= 1280
                        ? '65px' // xl:
                        : screenWidth >= 1024
                            ? '85px' // lg:
                            : '100px'; // md:


                if (isOpen === index) {
                    gsap.to(contentRef, {
                        duration: 0.5,
                        height: height,
                        opacity: 1,
                        ease: 'customEase',
                    });
                    gsap.to(buttonRefs.current[index], {
                        duration: 0.3,
                        rotation: 90,
                    });
                } else {
                    gsap.to(contentRef, {
                        duration: 0.5,
                        height: 0,
                        opacity: 0,
                        ease: 'customEase',
                    });
                    gsap.to(buttonRefs.current[index], {
                        duration: 0.3,
                        rotation: 0,
                    });
                }
            }
        });
    }, [isOpen, screenWidth]);

    return (
        <section
            id="about"
            className="w-screen text-textPrimary px-4 pb-4 flex flex-col justify-center items-center font-AeonikProRegular"
        >
            <div className="w-full grid md:grid-cols-4 xl:grid-cols-3 gap-4">
                <div className="col-span-3 md:col-span-2 order-2 md:order-1 grid md:grid-rows-2 gap-4">
                    <div className="row-span-1 grid grid-cols-3 gap-4">
                        <div
                            className="bg-card shadow-cardShadow col-span-3 xl:col-span-2 p-4 rounded-cardRadius relative flex flex-col justify-start items-start gap-4">
                            <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold">about</p>
                            <p className="text-xl xl:text-2xl">
                                I’m Marek Jóźwiak, a digital artisan based in Poland, where imagination meets precision
                                to shape captivating, functional web experiences. I breathe life into every pixel,
                                constantly pushing the boundaries of design and technology, forever innovating to craft
                                digital journeys that enchant and endure.
                            </p>
                        </div>
                        <div
                            className="bg-card shadow-cardShadow col-span-3 xl:col-span-1 p-4 rounded-cardRadius flex flex-col justify-start items-start relative overflow-hidden gap-4">
                            <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold">Availability</p>

                            <div>
                                <p className="text-xl xl:text-2xl">I’m available for freelance projects and excited to
                                    take on new challenges.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row-span-1 grid grid-cols-3 gap-4">
                        <div
                            className="bg-card shadow-cardShadow col-span-3 xl:col-span-1 p-4 rounded-cardRadius flex flex-col justify-between items-start gap-4 order-2 md:order-1 relative overflow-hidden"
                        >
                            <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold">
                                socials
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/hexthecoder/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-6xl text-textPrimary"
                                    aria-label="Visit Instagram profile"
                                >
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-6xl text-textPrimary"
                                    aria-label="Visit LinkedIn profile"
                                >
                                    <FontAwesomeIcon icon={faLinkedin}/>
                                </a>
                                <a
                                    href="https://github.com/66HEX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-6xl text-textPrimary"
                                    aria-label="Visit GitHub profile"
                                >
                                    <FontAwesomeIcon icon={faGithub}/>
                                </a>
                            </div>
                        </div>

                        <div
                            className="bg-card shadow-cardShadow col-span-3 xl:col-span-2 p-4 rounded-cardRadius flex flex-col justify-between items-start gap-4 md:gap-0 order-1 md:order-2">
                            <div>
                                <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold">Services</p>
                            </div>
                            <div className="w-full">
                                {aboutData.map((service, index) => (
                                    <div key={index} className="service-item">
                                        <div className="flex justify-between items-center cursor-pointer"
                                             onClick={() => setIsOpen(isOpen === index ? null : index)}>
                                            <p className="text-xl xl:text-2xl">{service.title}</p>
                                            <button
                                                ref={(el) => {
                                                    buttonRefs.current[index] = el;
                                                }}
                                                className="text-xl xl:text-2xl transform transition duration-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <hr className="my-2 border-textSecondary"/>
                                        <div
                                            ref={(el) => {
                                                accordionContentRefs.current[index] = el;
                                            }}
                                            className="overflow-hidden transition-all duration-500"
                                            style={{height: 0, opacity: 0}}
                                        >
                                            <p className="mt-2 text-base text-textSecondary">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="shadow-cardShadow col-span-3 md:col-span-2 xl:col-span-1 order-1 md:order-2 rounded-cardRadius overflow-hidden relative">
                    <Image
                        src="/images/about-photo.png"
                        alt="Profile photo"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
