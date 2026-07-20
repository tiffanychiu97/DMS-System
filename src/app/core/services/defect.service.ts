import { Injectable, signal, computed } from '@angular/core';
import { Defect, DefectFormValue, DefectSeverity, DefectStatus } from '../defect.model';

const STATIONS = ['Lithography', 'Etch', 'CMP', 'Wafer Sort', 'Die Bond', 'Wire Bond', 'Molding', 'Final Test'];
const REPORTERS = ['J. Lin', 'M. Tsai', 'A. Chen', 'R. Wu', 'K. Huang'];

function generateSeedData(): Defect[] {
  const titles = [
    'Wafer scratch detected during inspection',
    'Photoresist coating thickness out of spec',
    'Particle contamination on wafer surface',
    'Etching process over-etch on die edge',
    'Wire bond pull strength below spec',
    'Die crack found during final test',
    'Wafer misalignment during lithography',
    'CMP process causing surface non-uniformity',
    'Bin map shows abnormal yield cluster',
    'Mold compound voids in package',
  ];
  const severities = Object.values(DefectSeverity);
  const statuses = Object.values(DefectStatus);

return Array.from({ length: 10 }, (_, i) => {
    const reportedDaysAgo = Math.floor(Math.random() * 30);
    const reportedAt = new Date(Date.now() - reportedDaysAgo * 86400000);
    const updatedAt = new Date(reportedAt.getTime() + Math.floor(Math.random() * 4) * 86400000);
    return {
      id: `DEF-${String(1000 + i)}`,
      productId: `LOT-${2000 + Math.floor(Math.random() * 50)}`,
      station: STATIONS[Math.floor(Math.random() * STATIONS.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Auto-generated sample record for demo purposes.',
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignedTo: REPORTERS[Math.floor(Math.random() * REPORTERS.length)],
      reportedBy: REPORTERS[Math.floor(Math.random() * REPORTERS.length)],
      reportedAt: reportedAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  });

}

@Injectable({
  providedIn: 'root'
})

export class DefectService {
  private readonly _defects = signal<Defect[]>(generateSeedData());
  readonly defects = computed(() => this._defects())

  create(value: DefectFormValue): void {
    const now = new Date().toISOString();
    const newDefect: Defect = {
      ...value,
      id: `DEF-${1000 + this._defects().length + Math.floor(Math.random() * 1000)}`,
      reportedAt: now,
      updatedAt: now,
    };
    this._defects.update(list => [newDefect, ...list]);
  }
}


