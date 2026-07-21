import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DefectService } from '../../core/services/defect.service';
import { DefectSeverity, DefectStatus } from '../../core/services/models/defect.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-defect-form',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './defect-form.html',
  styleUrl: './defect-form.scss',
})

export class DefectForm {
  private fb = inject(FormBuilder);
  private defectService = inject(DefectService);
  private router = inject(Router);

  readonly severityOptions = Object.values(DefectSeverity);
  readonly statusOptions = Object.values(DefectStatus);
 
  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    productId: ['', Validators.required],
    station: ['', Validators.required],
    severity: [DefectSeverity.Minor, Validators.required],
    status: [DefectStatus.Open, Validators.required],
    assignedTo: ['', Validators.required],
    reportedBy: ['', Validators.required],
  })

   field(name: string) {
    return this.form.get(name);
  }

  showError(name: string){
     const control = this.field(name)
     return !!control && control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.defectService.create(this.form.getRawValue() as any);
    this.router.navigate(['/defects']);
  }

  cancel(): void{
    this.router.navigate(['/defects'])
  }
}
