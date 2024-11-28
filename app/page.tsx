"use client"

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DateSelector } from '@/app/components/DateSelector';
import { TimeEntryForm } from '@/app/components/TimeEntryForm';
import { DailyEntries } from '@/app/components/DailyEntries';
import { Statistics } from '@/app/components/Statistics';
import { StatisticsChart } from '@/app/components/StatisticsChart';
import { TimeEntry, TimeEntryWithDate } from './types/entry';

const TimeAllocationTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeEntries, setTimeEntries] = useState<TimeEntryWithDate[]>([]);
  const [newEntry, setNewEntry] = useState<TimeEntry>({
    analyze: '',
    projectRequirements: '',
    maintenance: '',
    meetings: '',
    leaves: '',
    other: ''
  });

  // 格式化日期為 yyyy-MM-dd
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const addTimeEntry = () => {
    const entryWithDate = {
      ...newEntry,
      date: selectedDate,
      id: Date.now()
    };

    setTimeEntries(prev => [...prev, entryWithDate]);
    
    setNewEntry({
      analyze: '',
      projectRequirements: '',
      maintenance: '',
      meetings: '',
      leaves: '',
      other: ''
    });
  };

  const deleteEntry = (id: number) => {
    setTimeEntries(prev => prev.filter(entry => entry.id !== id));
  };

  // 計算選定日期的總工作時間
  const calculateDailyTotal = () => {
    const dailyEntries = timeEntries.filter(entry => 
      formatDate(entry.date) === formatDate(selectedDate)
    );

    return dailyEntries.reduce((total, entry) => {
      return total + 
        (parseFloat(entry.analyze) || 0) +
        (parseFloat(entry.projectRequirements) || 0) +
        (parseFloat(entry.maintenance) || 0) +
        (parseFloat(entry.meetings) || 0) +
        (parseFloat(entry.leaves) || 0) +
        (parseFloat(entry.other) || 0);
    }, 0).toFixed(1);
  };

  const calculateOverallStatistics = useMemo(() => {
    const stats = {
      totalNotes: 0,
      totalProjectRequirements: 0,
      totalMaintenance: 0,
      totalOldRequirementAdjustments: 0,
      totalMeetings: 0,
      totalLeaves: 0,
      grandTotal: 0,
      uniqueDates: new Set<string>(),
    };

    timeEntries.forEach(entry => {
      stats.totalNotes += parseFloat(entry.analyze) || 0;
      stats.totalProjectRequirements += parseFloat(entry.projectRequirements) || 0;
      stats.totalMaintenance += parseFloat(entry.maintenance) || 0;
      stats.totalMeetings += parseFloat(entry.meetings) || 0;
      stats.totalLeaves += parseFloat(entry.leaves) || 0;
      stats.totalOldRequirementAdjustments += parseFloat(entry.other) || 0;
      stats.uniqueDates.add(formatDate(entry.date));
    });

    stats.grandTotal = 
      stats.totalNotes +
      stats.totalProjectRequirements +
      stats.totalMaintenance +
      stats.totalOldRequirementAdjustments +
      stats.totalMeetings +
      stats.totalLeaves;

    return stats;
  }, [timeEntries]);

  const handleInputChange = (field: string, value: string) => {
    setNewEntry(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-screen-lg my-10 mx-auto px-5">
      <div className="flex flex-col space-y-4">
        <div className="flex">
          <Statistics stats={calculateOverallStatistics} />
          <StatisticsChart stats={calculateOverallStatistics} />
        </div>
        <div className="flex">
          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={(date) => date && setSelectedDate(date)}
          />
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>時間記錄 - {formatDate(selectedDate)}</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeEntryForm
                newEntry={newEntry}
                onInputChange={handleInputChange}
                onAddEntry={addTimeEntry}
              />
              <DailyEntries
                entries={timeEntries.filter(entry => 
                  formatDate(entry.date) === formatDate(selectedDate)
                )}
                onDeleteEntry={deleteEntry}
                dailyTotal={calculateDailyTotal()}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeAllocationTracker;