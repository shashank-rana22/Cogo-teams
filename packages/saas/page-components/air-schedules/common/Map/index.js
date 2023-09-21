import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('../../../../common/CogoMaps'), { ssr: false });

function Map({
	transportMode = null,
	mapPoints = [],
}) {
	const [curvePoints, setCurvePoints] = useState([]);
	const DECIMAL_VALUE = 0.001;
	const TWENTY = 20;
	const createBezier = (inputPoints, step) => {
		let t = 0;
		const BEZIER_POINTS = [];
		while (t <= GLOBAL_CONSTANTS.one) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[GLOBAL_CONSTANTS.zeroth_index].lat);
				x3 = parseFloat(inputPoints[GLOBAL_CONSTANTS.one].lat);
				x2 = Math.max(x1, x3) + TWENTY;
				const lat_x = (GLOBAL_CONSTANTS.one - t) * ((GLOBAL_CONSTANTS.one - t) * x1 + t * x2)
				+ t * ((GLOBAL_CONSTANTS.one - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[GLOBAL_CONSTANTS.zeroth_index].lng);
				x3 = parseFloat(inputPoints[GLOBAL_CONSTANTS.one].lng);
				x2 = (x1 + x3) / GLOBAL_CONSTANTS.two;
				const lng_x = (GLOBAL_CONSTANTS.one - t) * ((GLOBAL_CONSTANTS.one - t) * x1 + t * x2)
				+ t * ((GLOBAL_CONSTANTS.one - t) * x2 + t * x3);

				BEZIER_POINTS.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = GLOBAL_CONSTANTS.one;
			}
			t += step;
		}
		setCurvePoints([...BEZIER_POINTS]);
	};

	useEffect(() => {
		if (!isEmpty(mapPoints)) {
			(mapPoints || []).map((pt) => {
				if (
					![
						pt.arrival_lat,
						pt.arrival_long,
						pt.departure_lat,
						pt.departure_long,
					].includes(null)
						&& ![
							pt.arrival_lat,
							pt.arrival_long,
							pt.departure_lat,
							pt.departure_long,
						].includes(undefined)
				) {
					const source = {
						lat : pt.departure_lat,
						lng : pt.departure_long,
					};
					const dest = {
						lat : pt.arrival_lat,
						lng : pt.arrival_long,
					};
					createBezier([source, dest], DECIMAL_VALUE);
					return true;
				}
				return false;
			});
		} else if (isEmpty(mapPoints)) {
			setCurvePoints([]);
		}
	}, [mapPoints, transportMode]);
	return (
		<div>
			<CogoMaps
				plotPoints={curvePoints}
				transportMode="air"
				height="46vh"
				zoom={3.6}
			/>
			{isEmpty(curvePoints) && (
				<div className={styles.loader}>
					<div className={styles.map_unable}>Unable to load map for this shipment</div>
				</div>
			)}
		</div>
	);
}

export default Map;
