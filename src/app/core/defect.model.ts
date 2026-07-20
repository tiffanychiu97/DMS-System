export enum DefectStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export enum DefectSeverity {
  Critical = 'Critical',
  Major = 'Major',
  Minor = 'Minor',
  Cosmetic = 'Cosmetic',
}

export interface Defect {
  id: string;
  productId: string;     // e.g. lot / product / part number
  station: string;       // production line / station where it was found
  title: string;
  description: string;
  severity: DefectSeverity;
  status: DefectStatus;
  assignedTo: string;
  reportedBy: string;
  reportedAt: string;    // ISO date string
  updatedAt: string;     // ISO date string
}

export type DefectFormValue = Omit<Defect, 'id' | 'reportedAt' | 'updatedAt'>;
