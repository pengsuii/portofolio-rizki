'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import BlurText from './components/BlurText/BlurText';
import RotatingText from './components/RotatingText/RotatingText';
import SplitText from './components/SplitText/SplitText';
import VariableProximity from './animations/VariableProximity/VariableProximity';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import Contacts from './pages/contacts/Contacts';
import Footer from './pages/footer/Footer';

const StaggeredMenu = dynamic(() => import('./components/StaggeredMenu/StaggeredMenu').then(mod => ({ default: mod.StaggeredMenu })), {
  ssr: false,
}) as any;

const Lanyard = dynamic(() => import('./components/Lanyard/Lanyard'), {
  ssr: false,
});

const LiquidEther = dynamic(() => import('./components/LiquidEther/LiquidEther'), {
  ssr: false,
});


export default function Home() {
  const textContainerRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Home', link: '#home', ariaLabel: 'Go to home section' },
    { label: 'About', link: '#about', ariaLabel: 'Go to about section' },
    { label: 'Projects', link: '#projects', ariaLabel: 'Go to projects section' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Go to contact section' },
  ] as Array<{ label: string; link: string; ariaLabel?: string }>;

  const socialItems = [
    { label: 'GitHub', link: ' https://github.com/pengsuii' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rizkifaizaliriansyah' },
    { label: 'Twitter', link: 'https://twitter.com' },
  ] as Array<{ label: string; link: string }>;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B192C] relative">
      {/* Navigation Menu */}
      <StaggeredMenu
        position="right"
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        items={menuItems as any}
        socialItems={socialItems as any}
        displaySocials={true}
        displayItemNumbering={true}
        isFixed={true}
        accentColor="#5227FF"
        menuButtonColor="#e9e9ef"
        openMenuButtonColor="#5227FF"
        changeMenuColorOnOpen={true}
        logoUrl=""
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={40}
          cursorSize={80}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.35}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10">
        <div id="home" className="relative min-h-screen flex items-center py-8 sm:py-12 lg:py-16">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-40 lg:translate-x-0 z-0 flex items-start justify-center lg:justify-start"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="w-[min(90vw,320px)] sm:w-[min(95vw,420px)] lg:w-[420px] h-[280px] sm:h-[420px] md:h-[520px] lg:h-[620px] lg:pl-0 xl:pl-0 flex items-start justify-center">
              <div className="w-full h-full" style={{ pointerEvents: 'auto' }}>
                <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} fov={18} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-9 lg:px-8 w-full relative z-10 pointer-events-none">
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-100 font-bold">
                  I'm Ready For Job
                </h1>
                <RotatingText
                  texts={['QA', 'Front-End', 'Design']}
                  mainClassName="px-2 sm:px-3 bg-[#444B8C] text-gray-100 overflow-hidden py-1 sm:py-1.5 justify-center rounded-lg text-xl sm:text-2xl font-semibold inline-flex transition-all"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>

              <div className="mt-4 sm:mt-6">
                <SplitText
                  text="Rizki Faizal Iriansyah"
                  className="text-2xl sm:text-5xl lg:text-5xl font-semibold text-left sm:text-center lg:text-left text-[#E78B48]"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.2}
                  rootMargin="-50px"
                  textAlign="left"
                />
              </div>

              <div className="mt-6 sm:mt-8 relative" ref={textContainerRef}>
                <VariableProximity
                  label="Berfokus pada kualitas dan pengalaman pengguna, saya menikmati proses memahami masalah, mencari solusi, dan berkolaborasi untuk menghasilkan produk yang lebih baik setiap harinya. Selalu terbuka untuk tantangan baru dan kesempatan berkembang."
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={textContainerRef}
                  radius={120}
                  falloff="gaussian"
                  className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto-flex), "Roboto Flex", sans-serif' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* About Section */}
        <About />
        {/* Projects Section */}
        <Projects />
        {/* Contacts Section */}
        <Contacts />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
