/**
 * Summary of a Note
 */
export interface NoteSummary {
  id: string;
  title: string;
  lastUpdate: Date;
}

/**
 * Represents a Note
 */
export interface Note extends NoteSummary {
  ownerId: string;
  text: string;
}
