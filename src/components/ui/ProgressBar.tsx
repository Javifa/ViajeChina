import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  showPercent?: boolean;
}

export default function ProgressBar({
  value,
  color = 'bg-primary',
  label,
  showPercent = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {/* Label row */}
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm text-gray-400 font-medium">{label}</span>
          )}
          {showPercent && (
            <span className="text-sm font-mono text-gray-300">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div className="relative h-2.5 rounded-full bg-dark-surface/80 backdrop-blur-xl border border-dark-border/50 overflow-hidden">
        {/* Animated fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Shine overlay */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
