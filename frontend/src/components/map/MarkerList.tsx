import React from "react";
import {MarkerIFace} from "./Map";
import {MarkerComponent} from "./MarkerComponent";

interface MarkerListProps {
    objects:MarkerIFace[] | undefined
}
export const MarkerList = (props:MarkerListProps) => {
    const {objects} = props

    return (
        <>
            {objects && objects.map((marker: MarkerIFace, index: number) => (
                <MarkerComponent key={index} marker={marker}/>
            ))}
        </>
    )
}