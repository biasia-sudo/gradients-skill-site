export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Gradients
          </h1>
          <p className="text-2xl text-slate-700 mb-4">
            The missing upgrade to AI-generated gradients
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Before commands, before detection, Gradients teaches your AI real color theory. 
            Preset-first workflow, perceptual interpolation, and multi-platform support—loaded every time your AI writes code.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-3">Preset-first workflow</h3>
            <p className="text-slate-600">
              Start from curated presets grouped by mood and family. 
              No more generic AI gradients—every suggestion is grounded in real design.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-3">Perceptual interpolation</h3>
            <p className="text-slate-600">
              Uses oklab/oklch color spaces to avoid muddy middle colors. 
              Your gradients stay vibrant and smooth, just like they should.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-3">Multi-platform support</h3>
            <p className="text-slate-600">
              CSS, Swift, Kotlin, Flutter, Canvas—one skill, any platform. 
              Automatic color space fitting ensures smoothness everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Before & After</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before: RGB */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  Before: RGB interpolation
                </span>
              </div>
              <div 
                className="h-32 rounded-xl mb-4"
                style={{
                  background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)'
                }}
              ></div>
              <p className="text-sm text-slate-600">
                Muddy middle colors, unnatural transitions. 
                This is what AI models produce by default.
              </p>
            </div>

            {/* After: OKLAB */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  After: oklab interpolation
                </span>
              </div>
              <div 
                className="h-32 rounded-xl mb-4"
                style={{
                  background: 'linear-gradient(in oklab, #FF6B6B 0%, #4ECDC4 100%)'
                }}
              ></div>
              <p className="text-sm text-slate-600">
                Vibrant, perceptually smooth. 
                This is what Gradients teaches your AI to produce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
          
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <p className="text-slate-400 mb-4">Install the skill</p>
            <code className="text-lg">
              npx skills add biasia-sudo/gradients-skill
            </code>
          </div>

          <p className="text-center text-slate-600 mt-6">
            Works with Cursor, Claude Code, Gemini CLI, Codex CLI, and more.
          </p>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Usage Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Ask your AI:</h3>
              <p className="text-slate-600 mb-4">
                "Give me a soft pastel hero gradient"
              </p>
              <div 
                className="h-24 rounded-xl"
                style={{
                  background: 'linear-gradient(in oklab, #DDDFEE 0%, #DAA1AF 42.3%, #5572B6 79.8%, #7C62A5 100%)'
                }}
              ></div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Platform-specific output:</h3>
              <p className="text-slate-600 mb-4">
                "Create a Swift gradient for iOS with warm colors"
              </p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">
{`Gradient(stops: [
  Gradient.Stop(color: Color(red: 0.867, green: 0.875, blue: 0.933), location: 0.00),
  Gradient.Stop(color: Color(red: 0.855, green: 0.631, blue: 0.686), location: 0.423),
  Gradient.Stop(color: Color(red: 0.333, green: 0.447, blue: 0.714), location: 0.798),
  Gradient.Stop(color: Color(red: 0.486, green: 0.384, blue: 0.647), location: 1.00)
])`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-slate-600">
        <p className="mb-4">
          Built with ❤️ by{' '}
          <a 
            href="https://github.com/biasia-sudo" 
            className="text-purple-600 hover:text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            BIAsia
          </a>
        </p>
        <p className="text-sm">
          <a 
            href="https://github.com/biasia-sudo/gradients-skill" 
            className="text-slate-500 hover:text-slate-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        </p>
      </footer>
    </main>
  );
}
