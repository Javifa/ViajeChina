import { getStatusLabel, getStatusColor } from '../../utils/helpers';

type Status = 'pending' | 'reserved' | 'paid' | 'purchased';

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = getStatusLabel(status);
  const colorClasses = getStatusColor(status);

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border transition-colors duration-200
        ${colorClasses}
      `}
    >
      {label}
    </span>
  );
}
