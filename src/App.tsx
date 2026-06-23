import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Code2, Layout, Terminal, Target, Lightbulb, TrendingUp, Briefcase, CheckCircle2 } from 'lucide-react';
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
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-dark/70 backdrop-blur-2xl py-4 border-b border-white/10 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter group flex items-center gap-2"
        >
          <div className="relative w-12 h-12 bg-bg-light text-bg-dark flex items-center justify-center rounded-2xl group-hover:bg-accent group-hover:text-bg-dark transition-all duration-500 group-hover:rotate-12 shadow-xl">
            A
            <div className="absolute -inset-1 bg-accent/20 blur-lg rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-bg-light group-hover:text-accent transition-colors font-black tracking-tight">SAMAD</span>
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
              className="text-[10px] font-black uppercase tracking-[0.3em] text-bg-light hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="https://www.linkedin.com/in/samadkhan123/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-bg-light hover:text-accent transition-colors"
          >
            <Linkedin size={14} />
            LinkedIn
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all active:scale-90 text-bg-light" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden bg-bg-dark/98 backdrop-blur-3xl fixed inset-0 z-[100] flex flex-col items-center justify-center"
          >
            <button className="absolute top-8 right-8 p-3 bg-white/10 rounded-2xl text-bg-light" onClick={() => setIsOpen(false)}>
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
                  className="text-5xl font-black tracking-tighter text-bg-light hover:text-accent transition-colors"
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
    <section ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 flex items-center relative overflow-hidden bg-bg-dark">
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />

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
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-bg-light"
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
  className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-white"
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
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-bg-light"
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
                 Full-stack developer working with MERN and WordPress, with backend experience from a .NET internship. Currently seeking a junior developer role to contribute to real projects and grow in a team environment.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects" 
                    className="bg-accent text-bg-dark px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-bg-light transition-all flex items-center gap-2 group shadow-xl shadow-accent/20"
                  >
                    View Work
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact" 
                    className="bg-white/5 backdrop-blur-xl border border-white/20 text-bg-light px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-accent transition-all"
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

