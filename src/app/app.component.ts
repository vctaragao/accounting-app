import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BPCsvProcessor, Balance } from './bp-csv-processor';
import { DRECsvProcessor, DRE } from './dre-csv-processor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('fileInputBP') fileInputBP!: ElementRef;
  @ViewChild('fileInputDRE') fileInputDRE!: ElementRef;

  selectedBPFile: File | null = null;
  selectedDREFile: File | null = null;
  bpData: Balance[] = [];
  dreData: DRE[] = [];

  constructor(
    private bpCsvProcessor: BPCsvProcessor,
    private dreCsvProcessor: DRECsvProcessor
  ) {}

  chooseFileBP() {
    this.fileInputBP.nativeElement.click();
  }

  chooseFileDRE() {
    this.fileInputDRE.nativeElement.click();
  }

  handleBPFileInput(event: any) {
    this.selectedBPFile = event.target.files[0];
  }

  handleDREFileInput(event: any) {
    this.selectedDREFile = event.target.files[0];
  }

  uploadFiles() {
    if (!this.selectedBPFile) {
      this.appendAlert('Por favor selecione um arquivo para do BP', 'danger');
      return;
    }

    if (!this.selectedDREFile) {
      this.appendAlert('Por favor selecione um arquivo para do DRE', 'danger');
      return;
    }

    this.bpData = this.bpCsvProcessor.processCsvFile(this.selectedBPFile);
    this.dreData = this.dreCsvProcessor.processCsvFile(this.selectedDREFile);

    this.appendAlert('CSVs processados com sucesso', 'success');
  }

  appendAlert(message: string, type: string) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (!alertPlaceholder) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    alertPlaceholder.append(wrapper);
  }

  getYearsFromBPData(): number[] {
    if (!this.bpData) {
      return [];
    }

    const years = this.bpData.filter((bp) => bp.year).map((bp) => bp.year);
    return years as number[];
  }
}
