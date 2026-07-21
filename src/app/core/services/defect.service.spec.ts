import { TestBed } from '@angular/core/testing';
import { DefectService } from './defect.service';
import { DefectSeverity, DefectStatus } from './models/defect.model';

describe('DefectService', () => {
    let service: DefectService

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DefectService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should add a new defect when create() is called', () => {
        const before = service.defects().length

        service.create(
            {
                title: 'Test defect for unit testing',
                description: 'A defect created just to verify create() works.',
                productId: 'LOT-9999',
                station: 'Test Bench A',
                severity: DefectSeverity.Minor,
                status: DefectStatus.Open,
                assignedTo: 'Test User',
                reportedBy: 'Test User',
            }
        );

        const after = service.defects().length

        expect(after).toBe(before + 1)
    });
})