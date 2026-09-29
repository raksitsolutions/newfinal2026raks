
import React, { useState, useEffect } from 'react';
import { adminStore } from '../services/adminStore';
import { Testimonial } from '../types';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => adminStore.getTestimonials());

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setTestimonials(adminStore.getTestimonials());
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand-blue font-black uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl sm:text-5xl font-black text-brand-ash mb-6">What Our Clients Say</h3>
          <p className="text-xl text-brand-ash/60 max-w-2xl mx-auto font-medium">
            Join the hundreds of satisfied business owners who have scaled their growth with RAKS IT SOLUTIONS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative bg-brand-ash/5 p-10 rounded-[3rem] border border-brand-ash/10 hover:shadow-2xl transition-all duration-500 group"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors" />
              
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-lg text-brand-ash/80 leading-relaxed mb-10 italic font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg mr-4"
                />
                <div>
                  <h4 className="font-black text-brand-ash">{testimonial.name}</h4>
                  <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
