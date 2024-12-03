
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { ChevronRight } from 'lucide-react';
import { TimeEntry } from '../types/entry';

interface TimeEntryFormProps {
  newEntry: TimeEntry;
  onInputChange: (field: string, value: string) => void;
  onAddEntry: () => void;
}

export const TimeEntryForm = ({ newEntry, onInputChange, onAddEntry }: TimeEntryFormProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor='analyze'>分析 (小時)</label>
          <Input 
            id="analyze"
            type="number" 
            value={newEntry.analyze}
            onChange={(e) => onInputChange('analyze', e.target.value)}
            placeholder="專案需求時間"
          />
        </div>
        <div>
          <label htmlFor='projectRequirements'>專案需求 (小時)</label>
          <Input 
            id="projectRequirements"
            type="number" 
            value={newEntry.projectRequirements}
            onChange={(e) => onInputChange('projectRequirements', e.target.value)}
            placeholder="專案需求時間"
          />
        </div>
        <div>
          <label htmlFor='maintenance'>維運 (小時)</label>
          <Input 
            id='maintenance'
            type="number" 
            value={newEntry.maintenance}
            onChange={(e) => onInputChange('maintenance', e.target.value)}
            placeholder="維運時間"
          />
        </div>
        <div>
          <label htmlFor='meetings'>會議 (小時)</label>
          <Input 
            id='meetings'
            type="number" 
            value={newEntry.meetings}
            onChange={(e) => onInputChange('meetings', e.target.value)}
            placeholder="會議時間"
          />
        </div>
        <div>
          <label htmlFor='leaves'>請假 (小時)</label>
          <Input 
            id='leaves'
            type="number" 
            value={newEntry.leaves}
            onChange={(e) => onInputChange('leaves', e.target.value)}
            placeholder="請假時間"
          />
        </div>
        <div>
          <label htmlFor='other'>其他</label>
          <Input 
            id='other'
            type="number" 
            value={newEntry.other}
            onChange={(e) => onInputChange('other', e.target.value)}
            placeholder="其他時間"
          />
        </div>
      </div>
      <Button 
        onClick={onAddEntry} 
        className="mt-4 w-full"
        disabled={!Object.values(newEntry).some(value => value)}
      >
        新增記錄 <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};