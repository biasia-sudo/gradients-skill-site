'use client';

import { useEffect, useRef, useState } from 'react';

function GradientCard({ 
  gradient, 
  title,
  description,
  size = 'medium'
}: { 
  gradient: string; 
  title: string;
  description?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState('90deg');

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
        setDirection('180deg');
      }
    };

    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, []);

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

  const sizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-80',
    xlarge: 'h-96'
  };

  return (
    <div className="group cursor-pointer">
      <div 
        ref={ref}
        className={`w-full ${sizeClasses[size]} rounded overflow-hidden relative`}
        style={{ background: gradientWithDirection }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="mt-3">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-xs text-neutral-500 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-black rounded-full" />
            </div>

            {/* Description */}
            <div className="flex-1 max-w-md">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Give your agent a real gradient vocabulary. Preset-first workflow, 
                perceptual interpolation, and multi-platform support—loaded every time your AI writes code.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6 text-sm">
              <a href="#presets" className="text-neutral-600 hover:text-black">Presets</a>
              <a href="#install" className="text-neutral-600 hover:text-black">Install</a>
              <a href="https://github.com/biasia-sudo/gradients-skill" 
                 className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800"
                 target="_blank"
                 rel="noopener noreferrer">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-12 gap-4">
          {/* Before/After: Sunset */}
          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
              title="Before: Sunset"
              description="Generic purple-pink"
              size="large"
            />
          </div>

          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(in oklab, #DDDFEE 0%, #DFCAAD 26.4%, #F8A4A4 52.4%, #F16041 84.1%, #EF2F6A 100%)"
              title="After: Dyed Horizon"
              description="RedYellow preset"
              size="medium"
            />
          </div>

          {/* Before/After: Night Sky */}
          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(90deg, #667EEA 0%, #764BA2 100%)"
              title="Before: Night Sky"
              description="Generic blue-purple"
              size="medium"
            />
          </div>

          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(in oklab, #DDDFEE 0.5%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)"
              title="After: Frost Dawn"
              description="BluePurple preset"
              size="large"
            />
          </div>

          {/* Before/After: Spring */}
          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)"
              title="Before: Spring"
              description="Generic blue"
              size="medium"
            />
          </div>

          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(in oklab, #EFEDAD 0%, #A7E1A7 26.9%, #3898EF 83.2%, #119AB8 100%)"
              title="After: Lakeside Glow"
              description="GreenYellow preset"
              size="xlarge"
            />
          </div>

          {/* Before/After: Neon */}
          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(90deg, #F093FB 0%, #F5576C 100%)"
              title="Before: Neon"
              description="Generic pink"
              size="large"
            />
          </div>

          <div className="col-span-3">
            <GradientCard
              gradient="linear-gradient(in oklab, #FFD593 0%, #FFB48B 32.7%, #FF92DF 64.4%, #989BFF 100%)"
              title="After: Glacial Glow"
              description="Contrast preset"
              size="medium"
            />
          </div>
        </div>
      </section>

      {/* Preset Families */}
      <section id="presets" className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-12">Preset Families</h2>
          
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #DDDFEE 0%, #DFCAAD 26.4%, #F8A4A4 52.4%, #F16041 84.1%, #EF2F6A 100%)"
                title="RedYellow: Dyed Horizon"
                description="warm, sunrise, peach, coral"
                size="large"
              />
            </div>

            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #DDDFEE 0.5%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)"
                title="BluePurple: Frost Dawn"
                description="cool, dusk, dreamy, cosmic"
                size="medium"
              />
            </div>

            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #EFEDAD 0%, #A7E1A7 26.9%, #3898EF 83.2%, #119AB8 100%)"
                title="GreenYellow: Lakeside Glow"
                description="spring, mint, meadow, fresh"
                size="large"
              />
            </div>

            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #FFD593 0%, #FFB48B 32.7%, #FF92DF 64.4%, #989BFF 100%)"
                title="Contrast: Glacial Glow"
                description="loud, editorial, colorful"
                size="medium"
              />
            </div>

            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #F2C7EB 0%, #4F70B5 50%, #3D5C94 59%, #363D4F 75%, #402105 100%)"
                title="Dark: Dusky Horizon"
                description="moody, luxury, cinematic"
                size="large"
              />
            </div>

            <div className="col-span-4">
              <GradientCard
                gradient="linear-gradient(in oklab, #D9F5FA 0%, #FCD9D6 31%, #FCBAC9 61%, #F0B2F5 100%)"
                title="Light: Peach"
                description="airy, pastel, soft"
                size="medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-12">
            It improves prompting structure, not just the final colors.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-sm text-neutral-500 mb-2">01</div>
              <h3 className="text-lg font-semibold mb-3">Match by family first</h3>
              <p className="text-sm text-neutral-600">
                The model stops guessing from "nice" and starts from intent: blue-purple tech, 
                skincare light, bold contrast, moody dark, and more.
              </p>
            </div>

            <div>
              <div className="text-sm text-neutral-500 mb-2">02</div>
              <h3 className="text-lg font-semibold mb-3">Choose interpolation with intent</h3>
              <p className="text-sm text-neutral-600">
                <code className="bg-neutral-100 px-2 py-1 rounded text-xs">oklch</code> for clean vivid ramps. 
                <code className="bg-neutral-100 px-2 py-1 rounded text-xs ml-1">oklab</code> for deeper, 
                multi-stop atmospheres. The choice becomes explicit and reusable.
              </p>
            </div>

            <div>
              <div className="text-sm text-neutral-500 mb-2">03</div>
              <h3 className="text-lg font-semibold mb-3">Multi-platform support</h3>
              <p className="text-sm text-neutral-600">
                CSS, Swift, Kotlin, Flutter, Canvas—one skill, any platform. 
                Automatic color space fitting ensures smoothness everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-8">Install anywhere</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl">
            One command for Codex, Claude Code, and the rest of the Skills CLI ecosystem.
          </p>
          
          <div className="bg-black text-white p-6 rounded font-mono text-sm mb-6 max-w-2xl">
            <div className="text-neutral-400 mb-2 text-xs">Recommended install</div>
            <div>npx skills add biasia-sudo/gradients-skill -g -y</div>
          </div>

          <p className="text-xs text-neutral-500">
            Restart your agent after install so the skill is picked up immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <div>
              Built by{' '}
              <a 
                href="https://github.com/biasia-sudo" 
                className="text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                BIAsia
              </a>
            </div>
            <a 
              href="https://github.com/biasia-sudo/gradients-skill" 
              className="hover:text-black"
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
