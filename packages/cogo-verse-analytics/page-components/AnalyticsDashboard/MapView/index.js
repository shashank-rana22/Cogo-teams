/* eslint-disable max-len */
import { Select, DateRangepicker, cl, ButtonIcon, Tooltip } from '@cogoport/components';
import { useGetAsyncOptions, getFormattedPrice } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import IcMRefresh from '@cogoport/icons-react/src/IcMRefresh';
import { dynamic } from '@cogoport/next';
import { isEmpty, merge } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import { circleStats } from '../../../configurations/circle-stats';
import { CONVERSATIONS } from '../../../configurations/primary-stats';
import useGetCogoverseGlobeData from '../../../hooks/useGetCogoverseGlobeData';
import { strToKMBT } from '../../../utils/strToKMBT';

import CommunicationPieChart from './PieChart';
import styles from './styles.module.css';

const TheGlobe = dynamic(() => import('./TheGlobe'), { ssr: false });

function MapView({
	setCountry = () => {},
	country = {},
	date = {},
	setDate = () => {},

}) {
	const globeGL = useRef();

	const [circleTab, setCircleTab] = useState('new_users');
	const { options:locationOptions, loading:locationsLoading = false, onSearch = () => {} } = useGetAsyncOptions(merge(asyncFieldsLocations(), { params: { filters: { type: 'country' }, page_limit: 500 } }));

	const { pointsList = {}, globeLoading = false } = useGetCogoverseGlobeData({ country, circleTab });

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

	const maxDate = new Date();

	const avgResponseTimeValue = 70;

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
			<div className={styles.circle_content}>
				<div className={styles.circle_frame}>
					<div className={styles.globe_container}>
						{

							(!globeLoading)
								&& (
									<TheGlobe
										country={country}
										pointsList={pointsList}
										globeGL={globeGL}
									/>
								)

						}

					</div>
					{
					circleStats.map(
						(stat) => {
							const { type, value, label } = stat;

							return (
								// eslint-disable-next-line jsx-a11y/no-static-element-interactions
								<div
									onClick={() => setCircleTab(type)}
									className={cl`${styles.circle} ${styles[type]} 
									${circleTab === type && styles.circle_clicked}`}

								>
									<div className={styles.stat_value}>
										{strToKMBT(value)}
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
							<span>{avgResponseTimeValue < 60 ? avgResponseTimeValue : (Number(avgResponseTimeValue) / 60).toFixed(1)}</span>
							{' '}
							{avgResponseTimeValue < 60 ? 'min' : 'hrs'}
						</div>

						<div className={styles.arrow_img}>

							{1 < 3
								? <img width="35px" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/increasing_arrow.svg" alt="decreased" />
								: <img width="35px" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/increasing_arrow.svg" alt="increased" />}

						</div>
					</div>

				</div>

				<div className={styles.communication_stats}>
					<div className={styles.left_stats}>
						{
							CONVERSATIONS.map((stat) => {
								const { value, title, icon_bg } = stat;
								return (
									<div className={styles.the_stat}>
										<div className={styles.stat_circle} style={{ background: icon_bg }} />
										<div className={styles.com_stat_value}>{strToKMBT(value)}</div>
										<div className={styles.stat_description}>{title}</div>
									</div>
								);
							})
						}

					</div>

					<div className={styles.pie_chart}>
						<CommunicationPieChart />
					</div>

				</div>
			</div>

		</div>

	);
}

export default MapView;
