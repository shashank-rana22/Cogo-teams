/* eslint-disable max-len */
import {
	Select,
	DateRangepicker,
} from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { dynamic } from '@cogoport/next';
import { isEmpty, merge } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import useGetCogoverseGlobeData from '../../../hooks/useGetCogoverseGlobeData';

import GlobeStatsFooter from './GlobeStatsFooter';
import styles from './styles.module.css';

const CircleContent = dynamic(() => import('./CircleContent'), { ssr: false });

function MapView(props = {}) {
	const globeGL = useRef();

	const {
		statsLoading = false,
		setCountry = () => {},
		country = {},
		date = {},
		setDate = {},
		chatLoading = false,
	} = props || {};

	const [circleTab, setCircleTab] = useState('new_users');

	const {
		options:locationOptions,
		loading:locationsLoading = false,
		onSearch = () => {},
	} = useGetAsyncOptions(merge(asyncFieldsLocations(), { params: { filters: { type: 'country' }, page_limit: 500 } }));

	const { globeData = {}, globeLoading = false } = useGetCogoverseGlobeData({ country, circleTab, date });

	const { user_location = [], stats:globeStats = {} } = globeData?.data || {};
	const CountryMobileCode = country?.mobile_country_code || '';

	let markerData = {};
	markerData = user_location.map((item) => ({
		lat : item[0],
		lng : item[1],
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
					<Select
						value={country?.mobile_country_code}
						onChange={(_, obj) => onSelectChange(obj)}
						placeholder="Select Country"
						options={locationOptions}
						id="select_country"
						labelKey="display_name"
						valueKey="mobile_country_code"
						isClearable
						onSearch={onSearch}
						loading={locationsLoading}
					/>
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
						disable={statsLoading || globeLoading || chatLoading}
					/>

				</div>
			</div>

			<CircleContent
				{...props}
				globeLoading={globeLoading}
				globeGL={globeGL}
				markerData={markerData}
				circleTab={circleTab}
				resetGlobePosition={resetGlobePosition}
				setCircleTab={setCircleTab}
				globeStats={globeStats}
			/>

			<GlobeStatsFooter {...props} />

		</div>

	);
}

export default MapView;
