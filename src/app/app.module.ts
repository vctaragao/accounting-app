import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BPCsvProcessor } from './bp-csv-processor';
import { DRECsvProcessor } from './dre-csv-processor';
import { TopoTelaComponent } from './topo-tela/topo-tela.component';
import { ConteudoTelaComponent } from './conteudo-tela/conteudo-tela.component';
import { IndicesComponent } from './conteudo-tela/indices/indices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TopoTelaComponent,
    ConteudoTelaComponent,
    IndicesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [BPCsvProcessor, DRECsvProcessor],
  bootstrap: [AppComponent],
})
export class AppModule {}
