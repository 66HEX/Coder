import {Scene} from "@/app/components/Scene/Scene";

export default function Hero() {

    return (
        <section

            id="home"
            className="h-svh w-screen p-4 font-AeonikProRegular text-textPrimary"
        >
            <div className="h-1/3 w-full grid grid-cols-4">
                <div className="col-span-1 h-full">
                    <h1 className="text-6xl">
                        hex.
                    </h1>
                </div>
                <div className="col-span-4 xl:col-span-2 h-full flex justify-end items-end pb-4 md:pb-8 px-0 md:px-8">
                    <h1 className="text-xl md:text-4xl">
                        Empowering visionary brands,
                        crafting exceptional digital products,
                        and delivering unforgettable experiences.
                    </h1>
                </div>
            </div>
            <div
                className="h-2/3 w-full bg-card shadow-cardShadow flex flex-col justify-center items-center overflow-hidden relative rounded-cardRadius">
                <Scene />
            </div>
        </section>
    );
}
