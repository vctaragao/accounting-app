import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CsvProcessor } from './csv-processor';
import { TopoTelaComponent } from './topo-tela/topo-tela.component';
import { ConteudoTelaComponent } from './conteudo-tela/conteudo-tela.component';
import { IndicesComponent } from './conteudo-tela/indices/indices.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoTelaComponent,
    ConteudoTelaComponent,
    IndicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CsvProcessor],
  bootstrap: [AppComponent]
})
export class AppModule { }
