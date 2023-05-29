import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { isSameDay } from '@cogoport/utils';
import styles from './styles.module.css';


const CogoMaps = dynamic(() => import('./map'), { ssr: false });

function TrackingMap({
	points = [],
	routesLoading = false,
	destination = {},
}) {
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);

	useEffect(() => {
		if (points?.length > 0) {
				setRemainingPoints(points);
				setCurvePoints(points);
				setLoading(false);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 0);
		}
	}, [points?.length]);

	if (routesLoading || isLoading) {
		return <div className={styles.MapLoading}>Loading...</div>;
	}
	return (
		<div className={styles.MapContainer}>
			<CogoMaps
				remainingPoints={remainingPoints}
				curvePoints={curvePoints}
				destination={destination}
			/>
		</div>
	);
}

export default TrackingMap;
