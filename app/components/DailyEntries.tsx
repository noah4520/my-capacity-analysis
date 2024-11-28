
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TimeEntryWithDate } from '../types/entry';

interface DailyEntriesProps {
  entries: TimeEntryWithDate[];
  onDeleteEntry: (id: number) => void;
  dailyTotal: string;
}

export const DailyEntries = ({ entries, onDeleteEntry, dailyTotal }: DailyEntriesProps) => {
  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-3 rounded">
        <p className="font-bold">當日總工作時間：{dailyTotal} 小時</p>
      </div>
      <h3 className="font-bold mb-2 mt-4">今日記錄</h3>
      {entries.map((entry) => (
        <div 
          key={entry.id} 
          className="flex justify-between items-center bg-white border p-3 mb-2 rounded"
        >
          <div>
            <p>分析: {entry.analyze || 0} 小時</p>
            <p>專案需求: {entry.projectRequirements || 0} 小時</p>
            <p>維運: {entry.maintenance || 0} 小時</p>
            <p>會議: {entry.meetings || 0} 小時</p>
            <p>請假: {entry.leaves || 0} 小時</p>
            <p>舊需求調整: {entry.other || 0} 小時</p>
          </div>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => onDeleteEntry(entry.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};