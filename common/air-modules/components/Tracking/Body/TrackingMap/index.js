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

const isPastOrPresentDay = (inputDate) => {
	const isCurrentDay = isSameDay(inputDate, new Date());
	if (isCurrentDay) return true;
	if (new Date() > new Date(inputDate)) return true;
	return false;
};

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
		let tangentParameter = 0;
		const BEZIER_POINTS = [];
		while (tangentParameter <= LOOP_CONDITION_CHECK) {
			try {
				const xAxis_1 = parseFloat(inputPoints.source.lat);
				const xAxis_3 = parseFloat(inputPoints.destination.lat);
				const xAxis_2 = Math.max(xAxis_1, xAxis_3) + LAT_X_CALCULATING_FACTOR;
				const lat_x =				(BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter) * xAxis_1 + tangentParameter * xAxis_2)
				+ tangentParameter
				* ((BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter) * xAxis_2 + tangentParameter * xAxis_3);

				const yAxis_1 = parseFloat(inputPoints.source.lng);
				const yAxis_3 = parseFloat(inputPoints.destination.lng);
				const yAxis_2 = (yAxis_1 + yAxis_3) / LNG_Y_CALCULATING_FACTOR;
				const lng_y =				(BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter)
				* ((BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter) * yAxis_1 + tangentParameter * yAxis_2)
				+ tangentParameter
				* ((BEZIER_POINTS_CALCULATING_FACTOR - tangentParameter) * yAxis_2 + tangentParameter * yAxis_3);

				BEZIER_POINTS.push({
					lat : lat_x,
					lng : lng_y,
				});
			} catch (err) {
				tangentParameter = BEZIER_POINTS_CALCULATING_FACTOR;
			}
			tangentParameter += step;
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
