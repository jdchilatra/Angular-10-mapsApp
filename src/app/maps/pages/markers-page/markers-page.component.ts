import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color:string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{



  @ViewChild('map') divMap? : ElementRef;
  public zoom: number = 13;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(-75.67, 4.53);
  public markers: MarkerAndColor[] = [];


  ngAfterViewInit(): void {
    if(!this.divMap)
      return;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
    /*
    const markerHtml = document.createElement('div');
    markerHtml.innerHTML ='DDDDD';

    const marker = new Marker({
      //element : markerHtml
    })
      .setLngLat(this.currentCenter)
      .addTo(this.map!)
    */

  }

  createMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter()
    this.addMarker(lngLat,color);
  }

  addMarker(lngLat: LngLat, color:string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({marker,color});
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1)
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] = this.markers.map( (colorMarker) => {
      return {
        color: colorMarker.color,
        lngLat: colorMarker.marker.getLngLat().toArray()
      }
    })
    localStorage.setItem('plainMarkers',JSON.stringify(plainMarker));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ({color,lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng,lat)
      this.addMarker(coords,color);
    })

  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado'

    this.map.on('dragend', (ev) => {
      this.saveToLocalStorage();
    })
  }
}
