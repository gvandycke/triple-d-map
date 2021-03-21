import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/mapbox.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap();
    this.map.addPoints();
  }

}
