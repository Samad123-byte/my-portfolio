import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const HireMeStats = () => {
  return (
  <section className="relative py-40 px-6 bg-bg-dark text-bg-light overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 left-[-150px] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-[-100px] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-12 relative z-10">
        
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold tracking-tighter mb-6"
        >
          Why You Should Hire Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-secondary text-lg leading-relaxed max-w-3xl"
        >
          I am a highly motivated Junior MERN Developer who turns ideas into scalable, user-friendly web applications. 
          I have built multiple full-stack projects using React, Node.js, Express, and MongoDB, showcasing my ability 
          to handle both frontend and backend development seamlessly. My passion for AI in web apps and modern technologies drives me to continuously learn and improve.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-secondary text-lg leading-relaxed max-w-3xl"
        >
          I am eager to contribute to real-world projects, collaborate with teams, and deliver high-quality results. 
          Hiring me means gaining a developer who is adaptable, reliable, and fully committed to creating excellent products.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center mt-8"
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

        {/* Optional subtle highlight bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[2px] w-1/3 bg-accent mt-16 origin-left"
        />
      </div>
    </section>
  );
};

export default HireMeStats;
