import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, FileText, ArrowUpRight, ExternalLink, Code2, Database, Layout, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import HireMeStats from './components/HireMeStats';
import { MapAnimation, AIAnimation, ChatAnimation } from './components/ProjectAnimations';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-accent rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(124, 255, 107, 0.2)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-light/60 backdrop-blur-2xl py-4 border-b border-white/10 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter group flex items-center gap-2"
        >
          <div className="relative w-12 h-12 bg-primary text-bg-light flex items-center justify-center rounded-2xl group-hover:bg-accent group-hover:text-bg-dark transition-all duration-500 group-hover:rotate-12 shadow-xl">
            A
            <div className="absolute -inset-1 bg-accent/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="group-hover:text-accent transition-colors font-black tracking-tight">&lt;SAMAD.K /&gt;</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="https://www.linkedin.com/in/samadkhan123/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors"
          >
            <Linkedin size={14} />
            LinkedIn
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all active:scale-90" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden bg-bg-light/95 backdrop-blur-3xl fixed inset-0 z-[100] flex flex-col items-center justify-center"
          >
            <button className="absolute top-8 right-8 p-3 bg-white/10 rounded-2xl" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black tracking-tighter hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nameVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 flex items-center relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-16 h-[1px] bg-accent" />
            <span className="text-[10px] font-black tracking-[0.6em] text-secondary uppercase">
              Full Stack Developer
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
            <div className="lg:col-span-7">
              <div className="flex flex-col items-start w-full">
                <div className="overflow-hidden w-full">
                  <motion.h1 
                    custom={0}
                    variants={nameVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-primary"
                  >
                    ABDUL
                  </motion.h1>
                </div>
                <div className="overflow-hidden w-full">
                  <motion.h1 
                    custom={1}
                    variants={nameVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-stroke"
                  >
                    SAMAD
                  </motion.h1>
                </div>
                <div className="overflow-hidden w-full">
                  <motion.h1 
                    custom={2}
                    variants={nameVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-primary"
                  >
                    KHAN
                  </motion.h1>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col gap-8"
              >
                <p className="text-base md:text-lg text-secondary leading-relaxed font-medium max-w-md">
                I’m a junior MERN developer passionate about creating full-stack web applications that are scalable, high-performance, and user-friendly. I love turning ideas into real projects and am eager to contribute to innovative teams.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects" 
                    className="bg-primary text-bg-light px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-bg-dark transition-all flex items-center gap-2 group shadow-xl"
                  >
                    View Work
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact" 
                    className="bg-white/5 backdrop-blur-xl border border-primary px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-bg-light transition-all"
                  >
                    Let's Talk
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary">Scroll</span>
        <motion.div 
          animate={{ height: [0, 64, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[2px] bg-accent" 
        />
      </motion.div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: '01',
      title: 'Map My Trip',
      subtitle: 'Tourism in Pakistan',
      description: "A MERN-based travel platform designed to promote tourism in Pakistan’s northern regions. It features an AI-powered chatbot that provides historical and travel guidance, multilingual support to cater to users from different countries, interactive maps using OpenStreetMap to explore locations like Hunza, Swat, and Skardu, and a customizable trip booking system where users can select tours, hotels, and transportation.",
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'OpenStreetMap'],
      role: 'Full Stack Developer',
      animation: <MapAnimation />,
      link: 'https://github.com/Samad123-byte/map-my-trip.git'
    },
    {
      id: '02',
      title: 'QuickGPT',
      subtitle: 'AI-Powered Platform',
      description: "QuickGPT is a MERN-based AI platform that provides chat, image generation, and a credit-based usage system. Users are allocated 'card hours' that allow them to interact with the AI for text or image generation. When hours run low, they can securely purchase additional credits via Stripe.",
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'OpenAI API', 'ImageKit'],
      role: 'Full Stack Developer',
      animation: <AIAnimation />,
      link: 'https://github.com/Samad123-byte/QuickGPT.git'
    },
    {
      id: '03',
      title: 'Chatsphere',
      subtitle: 'Real-Time Chat Application',
      description: "Chatsphere is a full-stack MERN-based real-time chat application that enables users to communicate instantly with live messaging powered by Socket.io. It features real-time online/offline user status, secure authentication using JWT and cookies, and seamless image sharing through Cloudinary.",
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Cloudinary', 'DaisyUI'],
      role: 'Full Stack Developer',
      animation: <ChatAnimation />,
      link: 'https://github.com/Samad123-byte/ChatSphere.git'
    }
  ];

  return (
    <section id="projects" className="bg-bg-dark text-bg-light py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Case Studies</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">SELECTED <br />PROJECTS</h2>
          </div>
          <p className="text-secondary max-w-sm text-lg leading-relaxed">
            A curated selection of my latest work, focusing on performance, scalability, and user experience.
          </p>
        </motion.div>

        <div className="flex flex-col gap-48">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center"
            >
              {/* Text Content */}
              <div className={`lg:col-span-5 order-2 ${i % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <span className="text-4xl lg:text-5xl font-bold text-white/5">&lt;{project.id}&gt;</span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                
                <h3 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-4">{project.title}</h3>
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-4 lg:mb-8">{project.subtitle}</p>
                
                <p className="text-secondary text-base lg:text-lg mb-8 lg:mb-10 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 lg:gap-3 mb-8 lg:mb-12">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full bg-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <motion.a 
                  whileHover={{ x: 10 }}
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-4 group"
                >
                  <span className="font-bold text-sm uppercase tracking-[0.2em] group-hover:text-accent transition-colors">View Project</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-bg-dark transition-all">
                    <ExternalLink size={18} />
                  </div>
                </motion.a>
              </div>

              {/* Animation Content - Side-by-side on mobile using a nested grid or flex */}
              <div className={`lg:col-span-7 relative group order-1 ${i % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div 
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-[2rem] border border-white/5 glow-hover transition-all duration-700 aspect-[4/3] relative bg-white/5"
                >
                  {project.animation}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </motion.div>
                
                <div className="absolute -top-6 -right-6 bg-accent text-bg-dark p-6 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hidden lg:block rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  {project.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: <Layout size={24} />,
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'daisyUI']
    },
    {
      title: 'Backend',
      icon: <Terminal size={24} />,
      skills: ['Node.js', 'Express', '.NET', 'REST APIs', 'Auth Systems']
    },
    {
      title: 'Database',
      icon: <Database size={24} />,
      skills: ['MongoDB', 'PostgreSQL']
    },
    {
      title: 'Tools',
      icon: <Code2 size={24} />,
      skills: ['Git', 'Docker', 'Postman', 'VS Code', 'Vercel']
    }
  ];

  return (
    <section id="skills" className="py-40 px-6 bg-bg-light relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.5em] text-secondary uppercase mb-4 block"
          >
            Capabilities
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">TECHNICAL STACK</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] border border-border hover:border-accent transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-border group-hover:text-accent/20 transition-colors duration-500">
                {cat.icon}
              </div>
              
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-secondary mb-10 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <div className="flex flex-col gap-5">
                {cat.skills.map(skill => (
                  <div key={skill} className="flex items-center gap-4 group/item">
                    <div className="w-2 h-2 bg-border group-hover/item:bg-accent rounded-full transition-colors" />
                    <span className="font-bold text-sm tracking-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitHubHighlights = () => {
  return (
    <section id="github" className="py-40 px-6 bg-bg-light">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-bg-dark text-bg-light rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Open Source</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">BUILDING IN <br />THE PUBLIC</h2>
              <p className="text-secondary text-xl mb-12 leading-relaxed">
                I believe in sharing knowledge and building tools that help others. Explore my repositories for MERN stack boilerplate, AI integrations, and experimental UI components.
              </p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Samad123-byte" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-accent text-bg-dark px-12 py-6 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-accent/20"
              >
                <Github size={24} />
                Follow on GitHub
              </motion.a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { name: 'map-my-trip', desc: 'Full-stack travel booking platform with AI-powered assistance.', lang: 'JavaScript' },
                { name: 'QuickGPT', desc: 'Advanced AI interaction suite featuring chat and image generation.', lang: 'JavaScript' },
                { name: 'NASA-app', desc: "Data-driven space exploration interface utilizing NASA's public APIs.", lang: 'JavaScript' },
                { name: 'mern-ThinkBoard', desc: 'Real-time collaborative workspace built with the MERN stack.', lang: 'JavaScript' }
              ].map((repo) => (
                <motion.a 
                  key={repo.name} 
                  href={`https://github.com/Samad123-byte/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, borderColor: 'rgba(124, 255, 107, 0.5)' }}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm group/repo transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">{repo.lang}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover/repo:text-accent transition-colors">{repo.name}</h4>
                  <p className="text-[10px] text-secondary leading-tight line-clamp-2">{repo.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-40 px-6 bg-bg-light">
      <div className="max-w-7xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold tracking-[0.5em] text-secondary uppercase mb-6 block"
        >
          Get in Touch
        </motion.span>
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12">LET'S WORK <br /><span className="text-stroke">TOGETHER</span></h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.a 
            whileHover={{ scale: 1.1 }}
            href="mailto:abdulsammadk5@gmail.com" 
            className="text-2xl md:text-4xl font-bold hover:text-accent transition-colors flex items-center gap-4"
          >
            <Mail size={40} />
            abdulsammadk5@gmail.com
          </motion.a>
          <div className="w-2 h-2 bg-accent rounded-full hidden md:block" />
          <motion.a 
            whileHover={{ scale: 1.1 }}
            href="https://www.linkedin.com/in/samadkhan123/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl md:text-4xl font-bold hover:text-accent transition-colors flex items-center gap-4"
          >
            <Linkedin size={40} />
            LinkedIn
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border bg-bg-dark text-bg-light">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-2xl tracking-tighter mb-2"
          >
            ABDUL SAMAD KHAN
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary text-xs font-bold uppercase tracking-widest"
          >
            Full Stack Developer
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-6 text-xl"
        >
          <a href="mailto:abdulsammadk5@gmail.com" className="hover:text-accent transition-colors"><Mail size={24} /></a>
          <a href="https://github.com/Samad123-byte" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Github size={24} /></a>
          <a href="https://www.linkedin.com/in/samadkhan123/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin size={24} /></a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-secondary text-[10px] font-bold uppercase tracking-widest text-center md:text-right"
        >
          © 2026 All Rights Reserved
        </motion.p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="overflow-x-hidden selection:bg-accent selection:text-bg-dark bg-bg-light text-bg-dark font-sans">
      <div className="noise" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <GitHubHighlights />
      <HireMeStats />
      <Contact />
      <Footer />
    </div>
  );
}
