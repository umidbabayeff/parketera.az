import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Baku White City Resident', image: '/images/project1.png', category: 'Modern' },
  { id: 2, title: 'Port Baku Residence', image: '/images/project2.png', category: 'Classic' },
  { id: 3, title: 'Sea Breeze Villa', image: '/images/hero.png', category: 'Luxury' },
  { id: 4, title: 'Yasamal Office Center', image: '/images/massive.png', category: 'Corporate' }
];

const Projects = () => {
  return (
    <div className="pt-32 pb-20 bg-bg-dark">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <div className="mb-20">
          <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Layihələrimiz</span>
          <h1 className="text-5xl md:text-7xl font-display leading-tight">İmza <span className="luxury-gradient italic">İşlərimiz</span></h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-video bg-neutral-900 border border-white/5"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <span className="text-accent-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  {project.category}
                </span>
                <h3 className="text-3xl font-display text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
