import { Component, ElementRef, ViewChild } from '@angular/core';
import { BPCsvProcessor } from './bp-csv-processor';
import { DRECsvProcessor } from './dre-csv-processor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('fileInputBP') fileInputBP!: ElementRef;
  @ViewChild('fileInputDRE') fileInputDRE!: ElementRef;

  selectedBPFile: File | undefined;
  selectedDREFile: File | undefined;

  constructor(
    private bpCsvProcessor: BPCsvProcessor,
    private dreCsvProcessor: DRECsvProcessor
  ) { }

  chooseFileBP() {
    this.fileInputBP.nativeElement.click();
  }

  chooseFileDRE() {
    this.fileInputDRE.nativeElement.click();
  }

  handleBPFileInput(event: any) {
    console.log("form bp")
    this.selectedBPFile = event.target.files[0];
    console.log(this.selectedBPFile)
  }

  handleDREFileInput(event: any) {
    console.log("form dre")
    this.selectedDREFile = event.target.files[0];
    console.log(this.selectedDREFile)
  }

  uploadFiles() {
    if (!this.selectedBPFile) {
      alert("Por favor selecione um arquivo para do BP")
      return;
    }
    if (!this.selectedDREFile) {
      alert("Por favor selecione um arquivo para do DRE")
      return;
    }

    const balances = this.bpCsvProcessor.processCsvFile(this.selectedBPFile);
    const dres = this.dreCsvProcessor.processCsvFile(this.selectedDREFile);

    if (balances && dres) {
      this.appendAlert('CSVs processados com sucesso', 'success')
    } else {
      this.appendAlert('Houve um erro em processar os CSVs', 'danger')
    }
  }

  appendAlert(message: string, type: string) {
    console.log("appending")
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    if (!alertPlaceholder) {
      return;
    }
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }
}
