import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import BackButton from '../components/BackButton';

interface Work {
  id: number;
  type: string;
  title: string;
  description: string;
  coverImage: string;
}

export default function Gallery({ type }: { type: 'ai_drama' | 'photography' }) {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/works?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setWorks(data);
        setLoading(false);
      });
  }, [type]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center font-serif italic text-black/40">Loading...</div>;

  return (
    <div className="w-full px-6 md:px-20 py-20 pt-32">
      <BackButton />
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="mb-20"
      >
        <span className="text-[var(--color-accent)] text-sm tracking-[0.2em] mb-4 block">档案库</span>
        <h1 className="font-serif text-6xl md:text-8xl font-light tracking-tight text-[var(--color-text)]">
          {type === 'ai_drama' ? 'AI短剧' : '摄影作品'}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-20">
        {works.map((work, idx) => (
          <GalleryItem key={work.id} work={work} index={idx} />
        ))}
      </div>
    </div>
  );
}

function GalleryItem({ work, index }: { work: Work; index: number }) {
  return (
    <Link to={`/work/${work.id}`} className="group w-full flex flex-col gap-6 cursor-pointer">
      <div className="w-full aspect-[4/5] overflow-hidden relative rounded-xl shadow-xl shadow-rose-900/5 bg-stone-100">
         <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full"
         >
           <img src={work.coverImage} alt={work.title} className="w-full h-full object-cover filter brightness-[0.95] group-hover:brightness-100 transition-all duration-700" />
         </motion.div>
      </div>
      
      <div className="flex flex-col">
         <div className="text-[10px] text-black/40 tracking-[0.3em] uppercase mb-2">No. 0{index + 1}</div>
         <h2 className="font-serif text-2xl font-light mb-3 group-hover:text-[var(--color-accent)] text-[var(--color-text)] transition-colors duration-500 uppercase">{work.title}</h2>
         <p className="text-black/60 font-light text-sm leading-relaxed line-clamp-2 mb-4">
           {work.description}
         </p>
         <span className="text-[12px] tracking-widest text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium">
            查看详情 →
         </span>
      </div>
    </Link>
  );
}
