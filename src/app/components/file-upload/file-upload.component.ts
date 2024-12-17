import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends NonRoutableComponent implements OnInit, AfterViewInit {
  

  onOpenFileDialogClicked($event: MouseEvent) {
    if (this.preview) {
      return;
    }
    this.fileUploadControl?.nativeElement.click();
  }


  
  @Input() fileControlName: string | null = null; // TODO !!!!

  @Input() maxSize: number = 2 * 1024 * 1024;

  @Input() form!: FormGroup;
  
  @Output() fileSet = new EventEmitter<File>(); // xtra
  
  @Output() fileRemoved = new EventEmitter<File>(); // xtra
  
  @ViewChild('fileUploadControl') fileUploadControl?: ElementRef;

  isValidSize: boolean = true;

  protected preview: File | undefined | null;
  file: File | null | undefined;
  
  constructor(ref: ElementRef) {
    super();
  }

  ngAfterViewInit(): void {
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.form?.addControl(this.fileControlName!, new FormControl());
  }

  onFileUploadChanged($event: any) {
    const file: File = $event.target.files[0];
    this.form?.get(this.fileControlName!)?.reset();
    
    if (file) {
      this.file = file;
      this.preview = file;
    }
    
    this.isValidSize = file.size < this.maxSize;
    if (!this.isValidSize) {
      this.form?.controls[this.fileControlName!].setErrors({'invalidFileSize': true, 'fileExtension': true});
    }


    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.preview = event.target.result;

      this.form.get(this.fileControlName!)?.setValue(file);
      this.form.get(this.fileControlName!)?.markAsDirty();
      this.form.get(this.fileControlName!)?.markAsTouched();
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(this.preview!);

    this.fileSet.emit(this.file!);
  }

  // DO NOT MARK FORM AS TOUCHED OR DIRTY WHEN IMAGE IS REMOVED, BECAUSE THAT IS A SEPARATE API CALL
  onRemovePreviewImageClicked($event: any) {
    this.fileUploadControl!.nativeElement.value = "";
    this.form?.get(this.fileControlName!)?.reset();

    this.fileRemoved.emit(this.file!);
    this.preview = null;
  }
}
