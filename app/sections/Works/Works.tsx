import Image from "next/image";
import { projects } from '@/app/data/worksData';
import AnimatedLink from "@/app/components/AnimatedLink/AnimatedLink";

export default function Works() {

    const handleClick = (liveLink: string) => {
        window.open(liveLink, "_blank");
    };

    return (
        <section id="works" className="w-screen text-textPrimary px-4 pb-4 font-AeonikProRegular">
            <div className="flex flex-col gap-4 w-full">
                {projects.map((work, index) => (
                    <div key={index} className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-y-4 gap-x-0 md:gap-x-4">
                        <div
                            className="relative overflow-hidden rounded-cardRadius bg-card shadow-cardShadow p-4 flex flex-col justify-start items-start col-span-2"
                        >
                            <div className="text-hexblack">
                                <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold mb-4">{work.title}</p>
                            </div>
                            <div className="relative overflow-hidden rounded-cardRadius">
                                <Image
                                    src={work.images[0]}
                                    alt={work.title}
                                    layout="responsive"
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-auto"
                                />
                            </div>
                        </div>
                        <div
                            className="col-span-1 md:col-span-2 xl:col-span-1 inline-flex flex-col items-start p-4 bg-card shadow-cardShadow rounded-cardRadius">
                            <p className="uppercase text-sm xl:text-base border-2 border-accent text-accent px-4 py-1 rounded-full font-AeonikProSemibold inline">
                                Description
                            </p>
                            {work.description && work.description.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4 ">{desc}</p>
                            ))}
                            <p className="uppercase text-sm xl:text-base border-2 border-accent text-accent px-4 py-1 rounded-full font-AeonikProSemibold inline mt-8">
                                Challenges
                            </p>
                            {work.challenge && work.challenge.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4">{desc}</p>
                            ))}
                            <p className="uppercase text-sm xl:text-base border-2 border-accent text-accent px-4 py-1 rounded-full font-AeonikProSemibold inline mt-8">
                                Solutions
                            </p>
                            {work.solution && work.solution.map((desc, index) => (
                                <p key={index} className="text-xl xl:text-2xl mt-4">{desc}</p>
                            ))}
                            <button
                                onClick={() => handleClick(work.liveLink)}
                                className="uppercase text-xl xl:text-2xl bg-accent text-card flex justify-center overflow-hidden px-4 py-1 rounded-lg font-AeonikProSemibold w-full mt-8 md:mt-auto">
                                <AnimatedLink>Live Demo</AnimatedLink>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
