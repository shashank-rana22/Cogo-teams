/* eslint-disable max-len */

import { Select, DateRangepicker, cl } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import { circleStats } from '../../../configurations/circle-stats';
import { CONVERSATIONS } from '../../../configurations/primary-stats';

import CommunicationPieChart from './PieChart';
import styles from './styles.module.css';

const TheGlobe = dynamic(() => import('./TheGlobe'), { ssr: false });

function MapView() {
	const [country, setCountry] = useState('');
	const [date, setDate] = useState('');

	const onChange = (val) => {
		console.log("val", val);
		setCountry(val);
	};
	const onSearch = () => {};
	const options = [{ display_name: 'India', country: 'india',lat: 28.7,lng: 77.1 },
		{ display_name: 'Thailand', country: 'thailand', lat: 13.7,lng: 100.5 },
		{ display_name: 'Italy', country: 'italy', lat: 41.9,lng: 12.4 }];

	const maxDate = new Date();

	return (
		<div className={styles.main_container}>
			<div className={styles.top_content}>
				<div className={styles.select_container}>
					<Select
						value={country?.country}
						onChange={(_,obj)=>onChange(obj)}
						placeholder="Select Country"
						options={options}
						id="select_country"
						labelKey="display_name"
						valueKey="country"
						isClearable
						onSearch={onSearch}
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
					<div className={styles.globe_container}><TheGlobe country={country}/></div>
					{
					circleStats.map(
						(stat) => {
							const { type, value, label } = stat;
							return (
								<div className={cl`${styles.circle} ${styles[type]}`}>
									<div className={styles.stat_value}>
										{value}
									</div>
									<div className={styles.stat_label}>
										{label}
									</div>
								</div>
							);
						},
					)
					}

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
							<span>20</span>
							{' '}
							min
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
										<div className={styles.com_stat_value}>{value}</div>
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
