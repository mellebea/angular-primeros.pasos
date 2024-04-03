import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GifsService } from '../gifs/services/gifs.service';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent,
  ],
  imports: [
    CommonModule
  ],
  providers:[
    GifsService
  ],
  exports:[
    SidebarComponent,
    LazyImageComponent // se exporta para poder se usado en el gifs componente
  ]
})
export class SharedModule { }
