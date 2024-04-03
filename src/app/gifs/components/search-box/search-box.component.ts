import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
  <h5>Buscar</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
  >
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private GifsService:GifsService){}

  searchTag(){
    const newTag=this.tagInput.nativeElement.value;
    this.GifsService.searchTag(newTag);

    console.log({newTag});
    this.tagInput.nativeElement.value='';
  }
  


  /*
  searchTag (newTag: string){
    console.log({newTag});
  }
  */
}
