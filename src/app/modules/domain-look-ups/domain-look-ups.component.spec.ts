import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainLookUpsComponent } from './domain-look-ups.component';

describe('DomainLookUpsComponent', () => {
  let component: DomainLookUpsComponent;
  let fixture: ComponentFixture<DomainLookUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainLookUpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainLookUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
