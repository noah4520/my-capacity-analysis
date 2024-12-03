export type TimeEntry = {
  /**
   * 分析
   */
  analyze: string;

  /**
   * 專案需求
   */
  projectRequirements: string;

  /**
   * 維運
   */
  maintenance: string;

  /**
   * 會議
   */
  meetings: string;

  /**
   * 請假
   */
  leaves: string;

  /**
   * 其他
   */
  other: string;
}

export type TimeEntryWithDate = TimeEntry & {
  /**
   * 日期
   */
  date: Date;

  /**
   * ID
   */
  id: number;
}

export type StatisticsProp = {
  /**
   * 總分析時間
   */
  totalAnalyze: number;

  /**
   * 總專案需求時間
   */
  totalProjectRequirements: number;

  /**
   * 總維運時間
   */
  totalMaintenance: number;

  /**
   * 總會議時間
   */
  totalMeetings: number;

  /**
   * 總請假時間
   */
  totalLeaves: number;

  /**
   * 總其他時間
   */
  totalOther: number;

  /**
   * 總工時
   */
  grandTotal: number;

  /**
   * 唯一日期
   */
  uniqueDates: Set<string>;
}