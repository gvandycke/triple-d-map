import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { data } from '../assests/data';
import { _ } from '../models/geoLocationResponse'
import { map } from "rxjs/operators";

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

  constructor(private http: HttpClient) { }

  buildMap() {
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

  addPoints() {
    this.getGeoLocations()
    .forEach(o => o.pipe(map((response: any) => response.items[0].position))
    .subscribe(r => {
      new mapboxgl.Marker()
        .setLngLat([r.lng, r.lat])
        .addTo(this.map);
    }))
  }

  getGeoLocations() : Observable<Object>[] {
    let geoLocationResponses: Observable<Object>[] = [];
    data.forEach(d => {
      geoLocationResponses.push(this.http.get('https://geocode.search.hereapi.com/v1/geocode?apikey=NaLn9yp29BagdpPhJmvPQ0RUPOtZ8Z39cYK8nTvJAU8&q=' + d))
    })
    return geoLocationResponses;
  }
}




