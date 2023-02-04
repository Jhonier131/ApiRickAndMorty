import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formSearch:FormGroup ;
  constructor(fb:FormBuilder, private service: HomeService) { 
    this.formSearch=fb.group({
      name:['']
    })
  }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.formSearch.get('name').value);
    this.service.filter(this.formSearch.get('name').value).subscribe((data)=>{
      console.log(data);
      
    })
  }
}
