import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { error } from 'selenium-webdriver';
import { Artikl } from 'src/app/models/artikl';
import { StavkaPorudzbine } from 'src/app/models/stavka-porudzbine';
import { ArtiklService } from 'src/app/services/artikl.service';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { StavkaPorudzbineComponent } from '../../stavka-porudzbine/stavka-porudzbine.component';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit, OnDestroy {

  artikli: Artikl[];
  public flag: number;
  artiklSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
    public artiklService: ArtiklService,
    public stavkaPorudzbineService: StavkaPorudzbineService) { }

  ngOnDestroy(): void {
   this.artiklSubscription.unsubscribe();

  }

  ngOnInit(): void {
    this.artiklSubscription = this.artiklService.getAllArtikls().subscribe(
      data => {
        this.artikli = data;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.stavkaPorudzbineService.addStavkaPorudzbine(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka porudžbine uspešno dodata: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja stavke porudžbine: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public update(): void {
    this.stavkaPorudzbineService.updateStavkaPorudzbine(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka porudžbine uspešno izmenjena: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene stavke porudžbine: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public delete(): void {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Stavka porudžbine uspešno obrisana: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja stavke porudžbine: ' + this.data.id, 'Zatvori', {
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
