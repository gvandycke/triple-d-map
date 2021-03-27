import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { data } from '../assests/data';
import { location } from '../models/location.model'
import {location_data} from '../assests/location-data';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // dark map => mapbox://styles/gregg1494/ckmh3bix82t8b17qit590blw7
  map!: mapboxgl.Map;
  style: string = 'mapbox://styles/gregg1494/ckmh3bix82t8b17qit590blw7';
  lat: number = 39.8097343;
  lng: number = -98.5556199;
  zoom: number = 4;
  index = 0;
  locations: location[] = []

  constructor(private http: HttpClient) { }

  buildMap() : void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      style: this.style,
      container: 'map',
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })

    this.map.getCanvas().style.cursor = 'default';
    this.map.addControl(new mapboxgl.FullscreenControl());
  }

  addPoints() : void {
    // this.getGeoLocations()
    // .forEach(o => o.pipe(map((response: any) => response.items[0].position))
    // .subscribe(r => {
    //   this.locations[this.index].lng = r.lng
    //   this.locations[this.index].lat = r.lat
    //   this.index++;
    //   new mapboxgl.Marker()
    //     .setLngLat([r.lng, r.lat])
    //     .addTo(this.map);
    // }))
    location_data.forEach(o => {
      new mapboxgl.Marker()
        .setLngLat([o.lng, o.lat])
        .addTo(this.map);
    })

    console.log(this.locations)
  }

  getGeoLocations() : Observable<Object>[] {
    let geoLocationResponses: Observable<Object>[] = [];
    data.forEach(d => {
      this.locations.push(new location(d, 0 , 0))
      geoLocationResponses.push(this.http.get('https://geocode.search.hereapi.com/v1/geocode?apikey=fkgER3FFSQ500KkwLxR0_gk5Id8SU3XMf2nEUDchnd8&q=' + d))
    })
    return geoLocationResponses;
  }
}
