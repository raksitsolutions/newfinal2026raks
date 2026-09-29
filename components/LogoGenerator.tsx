
import React, { useState } from 'react';
import { Sparkles, Download, ArrowLeft, Loader2, Wand2, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface LogoGeneratorProps {
  onBack: () => void;
}

const LogoGenerator: React.FC<LogoGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [brandName, setBrandName] = useState('');
  const [style, setStyle] = useState('Modern & Minimalist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brandName || isGenerating) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const fullPrompt = `A professional high-quality logo for a company named "${brandName}". Style: ${style}. Context: ${prompt}. The logo should be clean, iconic, and suitable for branding. White or transparent-style background. 4k resolution.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Logo generation error:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-brand-ash/5 min-h-screen">
      <div className="bg-brand-ash py-20 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-bold mb-8 mx-auto hover:text-brand-blue/80 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl font-black mb-6">AI Brand <span className="text-brand-blue">Logo Generator</span></h1>
          <p className="text-xl text-brand-white/60 max-w-2xl mx-auto">
            Design professional, high-resolution logos for your business instantly. Powered by RAKS IT SOLUTIONS AI.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-brand-blue rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 mb-20">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-brand-ash/10 grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-black text-brand-ash/40 uppercase tracking-widest mb-3">Brand Name</label>
              <input 
                type="text" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-brand-ash/5 border-2 border-brand-ash/10 rounded-2xl px-6 py-4 focus:border-brand-blue focus:outline-none transition-all font-bold text-brand-ash"
                placeholder="Enter Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-brand-ash/40 uppercase tracking-widest mb-3">Logo Style</label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-brand-ash/5 border-2 border-brand-ash/10 rounded-2xl px-6 py-4 focus:border-brand-blue focus:outline-none transition-all font-bold text-brand-ash appearance-none"
              >
                <option>Modern & Minimalist</option>
                <option>Vintage & Retro</option>
                <option>Tech & Futuristic</option>
                <option>Luxury & Elegant</option>
                <option>Playful & Vibrant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-brand-ash/40 uppercase tracking-widest mb-3">Describe Your Business (Optional)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full bg-brand-ash/5 border-2 border-brand-ash/10 rounded-2xl px-6 py-4 focus:border-brand-blue focus:outline-none transition-all font-bold text-brand-ash"
                placeholder="E.g. Real estate company specializing in luxury villas..."
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !brandName}
              className="w-full bg-brand-blue hover:bg-brand-blue/80 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-blue/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
              {isGenerating ? 'Generating Logo...' : 'Generate My Logo'}
            </button>
            <p className="text-xs text-center text-brand-ash/40 font-bold uppercase tracking-tighter">
              Free to use • Powered by Gemini 2.5 Flash
            </p>
          </div>

          <div className="bg-brand-ash/5 rounded-[2.5rem] border-2 border-dashed border-brand-ash/10 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
            {generatedImage ? (
              <div className="w-full animate-in fade-in duration-1000">
                <img src={generatedImage} alt="AI Generated Logo" className="w-full h-auto rounded-3xl shadow-2xl" />
                <a 
                  href={generatedImage} 
                  download={`${brandName}-logo.png`}
                  className="mt-8 bg-brand-ash text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-ash/80 transition-all justify-center"
                >
                  <Download className="w-5 h-5" /> Download High-Res
                </a>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue mx-auto mb-6">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-brand-ash mb-2">Your Logo Will Appear Here</h4>
                <p className="text-brand-ash/60 max-w-[200px] mx-auto text-sm">
                  Enter your details and click generate to see AI magic.
                </p>
              </div>
            )}
            
            <div className="absolute inset-0 pointer-events-none border-4 border-white/40 rounded-[2.5rem]"></div>
          </div>
        </div>

        {/* Logo Generator CTA */}
        <div className="mt-20 bg-brand-blue rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-brand-blue/20">
          <h3 className="text-3xl font-black mb-6">Need a Custom Brand Identity?</h3>
          <p className="text-brand-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Our human designers in Warangal can take your AI-generated concept and turn it into a complete, professional brand package.
          </p>
          <a 
            href="https://wa.me/919010591950"
            target="_blank"
            className="inline-flex items-center gap-3 bg-white text-brand-blue px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-blue/5 transition-all shadow-xl"
          >
            Consult with Designers <MessageCircle className="w-6 h-6 text-green-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;
