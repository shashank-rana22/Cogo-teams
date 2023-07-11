import { isSameDay } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

const STEPS = 0.001;
const LOOP_CONDITION_CHECK = 1;
const LAT_X_CALCULATING_FACTOR = 20;
const LNG_Y_CALCULATING_FACTOR = 2;
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
				const x_1 = parseFloat(inputPoints.source.lat);
				const x_3 = parseFloat(inputPoints.destination.lat);
				const x_2 = Math.max(x_1, x_3) + LAT_X_CALCULATING_FACTOR;
				const lat_x =				(BEZIER_POINTS_CALCULATING_FACTOR - t)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x_1 + t * x_2)
				+ t * ((BEZIER_POINTS_CALCULATING_FACTOR - t) * x_2 + t * x_3);

				const y_1 = parseFloat(inputPoints.source.lng);
				const y_3 = parseFloat(inputPoints.destination.lng);
				const y_2 = (y_1 + y_3) / LNG_Y_CALCULATING_FACTOR;
				const lng_y =				(BEZIER_POINTS_CALCULATING_FACTOR - t)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - t) * y_1 + t * y_2)
				+ t * ((BEZIER_POINTS_CALCULATING_FACTOR - t) * y_2 + t * y_3);

				BEZIER_POINTS.push({
					lat : lat_x,
					lng : lng_y,
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
			const res = points?.every((p, idx) => {
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
					const destination = {
						lat : p?.arrival_lat,
						lng : p?.arrival_long,
					};
					if (isCurrentMilestonePastOrPresent) {
						setCurrentMilestone(destination);
					}
					createBezier(
						{ source, destination },
						STEPS,
						isCurrentMilestonePastOrPresent,
						idx,
					);
					return true;
				}

				return false;
			});
			if (res) {
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
