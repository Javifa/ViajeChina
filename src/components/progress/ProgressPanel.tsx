import { useTripContext } from '../../context/TripContext';
import ProgressBar from '../ui/ProgressBar';
import { BedDouble, Train, CheckSquare } from 'lucide-react';

export default function ProgressPanel() {
  const { progress } = useTripContext();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400 font-medium">Progreso general</span>
          <span className="text-white font-bold">{progress.overallPercent}%</span>
        </div>
        <ProgressBar value={progress.overallPercent} color="bg-primary" showPercent={false} />
      </div>

      <div className="space-y-4 pt-4 border-t border-dark-border/30">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <BedDouble size={14} className="text-primary" />
              <span>Hoteles reservados</span>
            </div>
            <span className="text-gray-400">
              {progress.hotelsReserved} / {progress.hotelsTotal}
            </span>
          </div>
          <ProgressBar 
            value={progress.hotelsTotal > 0 ? (progress.hotelsReserved / progress.hotelsTotal) * 100 : 0} 
            color="bg-primary" 
            showPercent={false} 
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Train size={14} className="text-secondary" />
              <span>Trenes reservados</span>
            </div>
            <span className="text-gray-400">
              {progress.trainsReserved} / {progress.trainsTotal}
            </span>
          </div>
          <ProgressBar 
            value={progress.trainsTotal > 0 ? (progress.trainsReserved / progress.trainsTotal) * 100 : 0} 
            color="bg-secondary" 
            showPercent={false} 
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckSquare size={14} className="text-accent-emerald" />
              <span>Checklist</span>
            </div>
            <span className="text-gray-400">
              {progress.checklistDone} / {progress.checklistTotal}
            </span>
          </div>
          <ProgressBar 
            value={progress.checklistTotal > 0 ? (progress.checklistDone / progress.checklistTotal) * 100 : 0} 
            color="bg-accent-emerald" 
            showPercent={false} 
          />
        </div>
      </div>
    </div>
  );
}
