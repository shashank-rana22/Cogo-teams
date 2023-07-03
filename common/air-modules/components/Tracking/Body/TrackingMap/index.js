import { isSameDay } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

const STEPS = 0.001;
const LOOP_CONDITION_CHECK = 1;
const SOURCE_INDEX = 0;
const DESTINATION_INDEX = 1;
const LAT_X_CALCULATING_FACTOR = 20;
const LNG_X_CALCULATING_FACTOR = 2;
const BEZIER_POINTS_CALCULATING_FACTOR = 1;

function TrackingMap({
	points = [],
}) {
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);
	const [currentMilestone, setCurrentMilestone] = useState(false);
	const [completedPoints, setCompletedPoints] = useState([]);

	const resetPointAndMarkers = () => {
		setLoading(true);
		setCurrentMilestone(false);
		setCurvePoints([]);
		setRemainingPoints([]);
		setCompletedPoints([]);
	};

	const createBezier = (inputPoints, step, isCurrentMilestonePastOrPresent) => {
		let t = 0;
		const BEZIER_POINTS = [];
		while (t <= LOOP_CONDITION_CHECK) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[SOURCE_INDEX].lat);
				x3 = parseFloat(inputPoints[DESTINATION_INDEX].lat);
				x2 = Math.max(x1, x3) + LAT_X_CALCULATING_FACTOR;
				const lat_x =				(BEZIER_POINTS_CALCULATING_FACTOR - t)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x1 + t * x2)
				+ t * ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[SOURCE_INDEX].lng);
				x3 = parseFloat(inputPoints[DESTINATION_INDEX].lng);
				x2 = (x1 + x3) / LNG_X_CALCULATING_FACTOR;
				const lng_x =				(BEZIER_POINTS_CALCULATING_FACTOR - t)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x1 + t * x2)
				+ t * ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x2 + t * x3);

				BEZIER_POINTS.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = BEZIER_POINTS_CALCULATING_FACTOR;
			}
			t += step;
		}

		setCurvePoints((prevCurvePoints) => [...prevCurvePoints, ...BEZIER_POINTS]);
		if (isCurrentMilestonePastOrPresent) {
			setCompletedPoints((prevCompletedPoints) => [
				...prevCompletedPoints,
				...BEZIER_POINTS,
			]);
		} else {
			setRemainingPoints((prevRemainingPoints) => [
				...prevRemainingPoints,
				...BEZIER_POINTS,
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
		if (points?.length) {
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
						STEPS,
						isCurrentMilestonePastOrPresent,
						idx,
					);
					return true;
				}

				return false;
			});
			if (!res.includes(false)) {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}, [points, points?.length]);

	if (isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	return (
		<div className={styles.map}>
			<CogoMaps
				remainingPoints={remainingPoints}
				curvePoints={curvePoints}
				completedPoints={completedPoints}
				currentMilestone={currentMilestone}
			/>
		</div>
	);
}

export default TrackingMap;
