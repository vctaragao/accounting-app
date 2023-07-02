import { Component, Input } from '@angular/core';
import { Balance } from '../bp-csv-processor';
import { DRE } from '../dre-csv-processor';

@Component({
  selector: 'app-conteudo-tela',
  templateUrl: './conteudo-tela.component.html',
  styleUrls: ['./conteudo-tela.component.css'],
})
export class ConteudoTelaComponent {
  // anos do BP
  @Input() anos: number[] = [];
  @Input() bpData: Balance[] = [];
  @Input() dreData: DRE[] = [];
}
