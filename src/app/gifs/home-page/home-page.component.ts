import { GifsService } from './../services/gifs.service';
import { Component } from '@angular/core';

import { Gif } from '../interfaces/gifs.interfeces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  /*Inyectando el Servicio GifsService */
  constructor(private gifsServices:GifsService){}
  
  get gif():Gif[]{
    return this.gifsServices.gifList;
  }
}
