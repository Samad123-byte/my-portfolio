import { motion } from 'motion/react';
import { ArrowUpRight, Layers, LayoutTemplate, Sparkles, Briefcase } from 'lucide-react';

const capabilityCards = [
  {
    icon: <Layers size={22} />,
    title: 'Full-Stack Applications',
    description:
      'Build responsive and scalable web applications using React, Node.js, Express, and MongoDB, from authentication to deployment.',
  },
  {
    icon: <LayoutTemplate size={22} />,
    title: 'WordPress Solutions',
    description:
      'Develop custom WordPress themes, plugins, ACF-powered websites, WooCommerce stores, and business CMS solutions.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'AI-Powered Features',
    description:
      'Integrate AI assistants, chatbots, content generation, and automation using Gemini, OpenAI, and OpenRouter APIs.',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Production Experience',
    description:
      'Contributed to production websites and enterprise software through professional internships and collaborative development.',
  },
];

const liveStats = [
  { value: '7+', label: 'Projects Delivered' },
  { value: '3+', label: 'Live Production Sites' },
  { value: '3', label: 'Stacks — MERN, WordPress, .NET' },
  { value: '1 Year', label: 'Professional Experience' },
];

const marqueeTech = [
  'React', 'Node.js', 'Express', 'MongoDB', 'WordPress', 'PHP', 'ACF', 'REST API', 'Socket.io', 'OpenAI', 'Gemini', 'Git', 'Docker',
];

const HireMeStats = () => {
  return (
    <section className="relative py-40 px-6 bg-bg-dark text-bg-light overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-[-100px] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-20 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Why Hire Me</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">HOW I CAN HELP</h2>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {capabilityCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-accent transition-all duration-500 group flex flex-col gap-6 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-bg-dark transition-all duration-500">
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-secondary text-xs leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Stats — what kind of work I can actually handle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full"
        >
          {liveStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col gap-2 text-center items-center hover:border-accent transition-colors"
            >
              <span className="text-3xl lg:text-4xl font-black tracking-tighter text-accent">{stat.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Technologies — moved to a quiet scrolling strip at the bottom */}
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-10" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
            className="flex gap-10 whitespace-nowrap w-max"
          >
            {[...marqueeTech, ...marqueeTech].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-2xl md:text-3xl font-bold tracking-tight text-bg-light/20 flex items-center gap-10"
              >
                {tech}
                <span className="text-accent/40">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <a
            href="mailto:abdulsammadk5@gmail.com"
            className="bg-accent text-bg-dark px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-accent/30 flex items-center gap-2"
          >
            Email Me <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/samadkhan123/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-accent hover:text-bg-dark transition-all shadow-lg shadow-accent/20"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMeStats;