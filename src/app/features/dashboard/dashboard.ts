import { DefectService } from './../../core/services/defect.service';
import { Component, computed, inject } from '@angular/core';
import { Defect, DefectSeverity, DefectStatus } from '../../core/services/models/defect.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private defectService= inject(DefectService)
  private readonly allDefects = this.defectService.defects;

  readonly summary = computed(() => ({
    total: this.allDefects().length,
    open: this.allDefects().filter(defect => defect.status === DefectStatus.Open).length,
    critical: this.allDefects().filter(defect => defect.severity === DefectSeverity.Critical).length,
  }));


  readonly severityBreakdown = computed(() => {
  const severities = Object.values(DefectSeverity);
  return severities.map(severity => {
    const count = this.allDefects().filter(defect => defect.severity === severity).length;
    const percent = this.allDefects().length > 0 ? (count / this.allDefects().length) * 100 : 0;
    return { severity, count, percent };
  });
});
}