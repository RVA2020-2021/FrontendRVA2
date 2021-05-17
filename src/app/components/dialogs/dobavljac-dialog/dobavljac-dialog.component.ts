import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {

  public flag: number;
  
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DobavljacDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Dobavljac,
              public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
  }
  public addDobavljac(): void {
    this.dobavljacService.addDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat dobavljac: '+ this.data.naziv, 'OK' , {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
          duration: 2500
        })
      }
    })
  }
  public updateDobavljac(): void {
    this.dobavljacService.updateDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen dobavljac: '+ this.data.naziv, 'OK' , {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
          duration: 2500
        })
      }
    })
  }
  public deleteDobavljac(): void {
    this.dobavljacService.deleteDobavljac(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan dobavljac: '+ this.data.naziv, 'OK' , {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
          duration: 2500
        })
      }
    })
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
}
