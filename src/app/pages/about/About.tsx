'use client';
import Carousel from '../../components/Carousel/Carousel';
import BlurText from '../../components/BlurText/BlurText';
import DownloadButton from '../../components/DownloadButton/DownloadButton';
import SplitText from '../../components/SplitText/SplitText';
import Stack from '../../components/Stack/Stack';
import GradientText from '../../components/GradientText/GradientText';
import { skillsCarouselItems } from '../../data/skillsCarouselItems';

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 w-full relative z-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="relative rounded-[32px] border-2 border-[#6A4DFF]/40 bg-[#101B33]/70 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(82,39,255,0.6)] px-6 py-8 sm:px-10 sm:py-12 lg:px-24 lg:py-20">
            <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
            <div className="relative">
              {/* Section Title */}
              <div className="mb-8 sm:mb-12">
                <SplitText
                  text="About Me"
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

              {/* Content */}
              <div className="grid gap-8 sm:gap-10 lg:gap-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] items-start">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <BlurText
                      text="Saya adalah seorang profesional yang berfokus pada Quality Assurance dan Front-End Development. Dengan passion yang kuat terhadap teknologi dan detail, saya selalu berusaha untuk menciptakan pengalaman pengguna yang luar biasa."
                      delay={150}
                      animateBy="words"
                      direction="top"
                      animationFrom={undefined}
                      animationTo={undefined}
                      onAnimationComplete={undefined}
                      className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
                    />
                  </div>

                  <div>
                    <BlurText
                      text="Pendekatan saya dalam bekerja selalu berpusat pada kualitas, kolaborasi, dan pembelajaran berkelanjutan. Saya percaya bahwa setiap proyek adalah kesempatan untuk tumbuh dan memberikan nilai terbaik."
                      delay={200}
                      animateBy="words"
                      direction="top"
                      animationFrom={undefined}
                      animationTo={undefined}
                      onAnimationComplete={undefined}
                      className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <DownloadButton aria-label="Unduh CV Rizki Faizal Iriansyah" />
                  </div>

                  {/* Skills Section */}
                  <div className="pt-2 sm:pt-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">
                      Skills & Expertise
                    </h3>
                    <div className="flex justify-center sm:justify-start">
                      <Carousel
                        items={skillsCarouselItems}
                        baseWidth={280}
                        autoplay
                        autoplayDelay={3500}
                        pauseOnHover
                        loop
                        containerClassName="rounded-[24px] border border-[#6A4DFF]/30 bg-[#444B8C]/20 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(106,77,255,0.8)]"
                        itemClassName="bg-[#2A2F5F]/70 border border-[#6A4DFF]/30"
                        iconBadgeClassName="bg-[#6A4DFF]/60 text-white"
                        titleClassName="text-[#E78B48]"
                        descriptionClassName="text-gray-200"
                        indicatorActiveClassName="bg-[#E78B48]"
                        indicatorInactiveClassName="bg-white/30"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-end lg:pr-10 gap-6">
                  <div className="hidden sm:block">
                    <Stack randomRotation sendToBackOnClick cardDimensions={{ width: 280, height: 360 }} />
                  </div>
                  <div className="sm:hidden">
                    <Stack randomRotation sendToBackOnClick cardDimensions={{ width: 200, height: 260 }} />
                  </div>
                  <div className="w-full max-w-[280px] mt-8 sm:mt-12 lg:mt-28">
                    <GradientText
                      colors={['#E78B48', '#6A4DFF', '#E78B48']}
                      animationSpeed={8}
                      className="text-2xl sm:text-4xl font-bold text-center whitespace-nowrap"
                    >
                      Passionate Developer
                    </GradientText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

