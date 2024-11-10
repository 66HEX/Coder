"use client"
import { notFound } from "next/navigation"; // Funkcja do przekierowania do 404
import Image from "next/image";
import {useEffect} from "react";

// Przykładowe dane projektów
const projectsData = [
    { id: "1", title: "LEANBULLS", image: "/images/mockup11.png", technologies: ["Next.js", "GSAP", "Tailwind CSS"] },
    { id: "2", title: "Project Two", image: "/images/mockup22.png", technologies: ["React", "Node.js", "MongoDB"] },
    { id: "3", title: "Project Three", image: "/images/mockup33.png", technologies: ["Vue.js", "Nuxt.js", "SASS"] },
];

function getProject(id: string) {
    return projectsData.find((project) => project.id === id) || null;
}

export default function ProjectPage({ params }: { params: { id: string } }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const project = getProject(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="w-screen bg-hexwhite">
            <div
                className="w-full h-svh p-4">
                <div className="w-full h-full flex justify-start items-end bg-hexblack rounded-xl p-4">
                    <h1 className="font-NeueMontrealVariable text-hexwhite font-semibold text-fluid uppercase leading-none">{project.title}</h1>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Obraz po lewej stronie */}
                <div className="w-full h-full ml-4">
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="object-cover rounded-lg w-full h-auto"
                    />
                </div>

                {/* Tekst po prawej stronie */}
                <div className="">
                    <h2 className="text-xl font-semibold">Technologies</h2>
                    <ul className="flex gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                            <li key={index} className="text-sm">{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
