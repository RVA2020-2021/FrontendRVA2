import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datum', 'isporuceno', 'iznos', 'placeno', 'dobavljac', 'actions'];
  dataSource: MatTableDataSource<Porudzbina>;
  subsciption: Subscription;
  selektovanaPorudzbina: Porudzbina;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(private porudzbinaService: PorudzbinaService, 
            private dialog: MatDialog) { }
 
  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.subsciption = this.porudzbinaService.getAllPorudzbine().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) =>{
        const accumulator = (currentTerm, key) => {
          return key === 'dobavljac' ? currentTerm + data.dobavljac.naziv : currentTerm + data[key];
        }
        const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'dobavljac': return data.dobavljac.naziv.toLowerCase();

          default: return data[property];
        }
      };

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }
  public openDialog(flag: number, id?: number, datum?:Date,isporuceno?:Date, iznos?:number, placeno?: boolean, dobavljac?:Dobavljac) {
    const dialogRef = this.dialog.open(PorudzbinaDialogComponent, 
      {data: {
        id,datum,isporuceno,iznos,placeno,dobavljac
      }});
    dialogRef.componentInstance.flag = flag; 
    dialogRef.afterClosed().subscribe(res => {
      if(res === 1)
      {
        this.loadData();
      }
    })
  }
  selectRow(row: any){
    this.selektovanaPorudzbina = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }
}
