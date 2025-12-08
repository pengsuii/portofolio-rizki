import { createElement } from 'react';
import { FiCpu, FiFileText, FiLayers, FiMonitor, FiTool } from 'react-icons/fi';

import type { CarouselItem } from '../components/Carousel/Carousel';

const iconClassName = 'h-[18px] w-[18px] text-white';

export const skillsCarouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Quality Assurance',
    description: 'Manual Testing, Test Planning, Regression Testing, Bug Tracking',
    icon: createElement(FiTool, { className: iconClassName })
  },
  {
    id: 2,
    title: 'Front-End Development',
    description: 'React, Next.js, Tailwind CSS, Responsive & Accessible UI',
    icon: createElement(FiMonitor, { className: iconClassName })
  },
  {
    id: 3,
    title: 'Test Planning & Documentation',
    description: 'Test plan, test scenario, test report, checklist',
    icon: createElement(FiFileText, { className: iconClassName })  },
  {
    id: 4,
    title: 'Automation Mindset',
    description: 'Cypress, Playwright, Katalon Studio',
    icon: createElement(FiCpu, { className: iconClassName })
  },
  {
    id: 5,
    title: 'Design Systems',
    description: 'Reusable Components, Theming, Documentation, Rapid Iteration',
    icon: createElement(FiLayers, { className: iconClassName })
  }
];
