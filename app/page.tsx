'use client';

import { useEffect, useRef, useState } from 'react';

function GradientBox({ 
  gradient, 
  label, 
  description 
}: { 
  gradient: string; 
  label: string; 
  description?: string;
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
        // Square: diagonal
        setDirection('135deg');
      } else if (width > height) {
        // Landscape: horizontal
        setDirection('90deg');
      } else {
        // Portrait: vertical
        setDirection('180deg');
      }
    };

    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, []);

  // Extract color space and colors from gradient
  const colorSpaceMatch = gradient.match(/in (oklab|oklch)/);
  const colorSpace = colorSpaceMatch ? colorSpaceMatch[1] : null;
  
  // Extract colors with positions
  const colorsMatch = gradient.match(/#[0-9A-Fa-f]{6}\s+[\d.]+%/g);
  const colors = colorsMatch ? colorsMatch.map(c => c.trim()) : [];
  
  // Build gradient with direction
  let gradientWithDirection: string;
  if (colorSpace && colors.length > 0) {
    gradientWithDirection = `linear-gradient(${direction} in ${colorSpace}, ${colors.join(', ')})`;
  } else {
    // Fallback: just replace direction
    gradientWithDirection = gradient.replace(/linear-gradient\([^,]*,/, `linear-gradient(${direction},`);
  }

  return (
    <div className="space-y-3">
      <div 
        ref={ref}
        className="w-full h-48 rounded"
        style={{ background: gradientWithDirection }}
      />
      <div>
        <div className="text-sm font-medium mb-1">{label}</div>
        {description && (
          <div className="text-sm text-neutral-500">{description}</div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Gradients</h1>
          <p className="text-xl text-neutral-600 mb-6">
            Give your agent a real gradient vocabulary.
          </p>
          <p className="text-neutral-600 max-w-2xl">
            Gradients helps Codex, Claude Code, Cursor, Gemini CLI, and other agentic tools 
            choose gradients by hue family first, then apply the right interpolation mode 
            with offline presets that work after install.
          </p>
        </div>
      </section>

      {/* Before/After */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">Before / After</h2>
          
          <div className="space-y-16">
            {/* Sunset */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Prompt: "Give me a sunset gradient"</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <GradientBox
                    gradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
                    label="Before: Without skill"
                    description="Generic purple-pink gradient, no family logic"
                  />
                </div>
                <div>
                  <GradientBox
                    gradient="linear-gradient(in oklab, #DDDFEE 0%, #DFCAAD 26.4%, #F8A4A4 52.4%, #F16041 84.1%, #EF2F6A 100%)"
                    label="After: With skill → Dyed Horizon (RedYellow)"
                    description="Matched by family, perceptually smooth"
                  />
                </div>
              </div>
            </div>

            {/* Night Sky */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Prompt: "Create a dreamy night sky gradient"</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <GradientBox
                    gradient="linear-gradient(90deg, #667EEA 0%, #764BA2 100%)"
                    label="Before: Without skill"
                    description="Generic blue-purple, lacks atmosphere"
                  />
                </div>
                <div>
                  <GradientBox
                    gradient="linear-gradient(in oklab, #DDDFEE 0.5%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)"
                    label="After: With skill → Frost Dawn (BluePurple)"
                    description="Deep, atmospheric, multi-stop smoothness"
                  />
                </div>
              </div>
            </div>

            {/* Spring Meadow */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Prompt: "Make a fresh spring gradient"</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <GradientBox
                    gradient="linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)"
                    label="Before: Without skill"
                    description="Generic blue gradient, no spring feeling"
                  />
                </div>
                <div>
                  <GradientBox
                    gradient="linear-gradient(in oklab, #EFEDAD 0%, #A7E1A7 26.9%, #3898EF 83.2%, #119AB8 100%)"
                    label="After: With skill → Lakeside Glow (GreenYellow)"
                    description="Fresh, vibrant, natural spring atmosphere"
                  />
                </div>
              </div>
            </div>

            {/* Neon Lights */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Prompt: "Give me a bold neon gradient"</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <GradientBox
                    gradient="linear-gradient(90deg, #F093FB 0%, #F5576C 100%)"
                    label="Before: Without skill"
                    description="Generic pink gradient, lacks contrast"
                  />
                </div>
                <div>
                  <GradientBox
                    gradient="linear-gradient(in oklab, #FFD593 0%, #FFB48B 32.7%, #FF92DF 64.4%, #989BFF 100%)"
                    label="After: With skill → Glacial Glow (Contrast)"
                    description="Bold, electric, high-contrast statement"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">
            It improves prompting structure, not just the final colors.
          </h2>
          
          <div className="space-y-12">
            <div>
              <div className="text-sm text-neutral-500 mb-2">01</div>
              <h3 className="text-xl font-semibold mb-3">Match by family first</h3>
              <p className="text-neutral-600">
                The model stops guessing from "nice" and starts from intent: blue-purple tech, 
                skincare light, bold contrast, moody dark, and more.
              </p>
            </div>

            <div>
              <div className="text-sm text-neutral-500 mb-2">02</div>
              <h3 className="text-xl font-semibold mb-3">Choose interpolation with intent</h3>
              <p className="text-neutral-600">
                <code className="bg-neutral-100 px-2 py-1 rounded text-sm">oklch</code> for clean vivid ramps. 
                <code className="bg-neutral-100 px-2 py-1 rounded text-sm ml-1">oklab</code> for deeper, 
                multi-stop atmospheres. The choice becomes explicit and reusable.
              </p>
            </div>

            <div>
              <div className="text-sm text-neutral-500 mb-2">03</div>
              <h3 className="text-xl font-semibold mb-3">Multi-platform support</h3>
              <p className="text-neutral-600">
                CSS, Swift, Kotlin, Flutter, Canvas—one skill, any platform. 
                Automatic color space fitting ensures smoothness everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preset families */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <h2 className="text-3xl font-bold mb-4">Preset families</h2>
          <p className="text-neutral-600 mb-12">
            Six structured families with curated presets.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GradientBox
              gradient="linear-gradient(in oklab, #DDDFEE 0%, #DFCAAD 26.4%, #F8A4A4 52.4%, #F16041 84.1%, #EF2F6A 100%)"
              label="RedYellow: Dyed Horizon"
              description="warm, sunrise, peach, coral"
            />
            <GradientBox
              gradient="linear-gradient(in oklab, #DDDFEE 0.5%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)"
              label="BluePurple: Frost Dawn"
              description="cool, dusk, dreamy, cosmic"
            />
            <GradientBox
              gradient="linear-gradient(in oklab, #EFEDAD 0%, #A7E1A7 26.9%, #3898EF 83.2%, #119AB8 100%)"
              label="GreenYellow: Lakeside Glow"
              description="spring, mint, meadow, fresh"
            />
            <GradientBox
              gradient="linear-gradient(in oklab, #FFD593 0%, #FFB48B 32.7%, #FF92DF 64.4%, #989BFF 100%)"
              label="Contrast: Glacial Glow"
              description="loud, editorial, colorful"
            />
            <GradientBox
              gradient="linear-gradient(in oklab, #F2C7EB 0%, #4F70B5 50%, #3D5C94 59%, #363D4F 75%, #402105 100%)"
              label="Dark: Dusky Horizon"
              description="moody, luxury, cinematic"
            />
            <GradientBox
              gradient="linear-gradient(in oklab, #D9F5FA 0%, #FCD9D6 31%, #FCBAC9 61%, #F0B2F5 100%)"
              label="Light: Peach"
              description="airy, pastel, soft"
            />
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="border-b border-neutral-200">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Install anywhere</h2>
          <p className="text-neutral-600 mb-8">
            One command for Codex, Claude Code, and the rest of the Skills CLI ecosystem.
          </p>
          
          <div className="bg-black text-white p-6 rounded font-mono text-sm mb-6">
            <div className="text-neutral-400 mb-2">Recommended install</div>
            <div>npx skills add biasia-sudo/gradients-skill -g -y</div>
          </div>

          <p className="text-sm text-neutral-500">
            Restart your agent after install so the skill is picked up immediately.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 max-w-4xl">
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
      </footer>
    </main>
  );
}
