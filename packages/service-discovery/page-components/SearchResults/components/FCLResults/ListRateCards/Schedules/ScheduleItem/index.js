import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

const getKey = (data) => `${data.start_date} ${data.end_date}`;

function ScheduleItem({
	data = {},
	selectedWeek = 0,
	setSelectedWeek = () => {},
	setFilters = () => {},
}) {
	const { end_date = '', start_date = '', min_price = '', min_price_currency = 'USD' } = data;

	const handleChange = () => {
		if (getKey(selectedWeek) === getKey(data)) {
			setSelectedWeek({});
			setFilters((prev) => ({
				...prev,
				departure_before : undefined,
				departure_after  : undefined,
				page             : 1,
			}));
		} else {
			setSelectedWeek(data);
			setFilters((prev) => ({
				...prev,
				departure_before : end_date,
				departure_after  : start_date,
				page             : 1,
			}));
		}
	};

	return (
		<div
			role="presentation"
			className={cl`${styles.container} ${getKey(selectedWeek) === getKey(data) ? styles.selected : {}}`}
			onClick={handleChange}
		>
			<span
				className={cl`${styles.week} ${getKey(selectedWeek) === getKey(data) ? styles.selected_week : {}}`}
			>
				{formatDate({
					date       : start_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
					formatType : 'date',
				})}
				{' '}
				-
				{' '}
				{formatDate({
					date       : end_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
					formatType : 'date',
				})}
			</span>

			<span className={styles.rate}>
				From
				{' '}
				{formatAmount({
					amount   : min_price,
					currency : min_price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</span>
		</div>
	);
}

export default ScheduleItem;
