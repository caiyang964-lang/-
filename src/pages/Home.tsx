import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full flex flex-col pt-10 pb-32">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20">
        <div className="overflow-hidden mb-4">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-[12vw] sm:text-[10vw] leading-[0.8] font-light tracking-[-0.02em] uppercase"
          >
            Visual
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-serif text-[12vw] sm:text-[10vw] leading-[0.8] font-light tracking-[-0.02em] text-[var(--color-accent)] uppercase italic drop-shadow-sm"
          >
            Storytelling
          </motion.h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-xl text-black/60 font-sans font-light leading-relaxed text-sm md:text-base tracking-wide"
        >
          <p>
            Bridging the gap between artificial intelligence and human emotion. 
            Exploring narratives through AI short dramas and capturing raw reality through photography.
          </p>
        </motion.div>
      </section>

      {/* Featured Categories Split */}
      <section className="w-full px-6 md:px-20 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* AI Drama Card */}
          <Link to="/ai-dramas" className="group block h-[70vh] relative overflow-hidden rounded-xl shadow-xl shadow-rose-900/5">
             <div className="absolute inset-0 bg-stone-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=3000&auto=format&fit=crop" 
                  alt="AI Dramas" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-[0.25,1,0.5,1]"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="overflow-hidden">
                  <h2 className="font-sans text-4xl tracking-widest font-light text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    AI短剧
                  </h2>
                </div>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                   <p className="mt-4 text-sm text-white/80 tracking-widest uppercase">Explore the surreal &amp; generated narratives.</p>
                </div>
             </div>
          </Link>

          {/* Photography Card */}
          <Link to="/photography" className="group block h-[70vh] relative overflow-hidden md:-translate-y-16 rounded-xl shadow-xl shadow-rose-900/5">
             <div className="absolute inset-0 bg-stone-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?q=80&w=3000&auto=format&fit=crop" 
                  alt="Photography" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-[0.25,1,0.5,1]"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="overflow-hidden">
                  <h2 className="font-sans text-4xl tracking-widest font-light text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    摄影作品
                  </h2>
                </div>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                   <p className="mt-4 text-sm text-white/80 tracking-widest uppercase">Moments frozen in time and space.</p>
                </div>
             </div>
          </Link>
        </div>
      </section>
      
      {/* Marquee Banner */}
      <div className="w-full overflow-hidden mt-40 border-y border-black/10 py-6 bg-white/20 backdrop-blur-sm">
         <div className="flex whitespace-nowrap opacity-30 text-black">
            <motion.div 
               animate={{ x: [0, -1000] }} 
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
               className="font-serif text-[10vw] uppercase leading-none tracking-tight flex items-center gap-12"
            >
               <span>• ARTIFICIAL INTELLIGENCE</span>
               <span className="italic">CINEMATOGRAPHY</span>
               <span>• CREATIVE DIRECTION</span>
               <span className="italic">PHOTOGRAPHY</span>
               <span>• ARTIFICIAL INTELLIGENCE</span>
               <span className="italic">CINEMATOGRAPHY</span>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
