<template>
    <div> This is a locator</div> 
    <div>
        <div> 
        <h4>Your location</h4> 
        </div>
    <button>search on map</button>
    <div>{{message}}</div>
    <div v-html='message2'></div>
        latitude:{{currPosition.lat.toFixed(2)}}, 
        longitude:{{currPosition.lng.toFixed(2)}}
    <span>{{location}}</span>
    
    <button @click="search()">search</button>
    <div>
        <input type='text' v-model='location'/>       
    </div>
    <div ref='mapDiv' style='width:100%; height:80vh'/>

   </div>

</template>

<script> 

/*  eslint-disabled no-undef */
import {computed, ref,onMounted,onUnmounted, watch} from 'vue';
import {useGeolocation} from './geoLocation'
import {Loader} from '@googlemaps/js-api-loader'
import { MarkerClusterer } from "@googlemaps/markerclusterer";
const GOOGLE_MAPS_API_KEY = "AIzaSyCtHcN-m8XArA42MnpLTWNDYWpbzdslSSA"

export default{ 
    setup(){
        const message = ' my home' //'<h3> my home</h3>'
        const message2 = ' my second home'
        const location = ref('home')

        const{coords} = useGeolocation()
        // console.log("coords: " , coords) //{latitude: 43.8250583, longitude: -79.2695868
        // console.log("coords.value:  ",coords.value) //{latitude: 0, longitude: 0}
        const currPosition = computed(()=>({
            lat: coords.value.latitude,
            lng: coords.value.longitude            
        }))
        // console.log('currPosition:', currPosition.value) // {lat: 0, lng: 0}
        
        function search(){
              alert('you clicked search')
        }
        
        const mapDiv = ref(null)
        const loader = new Loader({apiKey:GOOGLE_MAPS_API_KEY})  
        let map = ref(null)  

// const markerCluster = new MarkerClusterer({ markers, map });
    async function initializeMap() {
      await new Promise((resolve) => {
        const watcher = setInterval(() => {
          if (coords.value.latitude !== 0 || coords.value.longitude !== 0) {
            clearInterval(watcher);
            resolve();
          }
        }, 100);
      });

        loader.load().then(async() => {
        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker",);
        
         map.value = new Map(mapDiv.value, {
          center: currPosition.value,
          zoom: 7
        });
      });

    const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       // Add some markers to the map.
    const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: label,
      glyphColor: "white",
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(position.lat + ", " + position.lng);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });

      // loader.load().then(() => {
      //   map.value = new google.maps.Map(mapDiv.value, {
      //     center: currPosition.value,
      //     zoom: 7
      //   });
      // });
    }
const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];
    onMounted(()=>{  
         
             initializeMap(currPosition.value)                        
                console.log("currPosition.value: ", currPosition.value)           
        })
        return {search, message,message2, location,currPosition, mapDiv }
}
}
</script>

<style scope>
.text-center{
    text-align: center;
}
</style>