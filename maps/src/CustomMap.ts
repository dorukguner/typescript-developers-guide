/// <reference types="@types/google.maps" />

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 1,
    })
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      position: mappable.location,
      map: this.googleMap,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    })
  }
}