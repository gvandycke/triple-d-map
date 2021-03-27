export class location {
    public address: string;
    public lng: number;
    public lat: number;

    constructor(address: string, lng: number, lat: number) {
        this.address = address;
        this.lng = lng;
        this.lat = lat;
    }

}
