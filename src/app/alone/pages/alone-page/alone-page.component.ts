import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  //Las dependencias las importa el componente, no depende de nadie más, por eso es un stand alone compoennt
  imports: [
    CommonModule,
    CounterAloneComponent,
    SideMenuComponent,
  ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}
