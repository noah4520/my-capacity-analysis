
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

interface DateSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
}

export const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  return (
    <Card className="w-1/3 mr-4">
      <CardHeader>
        <CardTitle>選擇日期</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};