/* eslint-disable max-len */
import {
	Select,
	DateRangepicker,
	cl,
	ButtonIcon,
	Tooltip,
	Pill,
	Placeholder,
} from '@cogoport/components';
import { useGetAsyncOptions, getFormattedPrice } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMArrowRotateDown, IcMHourglass } from '@cogoport/icons-react';
import IcMRefresh from '@cogoport/icons-react/src/IcMRefresh';
import { dynamic } from '@cogoport/next';
import { isEmpty, merge, startCase, format } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import { circleStats } from '../../../configurations/circle-stats';
import { CONVERSATIONS } from '../../../configurations/primary-stats';
import { imgURL } from '../../../constants/image-urls';
import useGetCogoverseGlobeData from '../../../hooks/useGetCogoverseGlobeData';
import { strToKMBT } from '../../../utils/strToKMBT';

import CommunicationPieChart from './PieChart';
import styles from './styles.module.css';

const TheGlobe = dynamic(() => import('./TheGlobe'), { ssr: false });

function MapView({ props = {} }) {
	const globeGL = useRef();

	const {
		statsData = {},
		statsLoading = false,
		setCountry = () => {},
		country = {},
		date = {},
		setDate = {},
	} = props || {};

	const [circleTab, setCircleTab] = useState('new_users');
	// const [range, setRange] = useState('this_month');
	// const [selectDuration, setSelectDuration] = useState('this_month');
	const { conversation_data = {} } = statsData || {};

	const { options:locationOptions, loading:locationsLoading = false, onSearch = () => {} } = useGetAsyncOptions(merge(asyncFieldsLocations(), { params: { filters: { type: 'country' }, page_limit: 500 } }));

	const { globeData = {}, globeLoading = false } = useGetCogoverseGlobeData({ country, circleTab, date });

	const { user_location = [], stats:globeStats = {} } = globeData?.fullResponse?.data || {};

	const coordinates = user_location || [];

	let markerData = {};
	markerData = coordinates.map((item) => ({
		lat : item[0],
		lng : item[1],
		pop : 500,
		...markerData,
	}));

	const onSelectChange = (val) => {
		setCountry(val);
	};

	const resetGlobePosition = () => {
		const defaultMapCenter = { lat: 0, lng: 0, altitude: 2 };
		const pointRotationSpeed = 100;
		if (!isEmpty(globeGL.current)) {
			globeGL.current.pointOfView(defaultMapCenter, pointRotationSpeed);
		}
	};

	const [openCalendar, setOpenCalendar] = useState(false);

	const handleApplyFilters = () => {
		setDateFilter({ ...date });
	};
	const maxDate = new Date();

	const startDate = format(date?.startDate, 'dd MMM yyyy');
	const endDate = format(date?.endDate, 'dd MMM yyyy');
	const avgResponseTimeValue = 70;

	// const [showComponent, setShowComponent] = useState(false);
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setShowComponent(true);
	// 	}, 5000);
	// 	return () => clearTimeout(timer);
	// }, []);

	return (
		<div className={styles.main_container}>
			<div className={styles.top_content}>
				<div className={styles.select_container}>
					<Select
						value={country?.display_name}
						onChange={(_, obj) => onSelectChange(obj)}
						placeholder="Select Country"
						options={locationOptions}
						id="select_country"
						labelKey="display_name"
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
					/>

				</div>
			</div>
			{/* Circle Content ------------------------------------------------------- */}

			<div className={styles.circle_content}>
				<div className={styles.circle_frame}>
					<div className={styles.globe_container}>
						{

							(!globeLoading)
								? (

									<TheGlobe
										country={country}
										globeGL={globeGL}
										markerData={markerData}
										globeLoading={globeLoading}

									/>

								)
								// showComponent &&
								: (
									<div className={styles.loading_state_container}>
										<img
											src={imgURL.globe_loading_state}
											alt="Loading Co-ordinates"
											width="460px"
											height="460px"
											className={styles.loading_image}
										/>
										<Placeholder type="circle" radius="480px" margin="0px 0px 0px 0px" />
									</div>
								)

						}

					</div>
					{
					circleStats.map(
						(stat) => {
							const { type, valueKey, label } = stat;

							return (
								// eslint-disable-next-line jsx-a11y/no-static-element-interactions
								<div
									onClick={() => setCircleTab(type)}
									className={cl`${styles.circle} ${styles[type]} 
									${circleTab === type && styles.circle_clicked}`}

								>
									<div className={styles.stat_value}>
										{ !globeLoading ? strToKMBT(globeStats[valueKey] || 0) || 0 : 	<Placeholder className={styles.placeholder_element} height="18px" width="30px" margin="0px 0px 5px 0px" />}

									</div>
									<div className={styles.stat_label}>
										{label}
									</div>
								</div>
							);
						},
					)
					}
					<div className={styles.globe_controls}>
						<Tooltip content="Reset Globe's Position" placement="bottom">
							<ButtonIcon size="md" type="reset" onClick={resetGlobePosition} icon={<IcMRefresh />} themeType="primary" />
						</Tooltip>
					</div>

				</div>
			</div>

			{/* Footer ------------------------------------------------------- */}
			<div className={styles.footer_stats}>
				<div className={styles.avg_response_time}>
					<div className={styles.response_time_title}>
						Average Customer Response Time
					</div>
					<div className={styles.response_time}>
						<div className={styles.time}>
							<Placeholder className={styles.placeholder_element} height="40px" width="75px" />
							{/* <span>
								{avgResponseTimeValue < 60
									? avgResponseTimeValue
									// ? <Placeholder height="20px" width="30px" />
									// :
									:	(Number(avgResponseTimeValue) / 60).toFixed(1)
									// <Placeholder height="20px" width="30px" />
								}
							</span>
							{' '}
							{avgResponseTimeValue < 60
								? 'min'
							// ? <Placeholder className={styles.placeholder_element} height="20px" width="30px" />
								:	'hrs'
									// : <Placeholder className={styles.placeholder_element} height="20px" width="30px" />
								} */}
						</div>

						<div className={styles.arrow_img}>
							<IcMHourglass width="30px" height="30px" fill="#C4DC91" />
						</div>
					</div>

				</div>

				<div className={styles.communication_stats}>
					<div className={styles.left_stats}>
						{
							CONVERSATIONS.map((stat) => {
								const { valueKey, title, icon_bg } = stat;
								return (
									<div className={styles.the_stat}>
										<div className={styles.stat_circle} style={{ background: icon_bg }} />
										<div className={styles.com_stat_value}>{strToKMBT(conversation_data[valueKey] || '0')}</div>

										<Placeholder className={styles.placeholder_element} height="20px" width="30px" />

										<div className={styles.stat_description}>{title}</div>
									</div>
								);
							})
						}

					</div>

					<div className={styles.pie_chart}>
						<CommunicationPieChart conversation_data={conversation_data} />
					</div>

				</div>
			</div>

		</div>

	);
}

export default MapView;
