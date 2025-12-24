'use client';
import { motion, PanInfo, useMotionValue } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiCode, FiExternalLink, FiFileText, FiGithub } from 'react-icons/fi';
import { SiJavascript, SiLaravel, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import LogoLoop from '../../animations/LogoLoop/LogoLoop';
import BlurText from '../../components/BlurText/BlurText';
import SplitText from '../../components/SplitText/SplitText';
import { Project, projectsData } from './data/projectsData';


export default function Projects() {
  const techLogos = useMemo(() => [
    { node: <SiReact className="text-white w-10 h-10" />, title: "React"},
    { node: <SiNextdotjs className="text-white w-10 h-10" />, title: "Next.js"},
    { node: <SiTypescript className="text-white w-10 h-10" />, title: "TypeScript"},
    { node: <SiJavascript className="text-white w-10 h-10" />, title: "JavaScript"},
    { node: <SiTailwindcss className="text-white w-10 h-10" />, title: "Tailwind CSS"},
    { node: <SiLaravel className='text-white w-10 h-10' />, title: "Laravel"}
  ], []);
  return (
    <section id="projects" className="relative py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 w-full relative z-10">
        <div className="max-w-[1500px] mx-auto">
          {/* Projects Card Container */}
          <div className="relative rounded-[32px] border-2 border-[#6A4DFF]/40 bg-[#101B33]/70 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(82,39,255,0.6)] px-6 py-8 sm:px-10 sm:py-12 lg:px-24 lg:py-20 mb-12 sm:mb-16">
            <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
            <div className="relative">
              {/* Section Title */}
              <div className="mb-8 sm:mb-12">
                <SplitText
                  text="Projects"
                  className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-left text-[#E78B48]"
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

              {/* Description */}
              <div className="mb-8 sm:mb-12">
                <BlurText
                  text="Kumpulan proyek yang telah saya kembangkan, mulai dari aplikasi web dengan machine learning, website modern dengan teknologi terkini, hingga framework automation testing untuk memastikan kualitas software."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  animationFrom={undefined}
                  animationTo={undefined}
                  onAnimationComplete={undefined}
                  className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
                />
              </div>

              {/* Projects Carousel */}
              <ProjectsCarousel />
            </div>
          </div>
          
          {/* Logo Loop Section */}
          <div className="mt-12 sm:mt-16 -mx-4 sm:-mx-10 lg:-mx-20">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={50}
              pauseOnHover={true}
              fadeOut={false}
              scaleOnHover={true}
              width="100%"
              ariaLabel="Technologies and tools"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);
  
  const maxIndex = Math.max(0, projectsData.length - itemsPerView);
  
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    }
  };
  
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };
  
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 50;
    
    if (offset < -threshold || velocity < -500) {
      goToNext();
    } else if (offset > threshold || velocity > 500) {
      goToPrev();
    }
  };
  
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;
  
  return (
    <div className="relative px-4 sm:px-8 lg:px-12">
      {/* Navigation Arrows */}
      {canGoPrev && (
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#6A4DFF]/60 hover:bg-[#6A4DFF]/80 border border-[#6A4DFF]/50 text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
          aria-label="Previous projects"
        >
          <FiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      )}
      
      {canGoNext && (
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#6A4DFF]/60 hover:bg-[#6A4DFF]/80 border border-[#6A4DFF]/50 text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
          aria-label="Next projects"
        >
          <FiChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      )}
      
      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
      >
        <motion.div
          className="flex gap-4 sm:gap-6"
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0
          }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{
            x: itemsPerView > 0 ? `-${currentIndex * (100 / itemsPerView)}%` : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          style={{ x }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-[#E78B48]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = project.description.length > project.shortDescription.length;

  return (
    <div
      className="group relative rounded-[24px] border border-[#6A4DFF]/30 bg-[#444B8C]/20 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(106,77,255,0.8)] p-5 sm:p-6 hover:border-[#6A4DFF]/60 transition-all duration-300 hover:shadow-[0_30px_80px_-30px_rgba(106,77,255,1)] h-full flex flex-col"
    >
      <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none" />
      
      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#6A4DFF]/30 border border-[#6A4DFF]/40 text-xs text-[#E78B48]">
          <FiCode className="h-3 w-3" />
          {project.category.toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-[#E78B48] mb-2 group-hover:text-[#FF9FFC] transition-colors duration-300 line-clamp-2">
        {project.title}
      </h3>

      {/* Description with Read More/Less */}
      <div className="mb-4 flex-grow">
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3">
          {isExpanded ? project.description : project.shortDescription}
        </p>
        {hasLongDescription && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1.5 flex items-center gap-1 text-xs text-[#E78B48] hover:text-[#FF9FFC] transition-colors duration-300 font-medium"
            aria-label={isExpanded ? 'Tutup deskripsi' : 'Baca selengkapnya'}
          >
            {isExpanded ? (
              <>
                <span>Tutup</span>
                <FiChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Baca selengkapnya</span>
                <FiChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-0.5 rounded-md bg-[#2A2F5F]/70 border border-[#6A4DFF]/30 text-[10px] sm:text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-[#2A2F5F]/70 border border-[#6A4DFF]/30 text-[10px] sm:text-xs text-gray-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-auto">
        {project.sheetsUrl && (
          <a
            href={project.sheetsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#48BFE3]/40 hover:bg-[#48BFE3]/60 border border-[#48BFE3]/50 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
            aria-label={`View ${project.title} Test Cases`}
          >
            <FiFileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Test Cases</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6A4DFF]/40 hover:bg-[#6A4DFF]/60 border border-[#6A4DFF]/50 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FiGithub className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E78B48]/40 hover:bg-[#E78B48]/60 border border-[#E78B48]/50 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
            aria-label={`View live ${project.title}`}
          >
            <FiExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Live</span>
          </a>
        )}
      </div>
    </div>
  );
}

