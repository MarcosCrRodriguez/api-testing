import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Product } from './../../models/product';
import { Family } from './../../models/family';
import { Location } from './../../models/location';
import { Transaction } from './../../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public products$: Observable<Product[]>;
  public families$: Observable<Family[]>;
  public locations$: Observable<Location[]>;
  public transactions$: Observable<Transaction[]>;

  constructor(private dataService: DataService, private router: Router) {
    this.products$ = this.dataService.get_products();
    this.families$ = this.dataService.get_families();
    this.locations$ = this.dataService.get_locations();
    this.transactions$ = this.dataService.get_transactions();
  }

  ingresoMayorMenor() {
    this.router.navigate(['/mayor-menor']);
  }
}
