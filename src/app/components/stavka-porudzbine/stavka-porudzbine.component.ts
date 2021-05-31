import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Artikl } from 'src/app/models/artikl';
import { Porudzbina } from 'src/app/models/porudzbina';
import { StavkaPorudzbine } from 'src/app/models/stavka-porudzbine';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'porudzbina', 'artikl', 'actions'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;
  subscription: Subscription;
  @Input() selektovanaPorudzbina: Porudzbina;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(private stavkaPorudzbineService: StavkaPorudzbineService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData() {
    this.subscription = this.stavkaPorudzbineService.getStavkeZaPorudzbinu(this.selektovanaPorudzbina.id).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'artikl' ? currentTerm + data.artikl.naziv : currentTerm + data[key];
          }
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
  
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'artikl': return data.artikl.naziv.toLowerCase();
  
            default: return data[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }
  public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string, cena?: number,
    porudzbina?: Porudzbina, artikl?: Artikl) {
      const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent,
           {  data: {id, redniBroj, kolicina, jedinicaMere, cena, porudzbina, artikl}});
      dialogRef.componentInstance.flag = flag;
      if(flag === 1) {
        dialogRef.componentInstance.data.porudzbina = this.selektovanaPorudzbina;
      }
      dialogRef.afterClosed().subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  } 
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }

}
