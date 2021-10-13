import { Component, OnInit } from '@angular/core';
/**importar librerías */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //coordenadas: (lat:53.46424017781441, lng:-2.291142394046567)
  lat: number = 53.46424017781441;
  lng: number = -2.291142394046567;
  constructor(
    private geoLoca: Geolocation,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  this.cargarMapa();
  }

  async cargarMapa() {
    const cargar = await this.loadingCtrl.create({
      message: "Cargando mapa..."
    });
    await cargar.present();
    const ubicacion = {
      lat: this.lat,
      lng: this.lng
    };
    const mapaHtml: HTMLElement = document.getElementById("map");
    const map = new google.maps.Map(mapaHtml, {
      center: ubicacion,
      zoom: 12
    });
    google.maps.event.addListenerOnce(map, 'idle', () => {
      cargar.dismiss();
    });
  }
}
