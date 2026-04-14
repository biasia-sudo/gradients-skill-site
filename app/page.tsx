'use client';

import { useEffect, useRef, useState } from 'react';

function GradientProductCard({ 
  gradient, 
  icon,
  title,
  description,
  price
}: { 
  gradient: string; 
  icon: string;
  title: string;
  description: string;
  price: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState('180deg');

  useEffect(() => {
    if (!ref.current) return;
    
    const updateDirection = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const ratio = width / height;
      
      if (Math.abs(ratio - 1) < 0.1) {
        setDirection('135deg');
      } else if (width > height) {
        setDirection('90deg');
      } else {
        const colorMatch = gradient.match(/#[0-9A-Fa-f]{6}/g);
        if (colorMatch && colorMatch.length >= 2) {
          const firstColor = colorMatch[0];
          const lastColor = colorMatch[colorMatch.length - 1];
          
          const getLuminance = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return 0.299 * r + 0.587 * g + 0.114 * b;
          };
          
          const firstLum = getLuminance(firstColor);
          const lastLum = getLuminance(lastColor);
          
          setDirection(firstLum > lastLum ? '0deg' : '180deg');
        } else {
          setDirection('180deg');
        }
      }
    };

    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, [gradient]);

  const colorSpaceMatch = gradient.match(/in (oklab|oklch)/);
  const colorSpace = colorSpaceMatch ? colorSpaceMatch[1] : null;
  const colorsMatch = gradient.match(/#[0-9A-Fa-f]{6}\s+[\d.]+%/g);
  const colors = colorsMatch ? colorsMatch.map(c => c.trim()) : [];
  
  let gradientWithDirection: string;
  if (colorSpace && colors.length > 0) {
    gradientWithDirection = `linear-gradient(${direction} in ${colorSpace}, ${colors.join(', ')})`;
  } else {
    gradientWithDirection = gradient.replace(/linear-gradient\([^,]*,/, `linear-gradient(${direction},`);
  }

  return (
    <div className="bg-white border border-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">{description}</p>
      </div>

      {/* Gradient Display */}
      <div className="relative aspect-[3/4] p-8 flex items-center justify-center" style={{ background: gradientWithDirection }}>
        <div className="bg-white/90 backdrop-blur-sm p-8 text-center max-w-[200px]">
          <div className="text-xs text-neutral-500 mb-2">GRADIENTS</div>
          <div className="text-sm font-medium mb-4">{title}</div>
          <div className="text-xs text-neutral-600">oklab</div>
          <div className="w-full h-px bg-neutral-200 my-4" />
          <div className="text-2xl font-bold">gradients</div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-neutral-600">From preset library</div>
          <div className="text-sm font-medium">{price}</div>
        </div>
        <button className="w-full bg-white border border-neutral-900 text-neutral-900 py-2 text-xs font-medium hover:bg-neutral-900 hover:text-white transition-colors">
          VIEW PRESET
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6">
          {/* Logo */}
          <div className="py-8 text-center">
            <h1 className="text-6xl font-bold tracking-tight flex items-center justify-center gap-3">
              gradients
              <span className="text-5xl">✦</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="border-t border-neutral-200">
            <div className="flex items-center justify-center gap-12 py-4 text-xs tracking-wider">
              <a href="#home" className="hover:text-neutral-600">HOME</a>
              <a href="#about" className="hover:text-neutral-600">ABOUT</a>
              <a href="#presets" className="hover:text-neutral-600">PRESETS</a>
              <a href="#install" className="hover:text-neutral-600">INSTALL</a>
              <a href="https://github.com/biasia-sudo/gradients-skill" 
                 className="hover:text-neutral-600"
                 target="_blank"
                 rel="noopener noreferrer">
                GITHUB
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white border border-neutral-200 overflow-hidden">
          <div 
            className="relative h-[400px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(90deg in oklab, #DDDFEE 0%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)'
            }}
          >
            <h2 className="text-4xl font-light text-white tracking-wide">
              of perceptual color
            </h2>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="presets" className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <GradientProductCard
            icon="🌅"
            title="Dyed Horizon"
            description="Warm sunset gradient with a calming breeze. A blend of peach and coral tones."
            gradient="linear-gradient(in oklab, #DDDFEE 0%, #DFCAAD 26.4%, #F8A4A4 52.4%, #F16041 84.1%, #EF2F6A 100%)"
            price="RedYellow"
          />

          <GradientProductCard
            icon="🌙"
            title="Frost Dawn"
            description="Dreamy violet gradient with a colorful fragrance. Cool dusk atmosphere."
            gradient="linear-gradient(in oklab, #DDDFEE 0.5%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)"
            price="BluePurple"
          />

          <GradientProductCard
            icon="🌸"
            title="Lakeside Glow"
            description="Fresh spring gradient with a burst of mint. Natural meadow feeling."
            gradient="linear-gradient(in oklab, #EFEDAD 0%, #A7E1A7 26.9%, #3898EF 83.2%, #119AB8 100%)"
            price="GreenYellow"
          />
        </div>
      </section>

      {/* Install Section */}
      <section id="install" className="container mx-auto px-6 pb-20">
        <div className="bg-white border border-neutral-200 p-12 text-center">
          <h2 className="text-2xl font-medium mb-6">Install anywhere</h2>
          <p className="text-sm text-neutral-600 mb-8 max-w-2xl mx-auto">
            One command for Codex, Claude Code, and the rest of the Skills CLI ecosystem.
          </p>
          
          <div className="bg-neutral-900 text-white p-6 rounded font-mono text-sm mb-6 max-w-2xl mx-auto text-left">
            <div className="text-neutral-400 mb-2 text-xs">$ Recommended install</div>
            <div>npx skills add biasia-sudo/gradients-skill -g -y</div>
          </div>

          <p className="text-xs text-neutral-500">
            Restart your agent after install so the skill is picked up immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center text-xs text-neutral-500">
            <div>
              Built by{' '}
              <a 
                href="https://github.com/biasia-sudo" 
                className="text-neutral-900 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                BIAsia
              </a>
            </div>
            <a 
              href="https://github.com/biasia-sudo/gradients-skill" 
              className="hover:text-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
