import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Category } from 'src/app/models/Category';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MY_FORMATS } from '../admin/admin.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class StatisticsComponent implements OnInit {
  item = new Item();
  keys = [];
  category = Category;
  items: Item[] = [];
  date = new FormControl();
  type = new FormControl();
  todayDate: Date = new Date();
  monthlyExpenses: string;
  monthlyExpensesByCategory: number;
  displayedColumns: string[] = ['position','name', 'quantity', 'cost', 'date'];
  chartData = [];
  chartLabels = [];

  categoriesChartData = [];
  categoriesChartLabels = [];

  itemsPerCategoryChartLabels = [];
  itemsPerCategoryChartData = [];

  @ViewChild(MatDatepicker) picker;

  constructor(private adminService: AdminService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.date = new FormControl(this.todayDate);
    const chosenDate = new Date(this.date.value);
    const year = chosenDate.getFullYear();
    const month = chosenDate.getMonth() + 1;
    this.adminService.getMonthlyExpenses(year, month).subscribe(
      (response) => {
        this.monthlyExpenses = response.toFixed(2);    
      },
      (err) => { alert(err.error); }
    )
    setTimeout(() => {
      this.adminService.getCurrentMonthsItems().subscribe(
        (response) => {
          this.items = response;
          this.items.forEach(i => {
            if (this.chartLabels.indexOf(i.name) === -1) {
              this.chartLabels.push(i.name);
              this.chartData.push(((this.items.filter(x => x.name === i.name).length / this.items.length) * 100).toFixed(0));
            }
          });
        },
        (err) => { alert(err.error); })
    }, 1000);

    this.keys = Object.keys(this.category);
    this.type = new FormControl('ALL');
    this.adminService.getCurrentMonthsItems().subscribe(
      (response) => {
        this.items = response;
        this.items.forEach(i => {
          if (this.categoriesChartLabels.indexOf(i.category) === -1) {
            this.categoriesChartLabels.push(i.category);
            this.categoriesChartData.push(((this.items.filter(x => x.category === i.category).length / this.items.length) * 100).toFixed(0));
          }
        });
      });

  }

  monthSelected(params) {
    this.date.setValue(params);
    this.picker.close();
    const chosenDate = new Date(this.date.value);
    const year = chosenDate.getFullYear();
    const month = chosenDate.getMonth() + 1;
    this.adminService.getMonthlyExpenses(year, month).subscribe(
      (response) => {
        this.monthlyExpenses = response.toFixed(2);
        this.categoriesChartData = [];
        this.categoriesChartLabels = [];
        this.chartData = [];
        this.chartLabels = [];
        this.itemsPerCategoryChartLabels = [];
        this.itemsPerCategoryChartData = [];
        this.items = [];
        this.monthlyExpensesByCategory = 0;
        this.type = new FormControl('ALL');
      },
      (err) => { alert(err.error); }
    );
    this.adminService.getItemsByYearAndMonth(year, month).subscribe(
      (response) => {
        this.items = response;
        this.items.forEach(i => {
          if (this.categoriesChartLabels.indexOf(i.category) === -1) {
            this.categoriesChartLabels.push(i.category);
            this.categoriesChartData.push(((this.items.filter(x => x.category === i.category).length / this.items.length) * 100).toFixed(0));
          }
        });
      },
      (err) => { alert(err.error); });

    this.adminService.getItemsByYearAndMonth(year, month).subscribe(
      (response) => {
        this.items = response;
        this.items.forEach(i => {
          if (this.chartLabels.indexOf(i.name) === -1) {
            this.chartLabels.push(i.name);
            this.chartData.push(((this.items.filter(x => x.name === i.name).length / this.items.length) * 100).toFixed(0));
          }
        });
      },
      (err) => { alert(err.error); });
  }


  categorySelected(value: string): void {
    const chosenDate = new Date(this.date.value);
    const year = chosenDate.getFullYear();
    const month = chosenDate.getMonth() + 1;
    if (value === 'ALL') {
      this.adminService.getItemsByYearAndMonth(year, month).subscribe(
        (response) => {
          this.items = response;
          this.items.forEach(i => {
            if (this.categoriesChartLabels.indexOf(i.category) === -1) {
              this.categoriesChartLabels.push(i.category);
              this.categoriesChartData.push(((this.items.filter(x => x.category === i.category).length / this.items.length) * 100).toFixed(0));
            }
          });
        },
        (err) => { alert(err.error); });
    }
    else {
      this.itemsPerCategoryChartData = [];
      this.itemsPerCategoryChartLabels = [];
      this.adminService.getItemsByCategoryYearAndMonth(value, year, month)
        .subscribe(
          (response) => {
            this.items = response;
            this.items.forEach(i => {
              if (this.itemsPerCategoryChartLabels.indexOf(i.name) === -1) {
                this.itemsPerCategoryChartLabels.push(i.name);
                this.itemsPerCategoryChartData.push(((this.items.filter(x => x.name === i.name).length / this.items.length) * 100).toFixed(0));
              }
            });
            this.monthlyExpensesByCategory = this.items.map(i => i.cost).reduce((sum, val) => sum + val, 0);
            console.log(this.monthlyExpensesByCategory)
          },
          (err) => { alert(err.error); });
    }
  }




  public getToken(): string {
    return this.authorizationService.getToken();
  }

  logout() {
    this.adminService.logout(this.getToken()).subscribe(
      () => { this.authorizationService.deleteToken(); },
      (err) => { alert(err.message); });
  }

}


