import { Component, OnInit, Input, ViewChild, SimpleChange } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper'; 
import { Property } from '../../app.models';
import { Settings, AppSettings } from '../../app.settings';

import { AppService } from '../../app.service'; 
import { CompareOverviewComponent } from '../compare-overview/compare-overview.component'; 

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'] 
})
export class PropertyItemComponent implements OnInit {
  @Input() property: Property;
  @Input() dateCreated: any;
  @Input() gallery: any
  @Input() viewType: string = "grid";
  @Input() viewColChanged: boolean = false; 
  @Input() fullWidthPage: boolean = true;   
  public column:number = 4;
  public desc= "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, expedita consequatur ex fuga enim beatae numquam atque neque voluptatum officia aperiam nesciunt nostrum quia! Quisquam optio atque architecto quibusdam itaque?"
  // public address:string; 
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    // new Date(data[0].dateCreated).getTime()
   }

  ngAfterViewInit(){
    this.initCarousel();
    // this.appService.getAddress(this.property.location.lat, this.property.location.lng).subscribe(data=>{
    //   console.log(data['results'][0]['formatted_address']);
    //   this.address = data['results'][0]['formatted_address'];
    // })
  } 
 
  ngOnChanges(changes: {[propKey: string]: SimpleChange}){  
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue);
      if(!changes.viewColChanged.isFirstChange()){
        if(this.property.gallery.length > 1){     
           this.directiveRef.update();  
        } 
      }
    } 


    

    for (let propName in changes) {      
      // let changedProp = changes[propName];
      // if (!changedProp.isFirstChange()) {
      //   if(this.property.gallery.length > 1){
      //     this.initCarousel();
      //     this.config.autoHeight = true;       
      //     this.directiveRef.update();  
      //   }       
      // }      
    }  
  }
  getCreatedDateInTwoDays(dateCreated: any){
    return new Date(dateCreated).getTime() + 172800000
  }

  getCurrentDate(){
    return new Date().getTime() 
  }

  public getColumnCount(value){
    if(value == 25){
      this.column = 4;
    }
    else if(value == 33.3){
      this.column = 3;
    }
    else if(value == 50){
      this.column = 2
    }
    else{
      this.column = 1;
    }
  }

  public getStatusBgColor(status){
    switch (status) {
      case 'VENTE':
        return '#558B2F';  
      case 'LOCATION':
        return '#1E88E5'; 
      case 'MIXTE':
        return '#009688';
      case 'BAIE':
        return '#FFA000';
      case 'Hot Offer':
        return '#F44336';
      case 'Sold':
        return '#000';
      default: 
        return '#01579B';
    }
  }

public setBgColorForNewestAnnonce(){
  return "#F44336"
}
  public initCarousel(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: false,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,        
      loop: true,
      preloadImages: false,
      lazy: true,  
      nested: true,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false
      // },
      speed: 500,
      effect: "slide"
    }
  }
  

  public addToCompare(){
    this.appService.addToCompare(this.property, CompareOverviewComponent, (this.settings.rtl) ? 'rtl':'ltr'); 
  }

  public onCompare(){
    return this.appService.Data.compareList.filter(item=>item.id == this.property.id)[0];
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl':'ltr');
  }

  public onFavorites(){
    return this.appService.Data.favorites.filter(item=>item.id == this.property.id)[0];
  }


}
