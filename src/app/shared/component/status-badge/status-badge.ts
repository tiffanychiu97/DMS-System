import { Component, input, signal } from '@angular/core';
import { DefectSeverity, DefectStatus } from '../../../core/defect.model';

const NEUTRAL = '#9ca3af';

const STATUS_COLOR: Record<DefectStatus, string> = {
  [DefectStatus.Open]: 'var(--critical)',
  [DefectStatus.InProgress]: 'var(--warning)',
  [DefectStatus.Resolved]: 'var(--success)',
  [DefectStatus.Closed]: NEUTRAL,
};

const SEVERITY_COLOR: Record<DefectSeverity, string> = {
  [DefectSeverity.Critical]: 'var(--critical)',
  [DefectSeverity.Major]: 'var(--warning)',
  [DefectSeverity.Minor]: 'var(--accent)',
  [DefectSeverity.Cosmetic]: NEUTRAL,
};

@Component({
  selector: 'status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})


export class StatusBadge {
  status = input<DefectStatus | null>(null)
  severity = input<DefectSeverity | null>(null)

  color = signal<string>(NEUTRAL);
  label = signal<string>('');

  ngOnInit() {
    if (this.status()) {
      this.color.set(STATUS_COLOR[this.status()!]);
    } else if (this.severity()) {
      this.color.set(SEVERITY_COLOR[this.severity()!]);
    } else {
      this.color.set(NEUTRAL);
      console.warn('StatusBadge: No status or severity provided');
    }

    if (this.status()) {
      this.label.set(this.status()!);
    } else if (this.severity()) {
      this.label.set(this.severity()!);
    } else {
      this.label.set('Unknown');
    }
  }
}
