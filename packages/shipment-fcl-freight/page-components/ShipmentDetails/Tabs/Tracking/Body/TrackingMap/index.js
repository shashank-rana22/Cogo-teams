import { isSameDay } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

function TrackingMap({
	points = [],
	shipmentType = '',
	routesLoading = false,
}) {
	const [currentMilestone, setCurrentMilestone] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [completedPoints, setCompletedPoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);

	const resetPointAndMarkers = () => {
		setLoading(true);
		setCurrentMilestone(false);
		setCurvePoints([]);
		setRemainingPoints([]);
		setCompletedPoints([]);
	};

	const createBezier = (inputPoints, step, isCurrentMilestonePastOrPresent) => {
		let t = 0;
		const bezierPoints = [];
		while (t <= 1) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[0].lat);
				x3 = parseFloat(inputPoints[1].lat);
				x2 = Math.max(x1, x3) + 20;
				const lat_x =					(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[0].lng);
				x3 = parseFloat(inputPoints[1].lng);
				x2 = (x1 + x3) / 2;
				const lng_x =					(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				bezierPoints.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = 1;
			}
			t += step;
		}

		setCurvePoints((prevCurvePoints) => [...prevCurvePoints, ...bezierPoints]);
		if (isCurrentMilestonePastOrPresent) {
			setCompletedPoints((prevCompletedPoints) => [
				...prevCompletedPoints,
				...bezierPoints,
			]);
		} else {
			setRemainingPoints((prevRemainingPoints) => [
				...prevRemainingPoints,
				...bezierPoints,
			]);
		}
	};

	const isPastOrPresentDay = (inputDate) => {
		const isCurrentDay = isSameDay(inputDate, new Date());
		if (isCurrentDay) return true;
		if (new Date() > new Date(inputDate)) return true;
		return false;
	};

	useEffect(() => {
		if (points?.length > 0) {
			if (shipmentType === 'air_freight') {
				resetPointAndMarkers();
				const res = points?.map((p, idx) => {
					if (
						![
							p?.arrival_lat,
							p?.arrival_long,
							p?.departure_lat,
							p?.departure_long,
						].includes(null)
						&& ![
							p.arrival_lat,
							p.arrival_long,
							p.departure_lat,
							p.departure_long,
						].includes(undefined)
					) {
						const isCurrentMilestonePastOrPresent = isPastOrPresentDay(
							p?.actual_arrival_time,
						);
						const source = {
							lat : p?.departure_lat,
							lng : p?.departure_long,
						};
						const dest = {
							lat : p?.arrival_lat,
							lng : p?.arrival_long,
						};
						if (isCurrentMilestonePastOrPresent) {
							setCurrentMilestone(dest);
						}
						createBezier(
							[source, dest],
							0.001,
							isCurrentMilestonePastOrPresent,
							idx,
						);
						return true;
					}

					return false;
				});
				if (!res.includes(false)) {
					setTimeout(() => {
						setLoading(false);
					}, 0);
				}
			} else {
				points?.map((p) => {
					let c = p;
					if (typeof p?.[0] === 'object') {
						c = p.flat();
					}
					setRemainingPoints((prevPoints) => [
						...prevPoints,
						{
							lat : c?.[1],
							lng : c?.[0],
						},
					]);
					setCurvePoints((prevPoints) => [
						...prevPoints,
						{
							lat : c?.[1],
							lng : c?.[0],
						},
					]);
					return true;
				});
				setTimeout(() => {
					setLoading(false);
				}, 0);
			}
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 0);
		}
	}, [points?.length]);

	if (routesLoading || isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	return (
		<div className={styles.map}>
			<CogoMaps
				completedPoints={completedPoints}
				remainingPoints={remainingPoints}
				curvePoints={curvePoints}
				currentMilestone={currentMilestone}
			/>
		</div>
	);
}

export default TrackingMap;
