import { motion } from 'motion/react';
import {
  Download,
  Smartphone,
  Wallet,
  MessageCircle,
  Car,
  Map,
  Languages,
  Shield,
  Ticket,
  Train,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { apps } from '../../data/apps';

const iconMap: Record<string, LucideIcon> = {
  Wallet,
  MessageCircle,
  Car,
  Map,
  Languages,
  Shield,
  Ticket,
  Train,
};

export default function AppsSection() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Smartphone size={24} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Apps Esenciales</h2>
          <p className="text-sm text-gray-400">
            {apps.length} aplicaciones que necesitas para China
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apps.map((app, index) => {
          const IconComponent = iconMap[app.icon] || Smartphone;

          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex-[0_0_85%] max-w-[320px] snap-center sm:flex-auto sm:max-w-none"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-5 flex flex-col gap-4 h-full active:scale-95 sm:active:scale-100 transition-transform"
              >
                {/* Icon glow background */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 rounded-full blur-3xl opacity-20 -translate-x-4 -translate-y-4 transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: app.color }}
                />

                {/* Icon + Category row */}
                <div className="flex items-start justify-between relative">
                  <div
                    className="p-3 rounded-xl border border-white/5"
                    style={{
                      backgroundColor: `${app.color}15`,
                      boxShadow: `0 0 20px ${app.color}10`,
                    }}
                  >
                    <IconComponent
                      size={24}
                      style={{ color: app.color }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{
                      color: app.color,
                      backgroundColor: `${app.color}15`,
                      borderColor: `${app.color}30`,
                    }}
                  >
                    {app.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white leading-tight">
                  {app.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {app.description}
                </p>

                {/* Download button */}
                {app.downloadUrl && (
                  <a
                    href={app.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
                    style={{
                      color: app.color,
                      borderColor: `${app.color}30`,
                      backgroundColor: `${app.color}08`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${app.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${app.color}08`;
                    }}
                  >
                    <Download size={14} />
                    Descargar
                  </a>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
