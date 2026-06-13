import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
}

export default function StarRating({
  value,
  onChange,
  size = 20,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);
  const isInteractive = !!onChange;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      onMouseLeave={() => isInteractive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || value);

        return (
          <button
            key={star}
            type="button"
            disabled={!isInteractive}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => isInteractive && setHovered(star)}
            className={`
              p-0.5 transition-all duration-200
              ${isInteractive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              ${isFilled ? 'text-[#f59e0b] drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]' : 'text-dark-border'}
            `}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              fill={isFilled ? 'currentColor' : 'none'}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
