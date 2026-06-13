import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  icon: Icon,
  children,
  className = '',
}: SectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-3"
          >
            {Icon && (
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {title}
            </h2>
          </motion.div>

          {/* Gradient Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="h-0.5 w-24 origin-left bg-gradient-to-r from-primary via-secondary to-transparent rounded-full"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
