import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Cpu, Car, Mountain, Cloud, Trees as Tree } from 'lucide-react';

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
        className="absolute top-10 left-0 text-white/80"
      >
        <Cloud size={80} />
      </motion.div>
      <motion.div
        animate={{ x: [600, -100] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
          position: 'absolute'
        }}
        className="text-accent"
      >
        <div className="relative">
          <Car size={48} fill="currentColor" />
          <motion.div 
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
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
        className="relative z-10 text-accent bg-accent/10 p-8 rounded-full border border-accent/30"
      >
        <Cpu size={100} strokeWidth={1.5} />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-2 border-dashed border-accent/40 rounded-full"
        />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 2 + 2, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-1 h-1 bg-accent rounded-full"
        />
      ))}

      {/* Scanning Line */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_#7cff6b] z-20"
      />
    </div>
  );
};

export const ChatAnimation = () => {
  return (
    <div className="relative w-full h-full bg-indigo-950 overflow-hidden rounded-[2rem] p-8 flex flex-col gap-6">
      {/* Chat Bubbles */}
      <AnimatePresence>
      <motion.div
  key="msg-1"
  initial={{ y: 20, opacity: 0, scale: 0.8 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  className="self-start bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-white/10 shadow-xl"
>
  <p className="text-white/90 text-sm font-medium">
    Hey! Have you checked out my portfolio yet? 🚀
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
    Yes! I love the projects and animations—it looks really professional! ✨
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
    I specialize in building MERN stack apps with React, Node.js & MongoDB. 💻
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
    Passionate about turning ideas into real projects and creating user-friendly solutions!
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
        className="absolute bottom-6 right-6 text-accent/20"
      >
        <MessageSquare size={100} strokeWidth={1} />
      </motion.div>
    </div>
  );
};