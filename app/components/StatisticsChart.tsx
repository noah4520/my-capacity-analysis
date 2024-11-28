"use client"
import { LabelList, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StatisticsChartProps {
  stats: {
    totalNotes: number;
    totalProjectRequirements: number;
    totalMaintenance: number;
    totalMeetings: number;
    totalLeaves: number;
    totalOldRequirementAdjustments: number;
    grandTotal: number;
  }
}

const chartConfig = {
  analyze: {
    label: "分析",
    color: "hsl(var(--chart-1))",
  },
  projectRequirements: {
    label: "專案需求",
    color: "hsl(var(--chart-2))",
  },
  maintenance: {
    label: "維運",
    color: "hsl(var(--chart-3))",
  },
  meetings: {
    label: "會議",
    color: "hsl(var(--chart-4))",
  },
  leaves: {
    label: "請假",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "其他",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function StatisticsChart({ stats }: StatisticsChartProps) {
  const chartData = [
    { name: "analyze", value: stats.totalNotes, fill: chartConfig.analyze.color },
    { name: "projectRequirements", value: stats.totalProjectRequirements, fill: chartConfig.projectRequirements.color },
    { name: "maintenance", value: stats.totalMaintenance, fill: chartConfig.maintenance.color },
    { name: "meetings", value: stats.totalMeetings, fill: chartConfig.meetings.color },
    { name: "leaves", value: stats.totalLeaves, fill: chartConfig.leaves.color },
    { name: "other", value: stats.totalOldRequirementAdjustments, fill: chartConfig.other.color },
  ].filter(item => item.value > 0) // 過濾掉數值為 0 的項目

  return (
    <Card className="flex flex-col ml-4 w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>工作時間分配</CardTitle>
        <CardDescription>總工時: {stats.grandTotal.toFixed(1)} 小時</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie 
              data={chartData} 
              dataKey="value"
              nameKey="name"
            >
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => 
                  `${chartConfig[value].label} (${chartData.find(d => d.name === value)?.value.toFixed(1)}h)`
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          顯示各項工作時間佔比
        </div>
      </CardFooter>
    </Card>
  )
}
