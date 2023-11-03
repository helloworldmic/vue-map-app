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
const markerCluster = new MarkerClusterer({ markers, map });
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


 async function initializeMap() {
      await new Promise((resolve) => {
        const watcher = setInterval(() => {
          if (coords.value.latitude !== 0 || coords.value.longitude !== 0) {
            clearInterval(watcher);
            resolve();
          }
        }, 100);
      });

      loader.load().then(() => {
        map.value = new google.maps.Map(mapDiv.value, {
          center: currPosition.value,
          zoom: 7
        });
      });
    }
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