import { DefectService } from './../../core/services/defect.service';
import { Component, computed, signal, inject } from '@angular/core';
import { StatusBadge } from '../../shared/component/status-badge/status-badge';
import { Defect, DefectSeverity, DefectStatus } from '../../core/services/models/defect.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-defect-list',
  imports: [ StatusBadge, FormsModule, RouterLink ],
  templateUrl: './defect-list.html',
  styleUrl: './defect-list.scss',
})
export class DefectList {
  private defectService= inject(DefectService)
  private readonly allDefects = this.defectService.defects;
  
  readonly summary = computed(() => {
    return {
      total: this.allDefects().length,
      open: this.allDefects().filter(defect => defect.status === DefectStatus.Open).length,
      critical: this.allDefects().filter(defect => defect.severity === DefectSeverity.Critical).length,
    };
  })

  readonly searchTerm = signal('');
  readonly statusFilter = signal<DefectStatus | 'All'>('All');
  readonly severityFilter = signal<DefectSeverity | 'All'>('All');

  readonly statusOptions = ['All', ...Object.values(DefectStatus)];
  readonly severityOptions = ['All', ...Object.values(DefectSeverity)];

  readonly filtered = computed(() => {
    return this.allDefects().filter(defect => {
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
