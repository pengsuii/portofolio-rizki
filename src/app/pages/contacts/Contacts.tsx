'use client';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';
import BlurText from '../../components/BlurText/BlurText';
import SplitText from '../../components/SplitText/SplitText';
import { Contact, contactsData } from './data/contactsData';

export default function Contacts() {
  const getIcon = (type: Contact['type']) => {
    switch (type) {
      case 'email':
        return <FiMail className="h-5 w-5" />;
      case 'linkedin':
        return <FiLinkedin className="h-5 w-5" />;
      case 'github':
        return <FiGithub className="h-5 w-5" />;
      case 'x':
        return <RiTwitterXLine className="h-5 w-5" />;
      case 'whatsapp':
        return <FiPhone className="h-5 w-5" />;
      default:
        return <FiMail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 w-full relative z-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="relative rounded-[32px] border-2 border-[#6A4DFF]/40 bg-[#101B33]/70 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(82,39,255,0.6)] px-6 py-8 sm:px-10 sm:py-12 lg:px-24 lg:py-20">
            <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
            <div className="relative">
              {/* Section Title */}
              <div className="mb-8 sm:mb-12">
                <SplitText
                  text="Contact"
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
                  text="Saya selalu terbuka untuk diskusi, kolaborasi, atau kesempatan baru. Jangan ragu untuk menghubungi saya melalui salah satu platform di bawah ini. Saya akan merespons secepat mungkin."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  animationFrom={undefined}
                  animationTo={undefined}
                  onAnimationComplete={undefined}
                  className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
                />
              </div>

              {/* Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {contactsData.map((contact, index) => (
                  <ContactCard key={contact.id} contact={contact} index={index} getIcon={getIcon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  contact: Contact;
  index: number;
  getIcon: (type: Contact['type']) => React.ReactNode;
}

function ContactCard({ contact, index, getIcon }: ContactCardProps) {
  return (
    <a
      href={contact.url}
      target={contact.type === 'email' ? '_self' : '_blank'}
      rel={contact.type === 'email' ? undefined : 'noopener noreferrer'}
      className="group relative rounded-[24px] border border-[#6A4DFF]/30 bg-[#444B8C]/20 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(106,77,255,0.8)] p-6 sm:p-8 hover:border-[#6A4DFF]/60 transition-all duration-300 hover:shadow-[0_30px_80px_-30px_rgba(106,77,255,1)] block"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none" />
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#6A4DFF]/40 border border-[#6A4DFF]/50 flex items-center justify-center text-white group-hover:bg-[#6A4DFF]/60 group-hover:scale-110 transition-all duration-300">
          {getIcon(contact.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[#E78B48] mb-2 group-hover:text-[#FF9FFC] transition-colors duration-300">
            {contact.label}
          </h3>
          <p className="text-sm sm:text-base text-gray-200 break-words group-hover:text-gray-100 transition-colors duration-300">
            {contact.value}
          </p>
        </div>
      </div>
    </a>
  );
}
