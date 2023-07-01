import { Component, ElementRef, Input, ViewChild,  OnChanges, SimpleChanges   } from '@angular/core';
import { BPCsvProcessor, Balance } from '../bp-csv-processor';
import { DRECsvProcessor, DRE } from '../dre-csv-processor';

@Component({
  selector: 'app-conteudo-tela',
  templateUrl: './conteudo-tela.component.html',
  styleUrls: ['./conteudo-tela.component.css']
})
export class ConteudoTelaComponent {
  @ViewChild('fileInputBP') fileInputBP!: ElementRef;
  @ViewChild('fileInputDRE') fileInputDRE!: ElementRef;

  selectedBPFile: File | undefined;
  selectedDREFile: File | undefined;
  // anos do BP
  @Input() anos: number[] = [];
  @Input() bpData: Balance[] | undefined;
  @Input() dreData: DRE[] | undefined;

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
    const file = event.target.files[0];
    this.bpData = this.bpCsvProcessor.processCsvFile(file);
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

  getYearsFromBPData(): number[] {
    console.log((this.bpData?.map(bp => bp.year) ?? []).filter(year => year !== undefined) as number[])
    return (this.bpData?.map(bp => bp.year) ?? []).filter(year => year !== undefined) as number[];
  }

  calculoPCT(anoDesejado:number): number{
    if (!this.bpData || this.bpData.length === 0) {
      return 0; // Valor padrão quando não há dados disponíveis
    }
  
    let passivoCirculante = 0;
    let passivoNaoCirculante = 0;
    //let patrimonioLiquido = 0;
    const bpDesejado = this.bpData.find(bp => bp.year === anoDesejado);
    if (bpDesejado) {
      passivoCirculante = bpDesejado.totalAssets || 0;
      passivoNaoCirculante = bpDesejado.currentAssets || 0;
    }

    return (passivoCirculante + passivoNaoCirculante); // Valor padrão caso algum dos valores não exista
    }
}
