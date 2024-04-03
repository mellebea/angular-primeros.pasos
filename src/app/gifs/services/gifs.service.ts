import { SearchResponse, Images, FixedHeight, Gif } from './../interfaces/gifs.interfeces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[]=[];
  private _tagHistory:string[]=[];
  private apiKey:string='TUWE3l4sutxIBaeOYl5PCMDLqNcDQTQZ';
  private serviceURL:string='https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service Ready');
   }

  get tagsHistory(){
    return [...this._tagHistory];
  }
  private organizeHistory(tag:string){
    tag=tag.toLowerCase();
    if (this._tagHistory.includes(tag))
    {
      this._tagHistory=this._tagHistory.filter((oldtag)=>oldtag !==tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory=this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagHistory) );
  }

  private loadLocalStorage():void
  {
    if (!localStorage.getItem('history')) return;
    this._tagHistory=JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length===0)return;
    this.searchTag(this._tagHistory[0]);
  }


searchTag(tag:string):void{
  if (tag.length===0)return;
  this.organizeHistory(tag);

  const params=new HttpParams()
  .set('api_key',this.apiKey)
  .set ('limit','10')
  .set('q',tag)

  this.http.get<SearchResponse>(`${this.serviceURL}/search?`,{params} )
  .subscribe(resp=>
    {
      this.gifList=resp.data;
      console.log({gif:this.gifList});
    }) 
}

  /********UN TIPO DE SOLUCION********/
  /*async searchTag( tag:string):Promise<void>  {
    if (tag.length===0)return;
    this.organizeHistory(tag);
    
    const resp=await fetch('https://api.giphy.com/v1/gifs/search?api_key=TUWE3l4sutxIBaeOYl5PCMDLqNcDQTQZ&q=Valorant&limit=10')
    const data=await resp.json();
    console.log(data);

    /*************Una forma de hacerlo */
    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=TUWE3l4sutxIBaeOYl5PCMDLqNcDQTQZ&q=Valorant&limit=10')
    .then(resp=>resp.json())
    .then(data=>console.log(data));
    //this._tagHistory.unshift(tag);
  }*/
}
