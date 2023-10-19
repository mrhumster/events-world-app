import L from "leaflet";

export interface ResponseIFace {
    response: {
        GeoObjectCollection: GeoObjectCollectionIFace
    }
}

export interface GeoObjectCollectionIFace {
    featureMember: FeatureMemberItemIFace[],
    metaDataProperty?: {
        GeocoderResponseMetaData?: {
            found?: string,
            request?: string,
            results?: string,
            boundedBy?: {
                Envelope?: {
                    lowerCorner?: string,
                    upperCorner?: string
                }
            }
        }
    }
}

export interface FeatureMemberItemIFace {
    GeoObject: {
        Point: {
            pos: string
        },
        boundedBy?: {
            Envelope?: {
                loweCorner?: string,
                upperCorner?: string
            },
            description?: string | undefined
        },
        metaDataProperty?: {
            GeocoderMetaData?: {
                precision?: string,
                text?: string,
                kind?: string,
                Address?: {
                    country_code?: string,
                    formatted?: string
                    Components?: [
                        {
                            kind?: string,
                            name?: string
                        }
                    ]
                },
                AddressDetails?: {
                    Country?: {
                        AddressLine?: string,
                        CountryName?: string,
                        CountryNameCode?: string,
                        AdministrativeArea?: {
                            AdministrativeAreaName?: string
                        }
                    }
                }
            }
        },
        name?: string,
        uri?: string
        description?: string | undefined
    },
    latlng: L.LatLngLiteral
}

export interface ResponseError {
    response: {
        status: number,
        data: {
            detail: string
        }
    }
}