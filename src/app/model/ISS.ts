export interface ISS {
    timestamp: number;
    // tslint:disable-next-line:variable-name
    iss_position: ISSPosition;
}

export interface ISSPosition {
    longitude: string;
    latitude: string;
}

