import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";
import getDecodedPath from "../../../utils/getDecodedPath";

const CogoMaps = dynamic(() => import("./map"), { ssr: false });

function ScheduleMap({ data, points = [], routesLoading = false }) {
    // const [isLoading, setLoading] = useState(true);
    const [curvePoints, setCurvePoints] = useState([]);
    const [remainingPoints, setRemainingPoints] = useState([]);
    const path = getDecodedPath(data?.[0]?.route?.coordinates || []);

    console.log(path);

    // useEffect(() => {
    //     if (points?.length > 0) {
    //         points?.map((p) => {
    //             let c = p;
    //             if (typeof p?.[0] === "object") {
    //                 c = p.flat();
    //             }
    //             setRemainingPoints((prevPoints) => [
    //                 ...prevPoints,
    //                 {
    //                     lat: c?.[1],
    //                     lng: c?.[0],
    //                 },
    //             ]);
    //             setCurvePoints((prevPoints) => [
    //                 ...prevPoints,
    //                 {
    //                     lat: c?.[1],
    //                     lng: c?.[0],
    //                 },
    //             ]);
    //             return true;
    //         });
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 0);
    //     } else {
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 0);
    //     }
    // }, [points, points?.length]);

    // if (routesLoading || isLoading) {
    //     return <div className={styles.loading}>Loading...</div>;
    // }

    return (
        <div className={styles.map}>
            <CogoMaps remainingPoints={remainingPoints} curvePoints={path} />
        </div>
    );
}

export default ScheduleMap;
