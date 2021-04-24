import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-view-all-items',
  templateUrl: './view-all-items.component.html',
  styleUrls: ['./view-all-items.component.scss']
})
export class ViewAllItemsComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['position', 'name', 'brand', 'category', 'quantity', 'unit', 'price', 'cost', 'date'];
  itemsArray: any = new MatTableDataSource<Item>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.itemsArray.sort = this.sort;
    this.itemsArray.paginator = this.paginator;
  }

  constructor(private adminService: AdminService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.adminService.getAllItems().subscribe(
      (response) => { this.itemsArray.data = response as Item[]; },
      (err) => { alert(err.error); }
    )
  }
  public getToken(): string {
    return this.authorizationService.getToken();
  }

  logout() {
    this.adminService.logout(this.getToken()).subscribe(
      () => { this.authorizationService.deleteToken(); },
      (err) => { alert(err.error); });
  }



}
