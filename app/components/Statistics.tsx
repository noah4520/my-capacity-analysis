
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { BarChart2 } from 'lucide-react';
import { StatisticsProp } from '../types/entry';

export const Statistics = ({ stats }: {stats: StatisticsProp}) => {
  console.log('stats', stats);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart2 className="mr-2" /> 時間統計總覽
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full border rounded">
          <div className="grid grid-cols-3 bg-gray-100 border-b font-bold">
            <div className="p-2 border-r">統計項目</div>
            <div className="p-2 text-right border-r">總工作時間 (小時)</div>
            <div className="p-2 text-right">百分比</div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">分析</div>
            <div className="p-2 text-right border-r">
              {stats.totalAnalyze.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalAnalyze / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">專案需求</div>
            <div className="p-2 text-right border-r">
              {stats.totalProjectRequirements.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalProjectRequirements / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">維運</div>
            <div className="p-2 text-right border-r">
              {stats.totalMaintenance.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalMaintenance / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">會議</div>
            <div className="p-2 text-right border-r">
              {stats.totalMeetings.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalMeetings / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">請假</div>
            <div className="p-2 text-right border-r">
              {stats.totalLeaves.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalLeaves / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 border-r">其他</div>
            <div className="p-2 text-right border-r">
              {stats.totalOther.toFixed(1)}
            </div>
            <div className="p-2 text-right">
              {stats.grandTotal > 0 
                ? ((stats.totalOther / stats.grandTotal) * 100).toFixed(1) + '%'
                : '0%'}
            </div>
          </div>
          <div className="grid grid-cols-3 bg-gray-100 font-bold">
            <div className="p-2 border-r">總計</div>
            <div className="p-2 text-right border-r">
              {stats.grandTotal.toFixed(1)}
            </div>
            <div className="p-2 text-right">100%</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          已記錄天數：{stats.uniqueDates.size} 天
        </div>
      </CardContent>
    </Card>
  );
};