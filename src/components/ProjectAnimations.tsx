// components/ProjectAnimations.tsx
import { motion, AnimatePresence } from 'motion/react';
import { useMemo } from 'react';
import {
  MessageSquare,
  Cpu,
  Car,
  Mountain,
  Cloud,
  Trees as Tree,
  Globe,
  Heart,
  Users
} from 'lucide-react';

export const MapAnimation = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden rounded-[2rem]">
      {/* Mountains */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 w-full flex items-end justify-around opacity-40"
      >
        <Mountain size={200} className="text-slate-600 -mb-10" />
        <Mountain size={300} className="text-slate-700 -mb-20" />
        <Mountain size={250} className="text-slate-600 -mb-15" />
      </motion.div>

      {/* Clouds */}
      <motion.div
        animate={{ x: [-100, 600] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform' }}
        className="absolute top-10 left-0 text-white/80"
      >
        <Cloud size={80} />
      </motion.div>
      <motion.div
        animate={{ x: [600, -100] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform' }}
        className="absolute top-32 left-0 text-white/60"
      >
        <Cloud size={50} />
      </motion.div>

      {/* Winding Road */}
      <svg className="absolute bottom-0 w-full h-32 opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
        <motion.path
          d="M0,80 Q100,20 200,80 T400,20"
          fill="none"
          stroke="white"
          strokeWidth="40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </svg>

      {/* Car */}
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          offsetDistance: { duration: 10, repeat: Infinity, ease: "linear" },
          rotate: { duration: 0.5, repeat: Infinity }
        }}
        style={{
          offsetPath: "path('M-50,80 Q100,20 200,80 T450,20')",
          position: 'absolute',
          willChange: 'transform'
        }}
        className="text-accent"
      >
        <div className="relative">
          <Car size={48} fill="currentColor" />
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute -left-4 top-1/2 w-6 h-2 bg-orange-500/80 blur-md"
          />
        </div>
      </motion.div>

      {/* Trees */}
      <div className="absolute bottom-16 w-full flex justify-between px-10 opacity-60">
        <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}><Tree className="text-emerald-800" size={40} /></motion.div>
        <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity }}><Tree className="text-emerald-900" size={50} /></motion.div>
        <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity }}><Tree className="text-emerald-800" size={30} /></motion.div>
      </div>
    </div>
  );
};

export const AIAnimation = () => {
  // Computed once on mount instead of every re-render — avoids layout
  // thrash from new random positions being assigned repeatedly.
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-[2rem] flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20"
           style={{ backgroundImage: 'linear-gradient(#7cff6b 1px, transparent 1px), linear-gradient(90deg, #7cff6b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Central AI Core */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            "0 0 20px rgba(124, 255, 107, 0.2)",
            "0 0 60px rgba(124, 255, 107, 0.6)",
            "0 0 20px rgba(124, 255, 107, 0.2)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ willChange: 'transform' }}
        className="relative z-10 text-accent bg-accent/10 p-8 rounded-full border border-accent/30"
      >
        <Cpu size={100} strokeWidth={1.5} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
          className="absolute -inset-4 border-2 border-dashed border-accent/40 rounded-full"
        />
      </motion.div>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ x: p.x, y: p.y, scale: p.scale }}
          animate={{
            y: [null, p.y - 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute w-1 h-1 bg-accent rounded-full"
        />
      ))}

      {/* Scanning Line */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform, top' }}
        className="absolute left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_#7cff6b] z-20"
      />
    </div>
  );
};

export const ChatAnimation = () => {
  return (
    <div className="relative w-full h-full bg-indigo-950 overflow-hidden rounded-[2rem] p-8 flex flex-col gap-6">
      <AnimatePresence>
        <motion.div
          key="msg-1"
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="self-start bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-white/10 shadow-xl"
        >
          <p className="text-white/90 text-sm font-medium">
       We're looking for a developer who can contribute to real-world products.
          </p>
        </motion.div>

        <motion.div
          key="msg-2"
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="self-end bg-accent/20 backdrop-blur-md p-4 rounded-2xl rounded-tr-none max-w-[85%] border border-accent/20 shadow-xl"
        >
          <p className="text-accent text-sm font-medium">
          I build full-stack web applications using MERN and WordPress, with experience working on production systems.
          </p>
        </motion.div>

        <motion.div
          key="msg-3"
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
          className="self-start bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-white/10 shadow-xl"
        >
          <p className="text-white/90 text-sm font-medium">
           What kind of projects have you worked on?
          </p>
        </motion.div>

        <motion.div
          key="msg-4"
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 4.5 }}
          className="self-end bg-accent/20 backdrop-blur-md p-4 rounded-2xl rounded-tr-none max-w-[85%] border border-accent/20 shadow-xl"
        >
          <p className="text-accent text-sm font-medium">
         I've contributed to nonprofit platforms, enterprise software, AI-powered applications, and real-time web solutions.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Typing Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="self-end flex gap-1 bg-accent/10 p-3 rounded-full"
      >
        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-6 right-6 text-accent/20"
      >
        <MessageSquare size={100} strokeWidth={1} />
      </motion.div>
    </div>
  );
};



export const ECWAnimation = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-[2rem] flex items-center justify-center">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#7cff6b 1px, transparent 1px), linear-gradient(90deg, #7cff6b 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Rotating Globe */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute"
      >
        <Globe
          size={240}
          className="text-accent/20"
          strokeWidth={1}
        />
      </motion.div>

      {/* Website Card */}
      <motion.div
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
        className="relative z-10 w-80 h-52 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
      >
        {/* Browser Header */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        {/* Website Content */}
        <div className="p-5">
          <div className="h-5 bg-accent/30 rounded w-2/3 mb-4" />

          <div className="h-3 bg-white/10 rounded mb-2" />
          <div className="h-3 bg-white/10 rounded mb-2 w-5/6" />
          <div className="h-3 bg-white/10 rounded w-4/6" />

          <motion.div
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="mt-6 inline-flex items-center gap-2 bg-accent text-bg-dark px-4 py-2 rounded-xl font-bold text-xs"
          >
            <Heart size={14} />
            Donate
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Cards */}

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
      >
        <div className="flex items-center gap-2 text-white text-xs">
          <Users size={14} className="text-accent" />
          Global Impact
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-24 right-20 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
      >
        <div className="flex items-center gap-2 text-white text-xs">
          <Heart size={14} className="text-accent" />
          Education Support
        </div>
      </motion.div>

      {/* Connection Lines */}

      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="20%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="#7cff6b"
          strokeWidth="1"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        <motion.line
          x1="80%"
          y1="70%"
          x2="50%"
          y2="50%"
          stroke="#7cff6b"
          strokeWidth="1"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </svg>

    </div>
  );
};