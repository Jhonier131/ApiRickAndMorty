import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage = 1;
  arrayData = {
    info: {
      pages: 0,
      count: 0,
      next: '',
      prev: ''
    },
    results: []
  };
  formSearch: FormGroup;

  constructor(private srv: HomeService, fb: FormBuilder, private router: Router) {
    this.formSearch = fb.group({
      name: ['']
    })
  }

  ngOnInit(): void {
    this.rickMorty();
  }

  rickMorty() {
    this.srv.getRickAndMortyCharacter().subscribe({
      next: (data) => {
        this.arrayData = data
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changePage() {
    if (this.arrayData.info.next !== null) {
      this.srv.changePage(this.arrayData.info.next).subscribe({
        next: (data) => {
          this.arrayData = data
          this.currentPage++
          console.log(data);
        }
      })
    }
  }

  prevPage() {
    if (this.arrayData.info.prev !== null) {
      this.srv.changePage(this.arrayData.info.prev).subscribe({
        next: (data) => {
          this.arrayData = data
          this.currentPage--
          console.log(data);
        }
      })
    }
  }

  submit() {
    this.currentPage = 1;
    console.log(this.formSearch.get('name').value);
    this.srv.filterGender(this.formSearch.get('name').value).subscribe({
      next: (data) => {
        this.arrayData = data
      },
      error: (err) => {
        this.srv.filter(this.formSearch.get('name').value).subscribe((data) => {
          this.arrayData = data
        })
      }

    })
  }
}
