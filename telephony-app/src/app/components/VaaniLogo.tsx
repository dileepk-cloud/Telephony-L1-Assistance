'use client';

import React from 'react';
import { useTheme } from './ThemeContext';

interface VaaniLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  onlyIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function VaaniLogo({
  size = 'md',
  showText = true,
  showSubtitle = true,
  onlyIcon = false,
  className = '',
  onClick,
}: VaaniLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dimensions based on size prop
  const config = {
    xs: {
      iconSize: 28,
      titleSize: 'text-sm font-bold',
      subtitleSize: 'text-[7px]',
      gap: 'gap-2',
    },
    sm: {
      iconSize: 36,
      titleSize: 'text-lg font-bold',
      subtitleSize: 'text-[8.5px]',
      gap: 'gap-2.5',
    },
    md: {
      iconSize: 48,
      titleSize: 'text-2xl font-bold',
      subtitleSize: 'text-[9.5px]',
      gap: 'gap-3.5',
    },
    lg: {
      iconSize: 64,
      titleSize: 'text-3xl sm:text-4xl font-extrabold',
      subtitleSize: 'text-[11px]',
      gap: 'gap-4',
    },
    xl: {
      iconSize: 84,
      titleSize: 'text-5xl font-black',
      subtitleSize: 'text-xs',
      gap: 'gap-5',
    },
  }[size];

  // In light mode: exactly as provided in the screenshot
  // In dark mode: glowing luminous accents and crisp high-contrast white text
  const textColor = isDark ? 'text-white' : 'text-[#0D1936]';
  const subtitleColor = isDark ? 'text-[#94A3B8]' : 'text-[#5A6B83]';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${config.gap} select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Icon Emblem: The Exact Vaani Rounded Squircle with 3 Nodes & Green Equalizer Bubble */}
      <div
        className="relative shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: config.iconSize, height: config.iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${
            isDark
              ? 'drop-shadow-[0_4px_16px_rgba(59,130,246,0.35)]'
              : 'drop-shadow-[0_2px_8px_rgba(16,27,55,0.15)]'
          }`}
        >
          {/* Base Squircle */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="26"
            fill={isDark ? '#111D38' : '#101B37'}
            stroke={isDark ? '#2B3A60' : 'none'}
            strokeWidth={isDark ? '2' : '0'}
          />

          {/* In Dark Mode: subtle internal glow accent */}
          {isDark && (
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              rx="25"
              fill="none"
              stroke="url(#vaaniDarkGlow)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          )}

          <defs>
            <linearGradient id="vaaniDarkGlow" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            {isDark && (
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            )}
          </defs>

          {/* 3 Converging Connector Lines from Nodes to Speech Bubble */}
          <line
            x1="22"
            y1="34"
            x2="44"
            y2="44"
            stroke={isDark ? '#5C708D' : '#687A94'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="50"
            x2="43"
            y2="50"
            stroke={isDark ? '#5C708D' : '#687A94'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="22"
            y1="66"
            x2="44"
            y2="56"
            stroke={isDark ? '#5C708D' : '#687A94'}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* 3 Left Channel Nodes: Blue, Amber, Red */}
          <circle
            cx="22"
            cy="34"
            r="6.5"
            fill={isDark ? '#60A5FA' : '#3B82F6'}
            filter={isDark ? 'url(#nodeGlow)' : undefined}
          />
          <circle
            cx="18"
            cy="50"
            r="6.5"
            fill={isDark ? '#FBBF24' : '#F59E0B'}
            filter={isDark ? 'url(#nodeGlow)' : undefined}
          />
          <circle
            cx="22"
            cy="66"
            r="6.5"
            fill={isDark ? '#F87171' : '#EF4444'}
            filter={isDark ? 'url(#nodeGlow)' : undefined}
          />

          {/* Speech Bubble with Bottom-Left Pointer Tail */}
          <path
            d="M 56 28 H 76 C 82 28 87 33 87 39 V 57 C 87 63 82 68 76 68 H 56 L 45 77 L 47 66 C 45.5 64 45 61 45 57 V 39 C 45 33 50 28 56 28 Z"
            fill="#FFFFFF"
          />

          {/* 4 Green Equalizer Bars inside Speech Bubble */}
          <rect
            x="53.5"
            y="44"
            width="4.5"
            height="15"
            rx="2.25"
            fill={isDark ? '#22C55E' : '#16A34A'}
          />
          <rect
            x="61"
            y="36"
            width="4.5"
            height="25"
            rx="2.25"
            fill={isDark ? '#22C55E' : '#16A34A'}
          />
          <rect
            x="68.5"
            y="40"
            width="4.5"
            height="20"
            rx="2.25"
            fill={isDark ? '#22C55E' : '#16A34A'}
          />
          <rect
            x="76"
            y="46"
            width="4.5"
            height="12"
            rx="2.25"
            fill={isDark ? '#22C55E' : '#16A34A'}
          />
        </svg>
      </div>

      {/* Typography: "Vaani" and "TELEPHONY INTEGRATION HUB" */}
      {!onlyIcon && showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-sans tracking-tight transition-colors duration-200 ${config.titleSize} ${textColor}`}
          >
            Vaani
          </span>
          {showSubtitle && (
            <span
              className={`font-mono font-semibold uppercase tracking-[0.22em] mt-1 transition-colors duration-200 ${config.subtitleSize} ${subtitleColor}`}
            >
              Telephony Integration Hub
            </span>
          )}
        </div>
      )}
    </div>
  );
}
