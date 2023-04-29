import {
	DateRangepicker,
} from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import GlobeStatsFooter from './GlobeStatsFooter';
import styles from './styles.module.css';

const CircleContent = dynamic(() => import('./CircleContent'), { ssr: false });

function MapView(props = {}) {
	const globeGL = useRef();

	const {
		stats = {},
		statsLoading = false,
		country = {},
		date = {},
		setDate = {},
	} = props || {};
	const [circleTab, setCircleTab] = useState('new_users');
	const { customer_locations = [] } = stats?.list || {};

	const countryMobileCode = country?.mobile_country_code || '';

	const markerData = customer_locations.map((item) => ({
		lat : item?.latitude,
		lng : item?.longitude,
		pop : 500,
	}));

	useEffect(() => {
		if (!isEmpty(globeGL?.current?.scene()?.children[2]?.visible
			&& !isEmpty(globeGL?.current?.scene()?.children[1]?.intensity)
			&& !isEmpty(globeGL?.current?.scene()?.children[2]?.intensity))) {
			globeGL.current.scene().children[1].intensity = 1.25;
			globeGL.current.scene().children[2].intensity = 0.25;
		}
	}, [globeGL, countryMobileCode, date, circleTab]);

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
				<div className={styles.select_container} />
				<div className={styles.date_range_container}>
					<DateRangepicker
						id="select_date_range"
						name="date"
						onChange={setDate}
						value={date}
						dateFormat="MMM dd, yyyy"
						isPreviousDaysAllowed
						maxDate={maxDate}
						disable={statsLoading}
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
