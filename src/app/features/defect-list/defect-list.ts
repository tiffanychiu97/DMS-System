import { Component, computed, signal } from '@angular/core';
import { StatusBadge } from '../../shared/component/status-badge/status-badge';
import { Defect, DefectSeverity, DefectStatus } from '../../core/defect.model';
import {FormsModule} from '@angular/forms';

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
  selector: 'app-defect-list',
  imports: [ StatusBadge, FormsModule ],
  templateUrl: './defect-list.html',
  styleUrl: './defect-list.scss',
})
export class DefectList {
  
  readonly summary = computed(() => {
    return {
      total: this.allDefects.length,
      open: this.allDefects.filter(defect => defect.status === DefectStatus.Open).length,
      critical: this.allDefects.filter(defect => defect.severity === DefectSeverity.Critical).length,
    };
  })


  private readonly allDefects: Defect[] = SAMPLE_DEFECTS;

  readonly searchTerm = signal('');
  readonly statusFilter = signal<DefectStatus | 'All'>('All');
  readonly severityFilter = signal<DefectSeverity | 'All'>('All');

  readonly statusOptions = ['All', ...Object.values(DefectStatus)];
  readonly severityOptions = ['All', ...Object.values(DefectSeverity)];

  readonly filtered = computed(() => {
    return this.allDefects.filter(defect => {
      const term = this.searchTerm().trim().toLowerCase();
      const matchesSearch =   !term ||
        defect.id.toLowerCase().includes(term) ||
        defect.title.toLowerCase().includes(term) ||
        defect.productId.toLowerCase().includes(term) ||
        defect.station.toLowerCase().includes(term);
      const matchesStatus = this.statusFilter() === 'All' || defect.status === this.statusFilter();
      const matchesSeverity = this.severityFilter() === 'All' || defect.severity === this.severityFilter();
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  });

  rowAccent(severity: DefectSeverity): string {
    switch (severity) {
      case DefectSeverity.Critical: return 'var(--critical)';
      case DefectSeverity.Major: return 'var(--warning)';
      case DefectSeverity.Minor: return 'var(--accent)';
      default: return '#9ca3af'; // gray-400, for Cosmetic
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

}
