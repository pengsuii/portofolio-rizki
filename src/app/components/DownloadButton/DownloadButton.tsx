'use client';

import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import GlareHover from '../../animations/GlareHover/GlareHover';

type DownloadButtonProps = {
  href?: string;
  label?: string;
  className?: string;
} & ComponentPropsWithoutRef<'a'>;

export default function DownloadButton({
  href = '/CV-Rizki Faizal Iriansyah.pdf',
  label = 'Download CV',
  className,
  ...props
}: DownloadButtonProps) {
  return (
    <GlareHover
      width="fit-content"
      height="fit-content"
      background="transparent"
      borderRadius="0.75rem"
      borderColor="rgba(231, 139, 72, 0.35)"
      glareColor="#e9e9ef"
      glareOpacity={0.45}
      glareSize={220}
      transitionDuration={700}
      className="border border-[#E78B48]/50"
    >
      <a
        href={href}
        download
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-[#E78B48] shadow-[0_20px_40px_-20px_rgba(82,39,255,0.45)] backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E78B48]',
          className,
        )}
        {...props}
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0L16.5 12m-4.5 4.5V3"
          />
        </svg>
      </a>
    </GlareHover>
  );
}

