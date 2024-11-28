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