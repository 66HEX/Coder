import Marquee from "@/app/components/Marquee/Marquee";

export default function Testimonials() {
    return (
        <section id="testimonials" className="w-screen text-hexblack mb-4 flex flex-col justify-center items-center">
            <div className="w-full rounded-lg">
                <Marquee/>
            </div>
        </section>
    );
}
