'use client';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/pengsuii',
      icon: FiGithub,
      color: 'hover:text-[#5227FF]',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rizkifaizaliriansyah',
      icon: FiLinkedin,
      color: 'hover:text-[#5227FF]',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: FiTwitter,
      color: 'hover:text-[#FF9FFC]',
    },
    {
      name: 'Email',
      url: 'mailto:rizkifaizal125@gmail.com',
      icon: FiMail,
      color: 'hover:text-[#E78B48]',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative w-full border-t border-[#6A4DFF]/20 bg-[#0B192C]/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-[#E78B48]">
                Rizki Faizal Iriansyah
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                QA Engineer & Front-End Developer yang berfokus pada kualitas dan pengalaman pengguna.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-100">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#5227FF] transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-100">Connect</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.name === 'Email' ? '_self' : '_blank'}
                      rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
                      className={`group relative w-10 h-10 rounded-lg bg-[#444B8C]/30 border border-[#6A4DFF]/30 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:border-[#6A4DFF]/60 hover:bg-[#444B8C]/50 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#6A4DFF]/20 my-8"></div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Rizki Faizal Iriansyah. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Built with <span className="text-[#E78B48]">Next.js</span> & <span className="text-[#5227FF]">TypeScript</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

