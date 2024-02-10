import { Component, OnDestroy, OnInit } from '@angular/core';
import * as tus from "tus-js-client";

@Component({
  selector: 'app-domain-look-ups',
  standalone: true,
  imports: [],
  templateUrl: './domain-look-ups.component.html',
  styleUrl: './domain-look-ups.component.scss'
})
export class DomainLookUpsComponent  implements OnInit, OnDestroy{
  progress: number = 0;
  errorMessage:string = ''
  warningMessage:string = ''
  sucessMessage:string = ''

  constructor(){}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  changeFile(event:any){
    if (!event.target.files[0]) return;
    const fileExtension = event.target.files[0].name.split('.').pop().toLowerCase();
    if (!['csv','xlsx','txt'].includes(fileExtension)) {
      this.errorMessage='invalid type'
      setTimeout(() => {
        this.errorMessage=''
      }, 2000);
      return
    };
    this.uploadFile(event.target.files[0])
  }

  uploadFile(file: File) {
    const upload = new tus.Upload(file, {
      endpoint: "http://localhost:3003/files/",
      chunkSize: 5 * 1024 * 1024, // Set your desired chunk size
      retryDelays: [0, 3000, 5000, 10000, 20000], // Retry delays in milliseconds
      metadata: {
        filename: file.name,
        filetype: file.type
      },
      onError: error => {
        this.errorMessage = error.message
        setTimeout(() => {
          this.errorMessage=''
        }, 2000);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        this.progress =  (bytesUploaded / bytesTotal * 100);
      },
      onSuccess: () => {
        this.sucessMessage = "Upload complete"
        setTimeout(() => {
          this.sucessMessage=''
        }, 2000);
      }
    });
  
    // upload.start();

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }
  
      // Start the upload
      upload.start()
    })
  }


  
}
