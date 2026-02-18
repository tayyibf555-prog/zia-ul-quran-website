import Hero from '../components/home/Hero'
import PrayerTimes from '../components/home/PrayerTimes'
import About from '../components/home/About'
import Services from '../components/home/Services'
import WomensTafsir from '../components/home/WomensTafsir'
import ProjectTimeline from '../components/home/ProjectTimeline'
import News from '../components/home/News'
import Events from '../components/home/Events'
import Testimonials from '../components/home/Testimonials'
import YouTubeFeed from '../components/home/YouTubeFeed'
import Contact from '../components/home/Contact'
import StayUpdated from '../components/home/StayUpdated'

const Home = () => {
    return (
        <main>
            <Hero />
            <PrayerTimes />
            <About />
            <Services />
            <WomensTafsir />
            <ProjectTimeline />
            <News />
            <Events />
            <Testimonials />
            <YouTubeFeed />
            <Contact />
            <StayUpdated />
        </main>
    );
};

export default Home;
