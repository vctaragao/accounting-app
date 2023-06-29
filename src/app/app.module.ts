import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BPCsvProcessor } from './bp-csv-processor';
import { DRECsvProcessor } from './dre-csv-processor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    BPCsvProcessor,
    DRECsvProcessor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
