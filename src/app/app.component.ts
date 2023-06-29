import { Component, ElementRef, ViewChild } from '@angular/core';
import { CsvProcessor } from './csv-processor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | undefined;
  inputValue: string= "as";

  constructor(private csvProcessor: CsvProcessor) { }

  chooseFile() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    // Perform file upload logic here
    if (this.selectedFile) {
      console.log('processing file:', this.selectedFile);
      // You can send the file to an API or process it further
      // using FileReader or any other method
      this.csvProcessor.processCsvFile(this.selectedFile);
    }
  }
}
