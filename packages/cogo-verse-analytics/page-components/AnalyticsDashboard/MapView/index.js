/* eslint-disable max-len */
import {
	Select,
	DateRangepicker,
	cl,
	ButtonIcon,
	Tooltip,
	Placeholder,
} from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMHourglass, IcMRefresh } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, merge } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import { circleStats } from '../../../configurations/circle-stats';
import { CONVERSATIONS } from '../../../configurations/primary-stats';
import { imgURL } from '../../../constants/image-urls';
import { PIE_ICON } from '../../../constants/monitoring';
import useGetCogoverseGlobeData from '../../../hooks/useGetCogoverseGlobeData';
import { strToKMBT } from '../../../utils/strToKMBT';

import CommunicationPieChart from './PieChart';
import styles from './styles.module.css';

const TheGlobe = dynamic(() => import('./TheGlobe'), { ssr: false });

function MapView(props = {}) {
	const globeGL = useRef();

	const {
		statsData = {},
		statsLoading = false,
		setCountry = () => {},
		country = {},
		date = {},
		setDate = {},
		chatLoading = false,
		platFormChatData = {},
	} = props || {};

	const [circleTab, setCircleTab] = useState('new_users');
	const { conversation_data = {} } = statsData || {};

	const { options:locationOptions, loading:locationsLoading = false, onSearch = () => {} } = useGetAsyncOptions(merge(asyncFieldsLocations(), { params: { filters: { type: 'country' }, page_limit: 500 } }));

	const { globeData = {}, globeLoading = false } = useGetCogoverseGlobeData({ country, circleTab, date });

	const { user_location = [], stats:globeStats = {} } = globeData?.data || {};

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

	const resetGlobePosition = () => {
		const defaultMapCenter = { lat: 0, lng: 78, altitude: 1.8 };
		const pointRotationSpeed = 100;
		if (!isEmpty(globeGL.current)) {
			globeGL.current.pointOfView(defaultMapCenter, pointRotationSpeed);
		}
	};

	const maxDate = new Date();

	const averageResponseTime = Number(platFormChatData?.average_cutomer_response_time) || 0;

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
										resetGlobePosition={resetGlobePosition}

									/>

								)
								: (
									<div className={styles.loading_state_container}>
										<img
											src={imgURL.globe_loading_state}
											alt="Loading Co-ordinates"
											width="470px"
											height="470px"
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
										{!globeLoading ? strToKMBT(globeStats[valueKey] || 0) || 0 : 	<Placeholder className={styles.placeholder_element} height="18px" width="30px" margin="0px 0px 5px 0px" />}

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
							{
								chatLoading
									? <Placeholder className={styles.placeholder_element} height="40px" width="75px" />
									: (
										<>
											<span>
												{averageResponseTime < 60
													? averageResponseTime

													:	(averageResponseTime / 60).toFixed(1)}
											</span>
											{' '}
											{averageResponseTime < 60
												? 'min'

												:	'hrs'}

										</>
									)
							}

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
										<div className={styles.com_stat_value}>
											{!statsLoading
												? strToKMBT(conversation_data[valueKey] || '0')
												: <Placeholder className={styles.placeholder_element} height="20px" width="30px" />}
										</div>

										<div className={styles.stat_description}>{title}</div>
									</div>
								);
							})
						}

					</div>

					<div className={styles.pie_chart}>
						{
							!statsLoading
								? <CommunicationPieChart conversation_data={conversation_data} />
								: (
									<div className={styles.loading_pie_chart}>
										<Placeholder className={styles.placeholder_element} height="70%" width="70%">
											{PIE_ICON}
										</Placeholder>
									</div>
								)

						}

					</div>

				</div>
			</div>

		</div>

	);
}

export default MapView;
