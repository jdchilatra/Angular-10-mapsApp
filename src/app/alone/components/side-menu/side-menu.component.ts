import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
  route:string;
  name: string;
}

@Component({
  standalone:true,
  imports:[
    CommonModule,
    RouterModule
  ],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[] =[
    { route:'/maps/fullscreen', name: 'Full Screen' },
    { route:'/maps/zoom-rangue', name: 'Zoom-Rangue' },
    { route:'/maps/markers', name: 'Markers' },
    { route:'/maps/properties', name: 'Houses' },
    { route:'/alone', name: 'Alone page' }
  ]
}
