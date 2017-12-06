import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const google: any;
@Component({
  templateUrl: 'tours.component.html',
  styleUrls: ['tours.component.css']  
})
export class toursComponent implements OnInit {
  public map;
  public originPlaceId: any = null;
  public destinationPlaceId: any = null;
  public originPlaceObj: any = null;
  public destinationPlaceObj: any = null;
  public travelMode: string = 'DRIVING';  
  public directionsService: any;
  public directionsDisplay: any;
  public pointsDataSource = [];
  public markersData = [];
  public locationsAdded = 1;


  @ViewChild('mapElement') public mapElementRef: ElementRef;
  @ViewChild("searchFrom")  public searchFromElementRef: ElementRef;
  @ViewChild("searchTo")  public searchToElementRef: ElementRef;

  constructor() {}


  ngOnInit() {   
    this.initGoogleMap();       
  }
  
  /*
    Loading the google map Instance
  */
  initGoogleMap() {
      this.map = new google.maps.Map(this.mapElementRef.nativeElement, {
        mapTypeControl: false,
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggableCursor: "crosshair",
        fullscreenControl: true
      });

      this.AutocompleteDirectionsHandler();
  }

  AutocompleteDirectionsHandler() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(this.map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        this.searchFromElementRef.nativeElement, {placeIdOnly: false,bounds: null, componentRestrictions: null, types: []});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
      this.searchToElementRef.nativeElement, {placeIdOnly: false,bounds: null, componentRestrictions: null, types: []});

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');  

  }

  setupPlaceChangedListener(autocomplete,mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }      
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
        if (place != null && place.geometry != null) {
           me.originPlaceObj = place;
        }
      } else {
        me.destinationPlaceId = place.place_id;
        if (place != null && place.geometry != null) {
          me.destinationPlaceObj = place;
        }
      }      
    });
  };
  
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;

    this.directionsService.route({
      origin: {'placeId': this.originPlaceId},
      destination: {'placeId': this.destinationPlaceId},
      travelMode: this.travelMode
    }, function(response, status) {
      if (status === 'OK') {
        me.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };
  /*
   drawing way points 
  */
  drawMarkerPoints(){    
    if(this.destinationPlaceObj && this.originPlaceObj){      
      var point = { locationFromName: this.originPlaceObj['formatted_address'],locationToName: this.destinationPlaceObj['formatted_address'] };
      this.pointsDataSource.push(point);
    }      
    this.originPlaceObj = null;
    this.destinationPlaceObj = null;
    this.searchFromElementRef.nativeElement.value = "";
    this.searchToElementRef.nativeElement.value = "";
    this.route();   
  }

  clearWaypointMarkers() {   
    if (this.directionsDisplay != null) {
        this.directionsDisplay.setMap(null);
        this.directionsDisplay = null;
    }
  } 

   deleteItem(index){
     this.pointsDataSource.splice(index,1);
     this.clearWaypointMarkers();
   }
}
