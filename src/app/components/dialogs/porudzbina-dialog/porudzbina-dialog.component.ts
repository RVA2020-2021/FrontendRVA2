import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  public flag: number;
  dobavljaci: Dobavljac[];

  constructor( public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public porudzbinaService: PorudzbinaService,
    public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljacs().subscribe(
      data => {
        this.dobavljaci = data;
      }
    );
  }
  compareTo(a,b) {
    return a.id == b.id;
  }
  public add(): void {
    this.porudzbinaService.addPorudzbina(this.data)
    .subscribe(() => {
      this.snackBar.open('Porudžbina uspešno dodata: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja porudžbine: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public update(): void {
    this.porudzbinaService.updatePorudzbina(this.data)
    .subscribe(() => {
      this.snackBar.open('Porudžbina uspešno izmenjena: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene porudžbine: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Porudžbina uspešno obrisana: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja porudžbine: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.' + this.data.id, 'Zatvori', {
      duration: 1000
    })
  }


}
