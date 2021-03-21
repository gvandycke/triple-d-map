export interface _ {
    results: Results;
}
 
interface Results {
    locations: Locations []
}

interface Locations {
    latLng: LatLng
}

interface LatLng {
    lat: Number,
    lng: Number
}