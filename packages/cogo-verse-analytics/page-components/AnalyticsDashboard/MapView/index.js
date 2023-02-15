import { Select, DateRangepicker, cl } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import { circleStats } from '../../../configurations/circle-stats';

import styles from './styles.module.css';

const {
	main_container,
	globe_container,
	select_container,
	date_range_container,
	top_content,
	circle_content,
	circle_frame,
	circle,
	stat_value,
	stat_label,
} = styles;

const TheGlobe = dynamic(() => import('./TheGlobe'), { ssr: false });

function MapView() {
	const [country, setCountry] = useState('');
	const [date, setDate] = useState('');

	const onChange = (val) => {
		setCountry(val);
	};
	const onSearch = () => {};
	const options = [{ display_name: 'India', country: 'india' },
		{ display_name: 'Thailand', country: 'thailand' },
		{ display_name: 'Italy', country: 'italy' }];

	const maxDate = new Date();

	return (
		<div className={main_container}>
			<div className={top_content}>
				<div className={select_container}>
					<Select
						value={country}
						onChange={onChange}
						placeholder="Select Country"
						options={options}
						id="select_country"
						labelKey="display_name"
						valueKey="country"
						isClearable
						onSearch={onSearch}
					/>
				</div>
				<div className={date_range_container}>
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
			<div className={circle_content}>
				<div className={circle_frame}>
					{
					circleStats.map(
						(stat) => {
							const { type, value, label } = stat;
							return (
								<div className={cl`${circle} ${styles[type]}`}>
									<div className={stat_value}>
										{value}
									</div>
									<div className={stat_label}>
										{label}
									</div>
								</div>
							);
						},
					)
					}

				</div>
			</div>
			{/* The Globe */}
			{/* <div className={globe_container}><TheGlobe /></div> */}

		</div>

	);
}

export default MapView;
