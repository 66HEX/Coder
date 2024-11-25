import Link from "next/link";

export default function Contact() {

    return (
        <section
            id="contact"
            className="w-screen h-[400px] px-4 pb-4 flex flex-col justify-center items-center overflow-hidden relative font-AeonikProRegular"
        >
            <div
                className="w-full h-full flex flex-col justify-between items-start text-textPrimary bg-card shadow-cardShadow rounded-cardRadius text-xl md:text-2xl lg:text-3xl relative overflow-hidden"
            >
                <p className="uppercase text-sm xl:text-base bg-accent text-card px-4 py-1 rounded-full font-AeonikProSemibold m-4">contact</p>

                <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col justify-center items-center text-center">
                    <h2
                        className="about-title font-AeonikProSemibold text-fluid2 uppercase leading-none">
                        HAVE AN IDEA?
                    </h2>
                    <Link  href="mailto:hexthecoder@gmail.com" className="text-base md:text-2xl uppercase leading-none mt-8 group cursor-pointer">
                        hexthecoder@gmail.com
                    </Link>
                    <Link href="https://www.instagram.com/hexthecoder/" target="_blank" rel="noopener noreferrer" className="group mt-4 md:hidden text-base uppercase">
                        instagram
                    </Link>
                    <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank" rel="noopener noreferrer" className="group mt-4 md:hidden text-base uppercase">
                        linkedin
                    </Link>
                </div>

                <div className="w-full flex-grow  items-end hidden md:flex">
                    <ul className="flex w-full h-auto flex-row justify-between items-start gap-2 p-4 text-base uppercase cursor-pointer">
                        <li>
                            <Link href="https://www.linkedin.com/in/marek-j%C3%B3%C5%BAwiak-29958132a/" target="_blank" rel="noopener noreferrer">
                                linkedin
                            </Link>
                        </li>

                        <li>
                            <Link href="https://www.instagram.com/hexthecoder/" target="_blank" rel="noopener noreferrer">
                                instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
