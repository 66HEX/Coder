import Marquee from "@/app/components/Marquee/Marquee";

export default function Testimonials() {
    return (
        <section id="testimonials" className="w-screen text-hexblack px-4 pb-4 flex flex-col justify-center items-center">
            <div className="w-full rounded-lg overflow-hidden">
                <Marquee/>
            </div>
        </section>
    );
}
