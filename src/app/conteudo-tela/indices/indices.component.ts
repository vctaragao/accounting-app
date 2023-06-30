import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BPCsvProcessor, Balance } from '../../bp-csv-processor';
import { DRECsvProcessor, DRE } from '../../dre-csv-processor';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css'],
})
export class IndicesComponent implements OnChanges {
  @ViewChild('fileInputBP') fileInputBP!: ElementRef;
  @ViewChild('fileInputDRE') fileInputDRE!: ElementRef;

  selectedBPFile: File | undefined;
  selectedDREFile: File | undefined;
  @Input() ano: number = 0;
  @Input() bpData: Balance[] | undefined;
  @Input() dreData: DRE[] | undefined;

  constructor(
    private bpCsvProcessor: BPCsvProcessor,
    private dreCsvProcessor: DRECsvProcessor
  ) {}

  // índices de estrutura de capital
  pct: number = 0;
  end: number = 0;
  ipl: number = 0;

  // índices de liquidez
  lg: number = 0;
  lc: number = 0;
  ls: number = 0;

  // índices de rentabilidade
  ga: number = 0;
  ml: number = 0;
  ra: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.atualizarIndices();
  }

  getYearsFromBPData(): number[] {
    return (this.bpData?.map((bp) => bp.year) ?? []).filter(
      (year) => year !== undefined
    ) as number[];
  }

  atualizarIndices(): void {
    if (this.bpData && this.bpData.length > 0) {
      this.calculoPCT(this.ano);
      this.calculoEND(this.ano);
      this.calculoIPL(this.ano);
      this.calculoLG(this.ano);
      this.calculoLC(this.ano);
      this.calculoLS(this.ano);
      if (this.dreData) {
        console.log('aopa');
        this.calculoGA(this.ano);
      }
    } else {
      // Define os valores dos índices como zero ou qualquer outro valor padrão
      this.pct = 0;
      // Define os outros índices como zero ou qualquer outro valor padrão
    }
  }

  // Função para cálculo do PCT
  calculoPCT(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.pct = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let passivoCirculante = 0;
    let passivoNaoCirculante = 0;
    let patrimonioLiquido = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      passivoCirculante = bpDesejado.currentLiabilities || 0;
      passivoNaoCirculante = bpDesejado.nonCurrentLiabilities || 0;
      patrimonioLiquido = bpDesejado.consolidatedShareholdersEquity || 0;
    }
    this.pct = (passivoCirculante + passivoNaoCirculante) / patrimonioLiquido;
    return (
      (passivoCirculante + passivoNaoCirculante) /
      patrimonioLiquido
    ).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoEND(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.end = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let passivoCirculante = 0;
    let passivoNaoCirculante = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      passivoCirculante = bpDesejado.currentLiabilities || 0;
      passivoNaoCirculante = bpDesejado.nonCurrentLiabilities || 0;
    }
    this.end = passivoCirculante / (passivoCirculante + passivoNaoCirculante);
    return (
      passivoCirculante /
      (passivoCirculante + passivoNaoCirculante)
    ).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoIPL(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.ipl = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let imobilizado = 0;
    let patrimonioLiquido = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      imobilizado = bpDesejado.propertyPlantEquipment || 0;
      patrimonioLiquido = bpDesejado.nonCurrentLiabilities || 0;
    }
    this.ipl = imobilizado / patrimonioLiquido;
    return (imobilizado / patrimonioLiquido).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoLG(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.lg = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let ativoCirculante = 0;
    let ativoRLP = 0;
    let passivoCirculante = 0;
    let passivoNaoCirculante = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      ativoCirculante = bpDesejado.currentAssets || 0;
      ativoRLP = bpDesejado.longTermRealizableAssets || 0;
      passivoCirculante = bpDesejado.currentLiabilities || 0;
      passivoNaoCirculante = bpDesejado.nonCurrentLiabilities || 0;
    }
    this.lg =
      (ativoCirculante + ativoRLP) / (passivoCirculante + passivoNaoCirculante);
    return (
      (ativoCirculante + ativoRLP) /
      (passivoCirculante + passivoNaoCirculante)
    ).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoLC(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.lc = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let ativoCirculante = 0;
    let passivoCirculante = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      ativoCirculante = bpDesejado.currentAssets || 0;
      passivoCirculante = bpDesejado.currentLiabilities || 0;
    }
    this.lc = ativoCirculante / passivoCirculante;
    return (ativoCirculante / passivoCirculante).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoLS(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0) {
      this.ls = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let caixaEqCaixa = 0;
    let contasAReceber = 0;
    let passivoCirculante = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    if (bpDesejado) {
      caixaEqCaixa = bpDesejado.cashAndEquivalents || 0;
      contasAReceber = bpDesejado.accountsReceivable || 0;
      passivoCirculante = bpDesejado.currentLiabilities || 0;
    }
    this.ls = (caixaEqCaixa + contasAReceber) / passivoCirculante;
    return ((caixaEqCaixa + contasAReceber) / passivoCirculante).toFixed(2); // Valor padrão caso algum dos valores não exista
  }

  calculoGA(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0 || !this.dreData) {
      this.ga = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let vendasLiquidas = 0;
    let ativoTotal = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    const dreDesejado = this.dreData.find((dre) => dre.year === anoDesejado);
    if (bpDesejado && dreDesejado) {
      vendasLiquidas = dreDesejado.netRevenue || 0;
      ativoTotal = bpDesejado.totalAssets || 0;
    }
    this.ga = vendasLiquidas / ativoTotal;
    return vendasLiquidas / ativoTotal; // Valor padrão caso algum dos valores não exista
  }

  calculoML(anoDesejado: number) {
    if (!this.dreData) {
      this.ml = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let lucroLiquido = 0;
    let vendasLiquidas = 0;
    const dreDesejado = this.dreData.find((dre) => dre.year === anoDesejado);
    if (dreDesejado) {
      lucroLiquido = dreDesejado.netIncome || 0;
      vendasLiquidas = dreDesejado.netRevenue || 0;
    }
    this.ml = lucroLiquido / vendasLiquidas;
    return lucroLiquido / vendasLiquidas; // Valor padrão caso algum dos valores não exista
  }

  calculoRA(anoDesejado: number) {
    if (!this.bpData || this.bpData.length === 0 || !this.dreData) {
      this.ra = 0;
      return 0; // Valor padrão quando não há dados disponíveis
    }
    let lucroLiquido = 0;
    let ativoTotal = 0;
    const bpDesejado = this.bpData.find((bp) => bp.year === anoDesejado);
    const dreDesejado = this.dreData.find((dre) => dre.year === anoDesejado);
    if (bpDesejado && dreDesejado) {
      lucroLiquido = dreDesejado.netIncome || 0;
      ativoTotal = bpDesejado.totalAssets || 0;
    }
    this.ra = lucroLiquido / ativoTotal;
    return lucroLiquido / ativoTotal; // Valor padrão caso algum dos valores não exista
  }
}
