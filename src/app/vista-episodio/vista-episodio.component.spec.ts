import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEpisodioComponent } from './vista-episodio.component';

describe('VistaEpisodioComponent', () => {
  let component: VistaEpisodioComponent;
  let fixture: ComponentFixture<VistaEpisodioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaEpisodioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaEpisodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
