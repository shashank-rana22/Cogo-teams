import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";
import getDecodedPath from "../../../utils/getDecodedPath";

const CogoMaps = dynamic(() => import("./map"), { ssr: false });

function ScheduleMap({ data, routesLoading = false }) {
    // const [isLoading, setLoading] = useState(true);
    const [curvePoints, setCurvePoints] = useState([]);
    const [remainingPoints, setRemainingPoints] = useState([]);
    const path = getDecodedPath(data?.[0]?.route?.coordinates || []);
    const points = getDecodedPath(data?.[0]?.route?.points || []);
    const [bounds, setBounds] = useState([]);

    return (
        <div className={styles.map}>
            <CogoMaps
                points={points}
                path={path}
                bounds={bounds}
                setBounds={setBounds}
            />
        </div>
    );
}

export default ScheduleMap;
