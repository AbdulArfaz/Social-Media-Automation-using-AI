import Navbar from '../components/Home/Navbar.jsx'
import Hero from "../components/Home/Hero.jsx";
import Features from "../components/Home/Features.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Pricing from "../components/Home/Pricing.jsx";
import CTA from "../components/Home/CTA.jsx";
import Footer from "../components/Home/Footer.jsx";

export default function Landing() {
    return (
        <div className="min-h-screen  text-slate-900 font-sans">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
}