const About = () => {
  const stats = [
    { value: '6+', label: 'Projects Shipped' },
    { value: '10+', label: 'Technologies' },
    { value: '2', label: 'Internships' },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-bg-dark text-bg-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: heading + bio */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.5em] text-secondary uppercase mb-4 block"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 text-bg-light"
            >
              FROM IDEA TO<br />SHIPPED PRODUCT
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-6 text-secondary text-base lg:text-lg leading-relaxed max-w-2xl"
            >
              <p>
                I'm a junior full-stack developer working across two stacks: the MERN stack (React,
                Node.js, Express, MongoDB) for building web applications and APIs, and WordPress for
                client websites and CMS-based projects — custom themes, plugins, ACF, and custom post
                types. Both are real, hands-on skills I use on actual projects, not one main stack and
                a side skill.
              </p>
              <p>
                I also have backend exposure through a .NET internship, where I worked on an
                enterprise-level system — production modules, bug fixes, and real team workflows.
              </p>
              <p>
                I focus on writing maintainable, structured code and building systems that are designed to
                last — not just prototypes.
              </p>
            </motion.div>
          </div>

          {/* Right: stat cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 lg:pt-32">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col gap-2 hover:border-accent transition-colors"
              >
                <span className="text-3xl lg:text-4xl font-black tracking-tighter text-bg-light">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    {
      role: 'Full-Stack Developer Intern',
      company: 'Murkez',
      project: 'ECW Global',
      tagline: 'Nonprofit Website',
      link: 'https://ecw-global.org/',
      points: [
        'Worked on a live production website for a nonprofit organization',
        'Built and maintained frontend features using a modern web stack',
        'Developed and customized website sections using WordPress (themes, plugins, and page builders)',
        'Improved UI components and overall responsiveness across devices',
        'Collaborated with a development team on a production-level codebase'
      ]
    },
    {
      role: '.NET Developer Intern',
      company: 'Lumensoft',
      project: 'Nimbus RMS',
      tagline: 'Enterprise System',
      link: 'https://www.nimbusrms.com/',
      points: [
        'Contributed to the development of Nimbus RMS, an enterprise-level system',
        'Developed backend features using ASP.NET',
        'Worked on production modules, bug fixes, and system improvements',
        'Gained experience in real-world software development workflows and team collaboration'
      ]
    }
  ];

  return (
    <section id="experience" className="py-40 px-6 bg-bg-dark text-bg-light relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Work History</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">EXPERIENCE</h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 hover:border-accent/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">{job.role}</h3>
                    <p className="text-accent font-bold tracking-widest uppercase text-xs mt-1">{job.company}</p>
                    <p className="text-secondary text-xs mt-2">
                      Project: <span className="text-bg-light font-semibold">{job.project}</span> ({job.tagline})
                    </p>
                  </div>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-white/10 px-5 py-3 rounded-full bg-white/5 hover:border-accent hover:text-accent transition-all shrink-0 self-start md:self-auto"
                >
                  Visit Site
                  <ExternalLink size={12} />
                </a>
              </div>

              <ul className="flex flex-col gap-4">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-secondary text-sm lg:text-base leading-relaxed">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: '01',
      title: 'Map My Trip',
      subtitle: 'Tourism in Pakistan',
      problem: 'Travelers exploring Pakistan\'s northern regions had no single platform combining trip planning, local guidance, and booking — forcing them to piece together info from scattered sources.',
      solution: 'Built a MERN travel platform with an AI chatbot for historical/travel guidance, multilingual support, interactive OpenStreetMap exploration of Hunza, Swat, and Skardu, and an end-to-end trip booking flow for tours, hotels, and transport.',
      impact: 'A single platform that takes a traveler from discovery to booked itinerary, with AI guidance replacing the need for a human travel agent.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'OpenStreetMap'],
      role: 'Full Stack Developer',
      animation: <MapAnimation />,
      link: 'https://github.com/Samad123-byte/map-my-trip.git'
    },
    {
      id: '02',
      title: 'QuickGPT',
      subtitle: 'AI-Powered Platform',
      problem: 'AI chat and image-generation tools are powerful but expensive to run at scale — most side projects either have no usage controls or no monetization path.',
      solution: 'Built a MERN AI platform with chat and image generation, gated by a credit-based usage system. When a user\'s credits run low, they can purchase more through a secure Stripe checkout.',
      impact: 'A working model for sustainably offering AI features to end users without absorbing unlimited API costs.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'OpenAI API', 'ImageKit'],
      role: 'Full Stack Developer',
      animation: <AIAnimation />,
      link: 'https://github.com/Samad123-byte/QuickGPT.git'
    },
    {
      id: '03',
      title: 'Chatsphere',
      subtitle: 'Real-Time Chat Application',
      problem: 'Real-time messaging needs instant delivery, accurate presence status, and secure auth — getting any one of those wrong breaks the experience.',
      solution: 'Built a full-stack MERN chat app with live messaging via Socket.io, real-time online/offline presence, JWT + cookie authentication, and image sharing through Cloudinary.',
      impact: 'A responsive, secure chat experience with sub-second message delivery and reliable session handling.',
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
            Each project below: the problem it solves, how I built it, and the result.
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
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-6 lg:mb-8">{project.subtitle}</p>

                {/* Problem / Solution / Impact */}
                <div className="flex flex-col gap-5 mb-8 lg:mb-10">
                  <div className="flex gap-3">
                    <Target size={16} className="text-accent shrink-0 mt-1" />
                    <p className="text-secondary text-sm lg:text-base leading-relaxed">
                      <span className="text-bg-light font-bold uppercase tracking-wider text-[10px] mr-2">Problem</span><br />
                      {project.problem}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Lightbulb size={16} className="text-accent shrink-0 mt-1" />
                    <p className="text-secondary text-sm lg:text-base leading-relaxed">
                      <span className="text-bg-light font-bold uppercase tracking-wider text-[10px] mr-2">Solution</span><br />
                      {project.solution}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={16} className="text-accent shrink-0 mt-1" />
                    <p className="text-secondary text-sm lg:text-base leading-relaxed">
                      <span className="text-bg-light font-bold uppercase tracking-wider text-[10px] mr-2">Impact</span><br />
                      {project.impact}
                    </p>
                  </div>
                </div>

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
      title: 'Full-Stack Development',
      icon: <Layout size={24} />,
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
      note: 'Building full web applications and APIs'
    },
    {
      title: 'WordPress Development',
      icon: <Code2 size={24} />,
      skills: ['Custom Themes', 'Plugins', 'Elementor Pro', 'ACF', 'CPT UI'],
      note: 'Client websites and CMS-based solutions'
    },
    {
      title: 'Backend & Exposure',
      icon: <Terminal size={24} />,
      skills: ['ASP.NET', 'Enterprise Modules', 'Bug Fixing'],
      note: 'Internship experience in production systems'
    },
    {
      title: 'Tools',
      icon: <Terminal size={24} />,
      skills: ['Git', 'Docker', 'Postman', 'VS Code', 'Vercel'],
      note: 'Day-to-day development workflow'
    }
  ];

  return (
    <section id="skills" className="py-40 px-6 bg-bg-dark text-bg-light relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
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
              className="bg-white/5 p-8 lg:p-10 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all duration-500 group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-accent/30 transition-colors duration-500">
                {cat.icon}
              </div>

              <h3 className="text-base lg:text-lg font-bold tracking-tight mb-1 group-hover:text-accent transition-colors">
                {cat.title}
              </h3>
              <p className="text-secondary text-xs leading-relaxed mb-8">{cat.note}</p>

              <div className="flex flex-col gap-4 mt-auto">
                {cat.skills.map(skill => (
                  <div key={skill} className="flex items-center gap-3 group/item">
                    <div className="w-2 h-2 bg-white/20 group-hover/item:bg-accent rounded-full transition-colors shrink-0" />
                    <span className="font-bold text-sm tracking-tight text-bg-light">{skill}</span>
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
    <section id="github" className="py-40 px-6 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 text-bg-light rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl"
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
    <section id="contact" className="py-40 px-6 bg-bg-dark text-bg-light">
      <div className="max-w-7xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold tracking-[0.5em] text-secondary uppercase mb-6 block"
        >
          Get in Touch
        </motion.span>
       <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 text-white uppercase">
  LET'S WORK <br />
  <span className="text-white/80">TOGETHER</span>
</h2>
        
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
    <footer className="py-20 px-6 border-t border-white/10 bg-bg-dark text-bg-light">
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
    <div className="overflow-x-hidden selection:bg-accent selection:text-bg-dark bg-bg-dark text-bg-light font-sans">
      <div className="noise" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GitHubHighlights />
      <HireMeStats />
      <Contact />
      <Footer />
    </div>
  );
}