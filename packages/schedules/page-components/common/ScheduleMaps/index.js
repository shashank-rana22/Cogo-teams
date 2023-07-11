import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import getDecodedPath from '../../../utils/getDecodedPath';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

function ScheduleMap({ data }) {
	const coordinates = data?.[0]?.route?.coordinates || data?.route?.coordinates || [];
	const route_points = data?.[0]?.route?.points || data?.route?.points || [];
	const path = getDecodedPath(coordinates);
	const points = getDecodedPath(route_points);
	const [bounds, setBounds] = useState([]);
	const displayNameArray = [];
	if (data?.vessel_schedule_link?.length > 0) {
		for (let i = 0; i < data?.vessel_schedule_link?.length; i += 1) {
			displayNameArray.push(data?.vessel_schedule_link[i]?.display_name);
		}
	}

	if (data?.[0]?.service_lane_links?.length > 0) {
		for (let i = 0; i < data?.[0]?.service_lane_links?.length; i += 1) {
			displayNameArray.push(data?.[0]?.service_lane_links?.[i]?.display_name);
		}
	}

	return (
		<div className={styles.map}>
			<CogoMaps
				data={data}
				displayNameArray={displayNameArray}
				points={points}
				path={path}
				bounds={bounds}
				setBounds={setBounds}
			/>
		</div>
	);
}

export default ScheduleMap;
