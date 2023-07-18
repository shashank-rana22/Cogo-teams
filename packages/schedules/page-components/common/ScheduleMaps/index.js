import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import getDecodedPath from '../../../utils/getDecodedPath';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });
const ZERO = 0;
const ONE = 1;
function ScheduleMap({ data, tooltipRefArray, isTooltipVisible }) {
	const coordinates = data?.[ZERO]?.route?.coordinates || data?.route?.coordinates || [];
	const route_points = data?.[ZERO]?.route?.points || data?.route?.points || [];
	let path = getDecodedPath(coordinates);
	let points = getDecodedPath(route_points);
	const [bounds, setBounds] = useState([]);
	const DISPLAY_NAME_ARRAY = [];
	if (data?.vessel_schedule_link?.length) {
		for (let i = 0; i < data?.vessel_schedule_link?.length; i += ONE) {
			DISPLAY_NAME_ARRAY.push(data?.vessel_schedule_link[i]?.display_name);
		}
	} else if (data?.[ZERO]?.service_lane_links?.length) {
		for (let i = 0; i < data?.[ZERO]?.service_lane_links?.length; i += ONE) {
			DISPLAY_NAME_ARRAY.push(data?.[ZERO]?.service_lane_links?.[i]?.display_name);
		}
	} else if (data?.route_cordinates?.length) {
		DISPLAY_NAME_ARRAY.push(data?.origin_location?.display_name);
		DISPLAY_NAME_ARRAY.push(data?.destination_location?.display_name);
		path = data?.route_cordinates;
		points = [...(data?.route_cordinates.slice(ZERO, ONE) || []),
			...(data?.route_cordinates.slice(-ONE) || [])];
	}
	return (
		<div className={styles.map}>
			<CogoMaps
				data={data}
				displayNameArray={DISPLAY_NAME_ARRAY}
				points={points}
				path={path}
				bounds={bounds}
				setBounds={setBounds}
				tooltipRefArray={tooltipRefArray}
				isTooltipVisible={isTooltipVisible}
			/>
		</div>
	);
}

export default ScheduleMap;
