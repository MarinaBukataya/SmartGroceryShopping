import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private router: Router) { }
  
  printDocument(documentName: string) {
    window.print();
    this.router.navigate(['/',
      {
        outlets: {
          'print': ['print', documentName]
        }
      }]);
  }

  
}
