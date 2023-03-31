import {
	DateRangepicker,
} from '@cogoport/components';

import { dynamic } from '@cogoport/next';
import { isEmpty, merge } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';


import GlobeStatsFooter from './GlobeStatsFooter';
import styles from './styles.module.css';

const CircleContent = dynamic(() => import('./CircleContent'), { ssr: false });

function MapView(props = {}) {
	const globeGL = useRef();

	const {
		stats={},
		statsLoading = false,
		setCountry = () => {},
		country = {},
		date = {},
		setDate = {},
		chatLoading = false,
	} = props || {};
	const [circleTab, setCircleTab] = useState('new_users');
const globeData=stats?.list;
	const { customer_locations = [], stats:globeStats = {} } = globeData || {};
	console.log("customer_locations:", customer_locations);
	const CountryMobileCode = country?.mobile_country_code || '';

	let markerData = {};
	markerData = customer_locations.map((item) => ({
		lat : item?.latitude,
		lng : item?.longitude,
		pop : 500,
		...markerData,
	}));

	const onSelectChange = (val) => {
		setCountry(val);
	};

	useEffect(() => {
		if (!isEmpty(globeGL?.current?.scene()?.children[2]?.visible
			&& !isEmpty(globeGL?.current?.scene()?.children[1]?.intensity)
			&& !isEmpty(globeGL?.current?.scene()?.children[2]?.intensity))) {
			globeGL.current.scene().children[1].intensity = 1.25;
			globeGL.current.scene().children[2].intensity = 0.25;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globeGL?.current, CountryMobileCode, date, circleTab]);

	const resetGlobePosition = () => {
		const defaultMapCenter = { lat: 0, lng: 78, altitude: 1.8 };
		const pointRotationSpeed = 100;
		if (!isEmpty(globeGL.current)) {
			globeGL.current.pointOfView(defaultMapCenter, pointRotationSpeed);
		}
	};

	const maxDate = new Date();

	return (
		<div className={styles.main_container}>
			<div className={styles.top_content}>
				<div className={styles.select_container}>
				</div>
				<div className={styles.date_range_container}>
					<DateRangepicker
						id="select_date_range"
						name="date"
						onChange={setDate}
						value={date}
						dateFormat="MMM dd, yyyy"
						isPreviousDaysAllowed
						maxDate={maxDate}
					/>

				</div>
			</div>

			<CircleContent
				{...props}
				globeGL={globeGL}
				markerData={markerData}
				circleTab={circleTab}
				resetGlobePosition={resetGlobePosition}
				setCircleTab={setCircleTab}

			/>

			<GlobeStatsFooter {...props} />

		</div>

	);
}

export default MapView;
