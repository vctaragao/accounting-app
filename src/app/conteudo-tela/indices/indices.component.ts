import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})
export class IndicesComponent {
  // anos do BP
  @Input() ano: number = 0;

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
}
