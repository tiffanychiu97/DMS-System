import { Component, computed } from '@angular/core';
import { Defect, DefectSeverity, DefectStatus } from '../../core/defect.model';

const SAMPLE_DEFECTS: Defect[] = [
  { id: 'DEF-1001', productId: 'LOT-2031', station: 'SMT-01', title: 'Solder bridge on connector pins', description: '', severity: DefectSeverity.Critical, status: DefectStatus.Open, assignedTo: 'J. Lin', reportedBy: 'M. Tsai', reportedAt: '2026-07-10T00:00:00.000Z', updatedAt: '2026-07-10T00:00:00.000Z' },
  { id: 'DEF-1002', productId: 'LOT-2033', station: 'Final Assembly', title: 'Component misalignment detected', description: '', severity: DefectSeverity.Major, status: DefectStatus.InProgress, assignedTo: 'A. Chen', reportedBy: 'R. Wu', reportedAt: '2026-07-11T00:00:00.000Z', updatedAt: '2026-07-12T00:00:00.000Z' },
  { id: 'DEF-1003', productId: 'LOT-2035', station: 'Wave Solder', title: 'Missing screw torque spec', description: '', severity: DefectSeverity.Minor, status: DefectStatus.Open, assignedTo: 'K. Huang', reportedBy: 'J. Lin', reportedAt: '2026-07-12T00:00:00.000Z', updatedAt: '2026-07-12T00:00:00.000Z' },
  { id: 'DEF-1004', productId: 'LOT-2031', station: 'Test Bench A', title: 'Label printed with wrong lot number', description: '', severity: DefectSeverity.Major, status: DefectStatus.Resolved, assignedTo: 'M. Tsai', reportedBy: 'A. Chen', reportedAt: '2026-07-08T00:00:00.000Z', updatedAt: '2026-07-13T00:00:00.000Z' },
  { id: 'DEF-1005', productId: 'LOT-2040', station: 'SMT-02', title: 'Cracked housing after drop test', description: '', severity: DefectSeverity.Critical, status: DefectStatus.Open, assignedTo: 'R. Wu', reportedBy: 'K. Huang', reportedAt: '2026-07-14T00:00:00.000Z', updatedAt: '2026-07-14T00:00:00.000Z' },
  { id: 'DEF-1006', productId: 'LOT-2028', station: 'Test Bench B', title: 'Firmware flash failure', description: '', severity: DefectSeverity.Major, status: DefectStatus.InProgress, assignedTo: 'J. Lin', reportedBy: 'M. Tsai', reportedAt: '2026-07-09T00:00:00.000Z', updatedAt: '2026-07-11T00:00:00.000Z' },
  { id: 'DEF-1007', productId: 'LOT-2044', station: 'SMT-01', title: 'Incorrect resistor value populated', description: '', severity: DefectSeverity.Minor, status: DefectStatus.Closed, assignedTo: 'A. Chen', reportedBy: 'R. Wu', reportedAt: '2026-07-05T00:00:00.000Z', updatedAt: '2026-07-09T00:00:00.000Z' },
  { id: 'DEF-1008', productId: 'LOT-2036', station: 'Final Assembly', title: 'Cosmetic scratch on enclosure', description: '', severity: DefectSeverity.Cosmetic, status: DefectStatus.Resolved, assignedTo: 'K. Huang', reportedBy: 'J. Lin', reportedAt: '2026-07-07T00:00:00.000Z', updatedAt: '2026-07-10T00:00:00.000Z' },
  { id: 'DEF-1009', productId: 'LOT-2050', station: 'Test Bench A', title: 'Intermittent test failure at burn-in', description: '', severity: DefectSeverity.Major, status: DefectStatus.Open, assignedTo: 'M. Tsai', reportedBy: 'A. Chen', reportedAt: '2026-07-15T00:00:00.000Z', updatedAt: '2026-07-15T00:00:00.000Z' },
  { id: 'DEF-1010', productId: 'LOT-2029', station: 'Wave Solder', title: 'Connector pin bent during insertion', description: '', severity: DefectSeverity.Critical, status: DefectStatus.InProgress, assignedTo: 'R. Wu', reportedBy: 'K. Huang', reportedAt: '2026-07-13T00:00:00.000Z', updatedAt: '2026-07-16T00:00:00.000Z' },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly allDefects = SAMPLE_DEFECTS;

  readonly summary = computed(() => ({
    total: this.allDefects.length,
    open: this.allDefects.filter(defect => defect.status === DefectStatus.Open).length,
    critical: this.allDefects.filter(defect => defect.severity === DefectSeverity.Critical).length,
  }));


  readonly severityBreakdown = computed(() => {
  const severities = Object.values(DefectSeverity);
  return severities.map(severity => {
    const count = this.allDefects.filter(defect => defect.severity === severity).length;
    const percent = this.allDefects.length > 0 ? (count / this.allDefects.length) * 100 : 0;
    return { severity, count, percent };
  });
});
}