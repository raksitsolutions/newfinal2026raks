
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowLeft, ArrowRight, BookOpen, Clock, User } from 'lucide-react';

interface BlogHubProps {
  onSelectPost: (id: string) => void;
  onBack: () => void;
}

const BlogHub: React.FC<BlogHubProps> = ({ onSelectPost, onBack }) => {
  return (
    <div className="bg-brand-ash/5 min-h-screen pb-24">
      <div className="bg-brand-ash py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button onClick={onBack} className="flex items-center text-brand-blue font-bold mb-8 hover:text-brand-blue/80 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Insightful <span className="text-brand-blue">Tech Stories</span>.</h1>
          <p className="text-xl text-brand-white/60 max-w-2xl">Expert perspectives on digital growth, web engineering, and marketing strategy in Telangana.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-brand-ash/10 group cursor-pointer transition-all hover:-translate-y-2"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 text-xs font-bold text-brand-ash/40 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-black text-brand-ash mb-4 group-hover:text-brand-blue transition-colors leading-tight">{post.title}</h3>
                <p className="text-brand-ash/60 mb-8 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest group-hover:gap-2 transition-all">
                  Read Full Article <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHub;
