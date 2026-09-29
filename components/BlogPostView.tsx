
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowLeft, MessageCircle, Send, CheckCircle, Zap, MapPin } from 'lucide-react';

interface BlogPostViewProps {
  postId: string;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ postId, onBack }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) return <div className="p-20 text-center">Post Not Found</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-brand-ash">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
          <button onClick={onBack} className="flex items-center text-brand-blue font-black uppercase text-xs tracking-widest mb-8 hover:text-brand-blue/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
          </button>
          <div className="flex gap-2 mb-6">
            <span className="bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              {post.category}
            </span>
            <span className="bg-brand-ash text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Warangal / Hanamkonda
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-ash leading-tight mb-4">{post.seo.h1}</h1>
          <div className="flex items-center gap-6 text-sm font-bold text-brand-ash/60">
             <span>By {post.author}</span>
             <span>•</span>
             <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div 
          className="prose prose-xl prose-slate max-w-none text-brand-ash/80 leading-relaxed seo-rich-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="my-16 bg-brand-blue/5 border-2 border-brand-blue/10 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-blue/10">
          <div className="max-w-md">
            <h3 className="text-3xl font-black text-brand-ash mb-4">Scale Your Brand in Hanamkonda</h3>
            <p className="text-brand-ash/80 font-medium">Our consultants in Warangal are ready to apply these insights to your business. Reach out now.</p>
          </div>
          <a 
            href={`https://wa.me/919010591950?text=Hello%20RAKS%20IT%20SOLUTIONS,%20I%20just%20read%20your%20blog%20post%20about%20${encodeURIComponent(post.title)}%20and%20want%20to%20discuss%20it.`}
            target="_blank"
            className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-green-700 transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1"
          >
            Chat with Experts <Send className="w-5 h-5" />
          </a>
        </div>

        {/* Blog FAQs */}
        <div className="mt-24">
          <h3 className="text-3xl font-black text-brand-ash mb-10">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {post.seo.faqs.map((faq, idx) => (
              <div key={idx} className="bg-brand-ash/5 p-8 rounded-3xl border border-brand-ash/10">
                <p className="font-black text-brand-ash mb-3 text-xl">{faq.question}</p>
                <p className="text-brand-ash/80 leading-relaxed font-medium">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
