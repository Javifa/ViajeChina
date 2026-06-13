import { motion } from 'motion/react';
import { Camera, MapPin } from 'lucide-react';
import type { CityId } from '../../types';

interface GalleryItem {
  id: string;
  name: string;
  city: CityId;
  cityName: string;
  cityCn: string;
  gradient: string;
  accentColor: string;
  height: number;
  category: string;
  imageUrl?: string;
}

const galleryItems: GalleryItem[] = [
  // Shanghai
  {
    id: 'g-1', name: 'The Bund Skyline', city: 'shanghai', cityName: 'Shanghái', cityCn: '上海',
    gradient: 'from-sky-600 via-cyan-500 to-blue-700',
    accentColor: 'rgba(56,189,248,0.3)', height: 340, category: 'Cityscape', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'g-2', name: 'Shanghai Tower', city: 'shanghai', cityName: 'Shanghái', cityCn: '上海',
    gradient: 'from-blue-500 via-sky-400 to-indigo-600',
    accentColor: 'rgba(56,189,248,0.3)', height: 380, category: 'Architecture', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'g-3', name: 'Yuyuan Garden', city: 'shanghai', cityName: 'Shanghái', cityCn: '上海',
    gradient: 'from-cyan-500 via-teal-400 to-sky-600',
    accentColor: 'rgba(56,189,248,0.3)', height: 260, category: 'Culture', imageUrl: '/images/shanghai.png',
  },
  {
    id: 'g-4', name: 'Nanjing Road', city: 'shanghai', cityName: 'Shanghái', cityCn: '上海',
    gradient: 'from-blue-600 via-cyan-400 to-sky-500',
    accentColor: 'rgba(56,189,248,0.3)', height: 300, category: 'Cityscape', imageUrl: '/images/shanghai.png',
  },
  // Zhangjiajie
  {
    id: 'g-5', name: 'Avatar Mountains', city: 'zhangjiajie', cityName: 'Zhangjiajie', cityCn: '张家界',
    gradient: 'from-green-600 via-emerald-500 to-teal-700',
    accentColor: 'rgba(34,197,94,0.3)', height: 380, category: 'Nature', imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'g-6', name: 'Tianmen Mountain', city: 'zhangjiajie', cityName: 'Zhangjiajie', cityCn: '张家界',
    gradient: 'from-emerald-500 via-green-400 to-lime-600',
    accentColor: 'rgba(34,197,94,0.3)', height: 320, category: 'Nature', imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'g-7', name: 'Glass Bridge', city: 'zhangjiajie', cityName: 'Zhangjiajie', cityCn: '张家界',
    gradient: 'from-teal-500 via-emerald-400 to-green-600',
    accentColor: 'rgba(34,197,94,0.3)', height: 260, category: 'Architecture', imageUrl: '/images/zhangjiajie.png',
  },
  {
    id: 'g-8', name: 'Tianzi Mountain', city: 'zhangjiajie', cityName: 'Zhangjiajie', cityCn: '张家界',
    gradient: 'from-green-500 via-teal-400 to-emerald-700',
    accentColor: 'rgba(34,197,94,0.3)', height: 350, category: 'Nature', imageUrl: '/images/zhangjiajie.png',
  },
  // Chongqing
  {
    id: 'g-9', name: 'Hongya Cave', city: 'chongqing', cityName: 'Chongqing', cityCn: '重庆',
    gradient: 'from-orange-600 via-amber-500 to-yellow-600',
    accentColor: 'rgba(249,115,22,0.3)', height: 360, category: 'Culture', imageUrl: '/images/chongqing.png',
  },
  {
    id: 'g-10', name: 'Liziba Monorail', city: 'chongqing', cityName: 'Chongqing', cityCn: '重庆',
    gradient: 'from-amber-500 via-orange-400 to-red-500',
    accentColor: 'rgba(249,115,22,0.3)', height: 280, category: 'Cityscape', imageUrl: '/images/chongqing.png',
  },
  {
    id: 'g-11', name: 'Ciqikou Town', city: 'chongqing', cityName: 'Chongqing', cityCn: '重庆',
    gradient: 'from-yellow-500 via-amber-400 to-orange-600',
    accentColor: 'rgba(249,115,22,0.3)', height: 240, category: 'Culture', imageUrl: '/images/chongqing.png',
  },
  {
    id: 'g-12', name: 'Yangtze River', city: 'chongqing', cityName: 'Chongqing', cityCn: '重庆',
    gradient: 'from-orange-500 via-yellow-400 to-amber-600',
    accentColor: 'rgba(249,115,22,0.3)', height: 320, category: 'Nature', imageUrl: '/images/chongqing.png',
  },
  // Beijing
  {
    id: 'g-13', name: 'Ciudad Prohibida', city: 'beijing', cityName: 'Pekín', cityCn: '北京',
    gradient: 'from-red-600 via-rose-500 to-pink-700',
    accentColor: 'rgba(239,68,68,0.3)', height: 370, category: 'Culture', imageUrl: '/images/beijing.png',
  },
  {
    id: 'g-14', name: 'Gran Muralla', city: 'beijing', cityName: 'Pekín', cityCn: '北京',
    gradient: 'from-rose-500 via-red-400 to-orange-600',
    accentColor: 'rgba(239,68,68,0.3)', height: 340, category: 'Architecture', imageUrl: '/images/beijing.png',
  },
  {
    id: 'g-15', name: 'Templo del Cielo', city: 'beijing', cityName: 'Pekín', cityCn: '北京',
    gradient: 'from-pink-500 via-rose-400 to-red-600',
    accentColor: 'rgba(239,68,68,0.3)', height: 280, category: 'Culture', imageUrl: '/images/beijing.png',
  },
  {
    id: 'g-16', name: 'Hutongs', city: 'beijing', cityName: 'Pekín', cityCn: '北京',
    gradient: 'from-red-500 via-pink-400 to-rose-600',
    accentColor: 'rgba(239,68,68,0.3)', height: 250, category: 'Cityscape', imageUrl: '/images/beijing.png',
  },
];

export default function GallerySection() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          <Camera size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Galería</h2>
          <p className="text-sm text-gray-400">
            Inspírate con los destinos que visitaremos
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            className="break-inside-avoid"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: item.height }}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />

              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
              ) : (
                <>
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  />
                  {/* Accent blobs */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl"
                    style={{ backgroundColor: item.accentColor }}
                  />
                </>
              )}

              {/* Mesh gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              {/* Content overlay – always visible on bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={11} className="text-white/60" />
                  <span className="text-[11px] font-medium text-white/60 tracking-wide uppercase">
                    {item.cityName}
                  </span>
                  <span className="text-[10px] text-white/40 ml-0.5">
                    {item.cityCn}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Hover overlay with extra info */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={false}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                >
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/10">
                    {item.category}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
