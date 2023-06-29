import { Component } from '@angular/core';

@Component({
  selector: 'app-conteudo-tela',
  templateUrl: './conteudo-tela.component.html',
  styleUrls: ['./conteudo-tela.component.css']
})
export class ConteudoTelaComponent {
  //incides de estrutura de capital
  pct: number = 0;
  end: number = 0;
  ipl: number = 0;

  //indices de liquidez
  lg: number = 0;
  lc: number = 0;
  ls: number = 0;

  //indices de rentabilidade
  ga: number = 0;
  ml: number = 0;
  ra: number = 0;

  // anos do BP
  ano1: number = 2022;
}
