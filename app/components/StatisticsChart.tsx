"use client"
import { LabelList, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { StatisticsProp } from "../types/entry"

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

export function StatisticsChart({ stats }: {stats: StatisticsProp}) {
  const chartData = [
    { name: "分析", value: stats.totalAnalyze, fill: chartConfig.analyze.color },
    { name: "專案需求", value: stats.totalProjectRequirements, fill: chartConfig.projectRequirements.color },
    { name: "維運", value: stats.totalMaintenance, fill: chartConfig.maintenance.color },
    { name: "會議", value: stats.totalMeetings, fill: chartConfig.meetings.color },
    { name: "請假", value: stats.totalLeaves, fill: chartConfig.leaves.color },
    { name: "其他", value: stats.totalOther, fill: chartConfig.other.color },
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
          className="mx-auto aspect-square max-h-[500px] [&_.recharts-text]:fill-background"
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
                formatter={(value: string) => 
                  `${chartConfig[value as keyof typeof chartConfig]?.label || value} (${chartData.find(d => d.name === value)?.value}h)`
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
