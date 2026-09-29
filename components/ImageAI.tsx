import React, { useState } from 'react';
import { Sparkles, Download, ArrowLeft, Loader2, Wand2, MessageCircle, Instagram, Youtube, Facebook, Linkedin, Eye, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ImageAIProps {
  onBack: () => void;
}

interface SizePreset {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  ratio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  dimensions: string;
  description: string;
}

const SIZE_PRESETS: SizePreset[] = [
  {
    id: 'insta-square',
    name: 'Instagram Square',
    icon: Instagram,
    ratio: '1:1',
    dimensions: '1080 x 1080 px',
    description: 'Perfect for standard Instagram feed posts & profile pictures'
  },
  {
    id: 'yt-thumbnail',
    name: 'YouTube Thumbnail / Twitter',
    icon: Youtube,
    ratio: '16:9',
    dimensions: '1280 x 720 px',
    description: 'Optimized for high-click video thumbnails and landscape posts'
  },
  {
    id: 'story-shorts',
    name: 'Instagram Story / Shorts',
    icon: Instagram, // Reusing Instagram for story format
    ratio: '9:16',
    dimensions: '1080 x 1920 px',
    description: 'Ideal full-screen vertical size for Stories, Reels, and tik-tok'
  },
  {
    id: 'fb-linkedin',
    name: 'Facebook / LinkedIn Feed',
    icon: Linkedin,
    ratio: '4:3',
    dimensions: '1200 x 900 px',
    description: 'Best aspect ratio for professional social network articles'
  },
  {
    id: 'portrait-card',
    name: 'Pinterest / Editorial Portrait',
    icon: Facebook,
    ratio: '3:4',
    dimensions: '768 x 1024 px',
    description: 'Sophisticated taller layout for artistic assets and banners'
  }
];

const STYLE_PRESETS = [
  { id: 'cinematic', name: 'Cinematic Photorealistic', promptAdd: 'cinematic lighting, photorealistic, raw photos, depth of field, 8k resolution' },
  { id: 'minimalist', name: 'Tech Minimalist', promptAdd: 'modern clean UI design aesthetic, vectors, soft solid gradients, sleek technical outlines' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', promptAdd: 'vibrant futuristic cyberpunk aesthetic, glowing neon lights, dark synthwave colors, high contrast' },
  { id: '3d-octane', name: '3D Octane Render', promptAdd: 'cute 3D octane render, studio lighting, smooth plastic textures, vibrant pastels, game art style' },
  { id: 'flat-vector', name: 'Flat Professional Vector', promptAdd: 'flat corporate vector illustration, clean lines, corporate color palette, friendly tech design' },
  { id: 'watercolor', name: 'Watercolor Artistic', promptAdd: 'elegant watercolor painting, soft paint splashes, delicate botanical styling, artistic wallpaper' }
];

const ImageAI: React.FC<ImageAIProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedSize, setSelectedSize] = useState<SizePreset>(SIZE_PRESETS[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeMock, setActiveMock] = useState<'none' | 'feed' | 'youtube' | 'phone'>('none');

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const refinedPrompt = `${prompt}. Style: ${selectedStyle.promptAdd}. The design should look professional, spectacular, and be suitable for a high-quality ${selectedSize.name} layout with ${selectedSize.ratio} aspect ratio.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: refinedPrompt }] },
        config: {
          imageConfig: {
            aspectRatio: selectedSize.ratio,
          }
        }
      });

      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            // Automatically set best fitting mock interface on finish
            if (selectedSize.ratio === '1:1' || selectedSize.ratio === '4:3') {
              setActiveMock('feed');
            } else if (selectedSize.ratio === '16:9') {
              setActiveMock('youtube');
            } else if (selectedSize.ratio === '9:16') {
              setActiveMock('phone');
            } else {
              setActiveMock('none');
            }
            break;
          }
        }
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Generation failed or timed out. Please try again with a slightly different prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-brand-white min-h-screen">
      {/* Header Panel */}
      <div className="bg-brand-ash py-20 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-8 mx-auto hover:text-brand-blue/80 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Social Media <span className="text-brand-blue font-extrabold">Image AI</span>
          </h1>
          <p className="text-xl text-brand-white/60 max-w-2xl mx-auto font-medium">
            Generate customized social media posts, thumbnails, and vertical creative assets instantly. Powered by RAKS IT SOLUTIONS AI.
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 bg-brand-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-5 left-10 w-60 h-60 bg-brand-blue rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-24 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-brand-ash/10 space-y-8">
            
            {/* Aspect Ratios & Platforms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-brand-ash/50 uppercase tracking-widest block">1. Choose Content Size</span>
                <span className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded-full">
                  {selectedSize.ratio} Ratio
                </span>
              </div>
              <div className="space-y-3">
                {SIZE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedSize(preset);
                      if (generatedImage) {
                        if (preset.ratio === '1:1' || preset.ratio === '4:3') setActiveMock('feed');
                        else if (preset.ratio === '16:9') setActiveMock('youtube');
                        else if (preset.ratio === '9:16') setActiveMock('phone');
                        else setActiveMock('none');
                      }
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedSize.id === preset.id 
                        ? 'border-brand-blue bg-brand-blue/[0.02] shadow-sm' 
                        : 'border-brand-ash/10 hover:border-brand-blue/30 bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl flex items-center justify-center ${
                        selectedSize.id === preset.id ? 'bg-brand-blue text-white' : 'bg-brand-ash/5 text-brand-ash/60'
                      }`}>
                        <preset.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-brand-ash uppercase leading-none mb-1">{preset.name}</p>
                        <p className="text-[10px] text-brand-ash/60 leading-tight pr-6">{preset.description}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-black text-brand-blue shrink-0">{preset.dimensions}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Visual Styles */}
            <div>
              <span className="text-xs font-black text-brand-ash/50 uppercase tracking-widest block mb-4">2. Visual Style Presets</span>
              <div className="grid grid-cols-2 gap-3">
                {STYLE_PRESETS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      selectedStyle.id === style.id 
                        ? 'border-brand-blue bg-brand-blue text-white shadow-md' 
                        : 'border-brand-ash/10 hover:border-brand-blue/30 bg-brand-ash/5 text-brand-ash/80'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt input */}
            <div>
              <span className="text-xs font-black text-brand-ash/50 uppercase tracking-widest block mb-3">3. Describe What to Create</span>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                maxLength={400}
                className="w-full bg-brand-ash/5 border-2 border-brand-ash/10 rounded-2xl p-4 focus:border-brand-blue focus:ring-0 focus:outline-none transition-all font-bold text-brand-ash text-sm text-left align-top placeholder:text-brand-ash/30"
                placeholder="E.g. A futuristic glass boardroom overlooking Warangal city skyline with beautiful golden sunset lighting, high tech dashboard screens..."
              />
              <div className="flex justify-between text-[10px] text-brand-ash/40 font-bold mt-1.5 px-1">
                <span>Avoid simple words. Describe details, scene elements & colors.</span>
                <span>{prompt.length}/400</span>
              </div>
            </div>

            {/* Generate Trigger */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-blue/10 transition-all flex items-center justify-center gap-3 text-base uppercase tracking-wider"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {isGenerating ? 'Generating design assets...' : 'Generate My Image'}
            </button>

            <div className="flex items-center gap-2 justify-center py-2 bg-brand-ash/[0.02] border border-brand-ash/5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-[10px] uppercase font-black tracking-wider text-brand-ash/60">
                100% Free • Standard high resolution download
              </span>
            </div>
          </div>

          {/* Results & Live Mock-up Display (Right) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-brand-ash/10 flex flex-col items-center justify-center relative min-h-[500px] overflow-hidden">
              
              {generatedImage ? (
                <div className="w-full space-y-6 animate-in fade-in duration-700 flex flex-col items-center">
                  
                  {/* Mock Toggle Buttons */}
                  <div className="flex flex-wrap items-center gap-2 bg-brand-ash/5 p-1.5 rounded-2xl">
                    <button
                      onClick={() => setActiveMock('none')}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        activeMock === 'none' ? 'bg-white text-brand-ash shadow-md' : 'text-brand-ash/60 hover:text-brand-ash'
                      }`}
                    >
                      Raw Image
                    </button>
                    {(selectedSize.ratio === '1:1' || selectedSize.ratio === '4:3') && (
                      <button
                        onClick={() => setActiveMock('feed')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                          activeMock === 'feed' ? 'bg-white text-brand-blue shadow-md' : 'text-brand-ash/60 hover:text-brand-ash'
                        }`}
                      >
                        <Instagram className="w-3.5 h-3.5" /> Instagram Frame
                      </button>
                    )}
                    {selectedSize.ratio === '16:9' && (
                      <button
                        onClick={() => setActiveMock('youtube')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                          activeMock === 'youtube' ? 'bg-white text-red-600 shadow-md' : 'text-brand-ash/60 hover:text-brand-ash'
                        }`}
                      >
                        <Youtube className="w-3.5 h-3.5" /> YouTube Feed
                      </button>
                    )}
                    {selectedSize.ratio === '9:16' && (
                      <button
                        onClick={() => setActiveMock('phone')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                          activeMock === 'phone' ? 'bg-white text-green-600 shadow-md' : 'text-brand-ash/60 hover:text-brand-ash'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" /> Vertical Preview
                      </button>
                    )}
                  </div>

                  {/* Render Visual Container with different Mock styles */}
                  <div className="w-full max-w-[480px] flex justify-center bg-brand-ash/5 p-3 rounded-3xl border border-brand-ash/10">
                    
                    {activeMock === 'none' && (
                      <div className="w-full overflow-hidden rounded-2xl border border-brand-ash/10 shadow-lg bg-white">
                        <img 
                          src={generatedImage} 
                          alt="AI Generated Design" 
                          className="w-full h-auto object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {activeMock === 'feed' && (
                      <div className="w-full bg-white rounded-[2rem] border border-brand-ash/10 shadow-xl overflow-hidden text-left font-sans text-brand-ash max-w-[400px]">
                        {/* Header of post */}
                        <div className="flex items-center gap-3 p-4 border-b border-brand-ash/5">
                          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-black text-xs">
                            R
                          </div>
                          <div>
                            <p className="text-[11px] font-black capitalize">raks_it_solutions</p>
                            <p className="text-[9px] text-brand-ash/40 font-bold">Warangal, Telangana</p>
                          </div>
                          <span className="ml-auto text-xs font-bold text-brand-ash/40">•••</span>
                        </div>
                        {/* Image body */}
                        <img 
                          src={generatedImage} 
                          alt="Instagram feed design" 
                          className="w-full object-cover aspect-[4/3] sm:aspect-square" 
                          referrerPolicy="no-referrer"
                        />
                        {/* Under elements */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-4 text-brand-ash/80">
                            <span className="text-xl">❤️</span>
                            <span className="text-xl">💬</span>
                            <span className="text-xl">✈️</span>
                            <span className="ml-auto text-xl">🔖</span>
                          </div>
                          <p className="text-[10px] font-black">Liked by 241 local business owners</p>
                          <p className="text-[10px] leading-relaxed">
                            <span className="font-extrabold mr-1.5">raks_it_solutions</span>
                            Designed on #ImageAI platform optimized for Warangal businesses! What do you think of this visual? ✨
                          </p>
                        </div>
                      </div>
                    )}

                    {activeMock === 'youtube' && (
                      <div className="w-full bg-white rounded-2xl border border-brand-ash/10 shadow-xl overflow-hidden text-left font-sans text-brand-ash text-sm">
                        {/* Youtube Screen mockup */}
                        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center group/yt">
                          <img 
                            src={generatedImage} 
                            alt="YouTube player thumbnail preview" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          {/* Centered large play button */}
                          <div className="absolute w-14 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg pointer-events-none">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                          {/* Player UI bottom strip bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-ash/20">
                            <div className="h-full bg-red-600 w-1/3"></div>
                          </div>
                        </div>
                        {/* Video metadata description */}
                        <div className="p-4 space-y-1">
                          <h4 className="font-black text-xs leading-snug line-clamp-1">How We Scaled local Telangana businesses by 40% with high ROI strategy</h4>
                          <p className="text-[9px] text-brand-ash/50 font-black tracking-tight flex items-center gap-1.5">
                            <span>RAKS IT SOLUTIONS AI</span>
                            <span>•</span>
                            <span>12K views</span>
                            <span>•</span>
                            <span>2 hours ago</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {activeMock === 'phone' && (
                      <div className="relative bg-brand-ash rounded-[2.5rem] border-8 border-brand-ash shadow-2xl overflow-hidden mx-auto h-[480px] w-[270px]">
                        <img 
                          src={generatedImage} 
                          alt="Mobile vertical preview layout" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {/* Transparent Overlay with Stories Interface */}
                        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                          <span className="text-[9px] font-black text-white">RAKS IT STORIES</span>
                          <span className="text-[9px] text-white/50 ml-auto">12m</span>
                        </div>
                        {/* Story Progress Bars */}
                        <div className="absolute top-2 inset-x-4 flex gap-1 z-30">
                          <div className="h-0.5 bg-white flex-1"></div>
                          <div className="h-0.5 bg-white/40 flex-1"></div>
                        </div>
                        {/* Bottom Action Drawer */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-white">
                          <span className="text-[10px] font-black">Learn More about Tri-City Digital Sales...</span>
                          <span className="p-2 bg-white/20 rounded-full text-xs">➡️</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Trigger direct Download */}
                  <div className="w-full max-w-[400px] flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a 
                      href={generatedImage} 
                      download={`raks_image_ai_${selectedSize.id}_${Date.now()}.png`}
                      className="w-full bg-brand-ash hover:bg-brand-ash/90 text-white px-8 py-3.5 rounded-2xl font-black text-xs flex items-center gap-2 justify-center transition-all shadow-md active:scale-95 uppercase tracking-widest"
                    >
                      <Download className="w-4 h-4" /> Download High-Res
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 max-w-sm space-y-6">
                  <div className="w-24 h-24 bg-brand-blue/15 rounded-3xl flex items-center justify-center text-brand-blue mx-auto animate-pulse">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-brand-ash tracking-tight">Image AI Canvas</h3>
                    <p className="text-xs text-brand-ash/60 leading-relaxed font-bold">
                      Your high-resolution curated asset will render in this screen space. Select size, choose favorite presets, and write your prompt.
                    </p>
                  </div>
                  <div className="inline-flex gap-2 p-3 bg-brand-ash/5 rounded-2xl border border-brand-ash/5">
                    <span className="text-[9px] font-bold text-brand-blue leading-none bg-brand-blue/10 px-2 py-1 rounded w-max">
                      Ready to process
                    </span>
                    <span className="text-[9px] font-bold text-brand-ash/60 leading-tight">
                      Supported models: Gemini Pro & Flash Image
                    </span>
                  </div>
                </div>
              )}

              {/* Surrounding thin border outline to frame canvas */}
              <div className="absolute inset-0 pointer-events-none border-4 border-brand-ash/5 rounded-[2.5rem]"></div>
            </div>

            {/* Premium CTA Box underneath representation */}
            <div className="bg-brand-blue/5 border-2 border-brand-blue/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-brand-blue/5">
              <div className="space-y-3 max-w-md">
                <h4 className="text-2xl font-black text-brand-ash tracking-tight leading-none">Need bespoke media matching your active campaigns?</h4>
                <p className="text-brand-ash/70 text-xs leading-relaxed font-bold">
                  Our professional creative designers in Hanamkonda can build full identity kits, dynamic motion graphics, and robust offline banners matching your localized growth strategy.
                </p>
              </div>
              <a 
                href="https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I'm%20using%20the%20Image%20AI%20and%20want%20to%20consult%20on%20professional%20digital%20branding."
                target="_blank"
                className="bg-brand-blue text-white hover:bg-brand-blue/90 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 group whitespace-nowrap"
              >
                Let's Partner Up
                <MessageCircle className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageAI;
