import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

const getKey = (data) => `${data.start_date} ${data.end_date}`;

function ScheduleItem({
	data = {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	setFilters = () => {},
	setComparisonRates = () => {},
}) {
	const {
		end_date = '',
		start_date = '',
		min_price = '',
		min_price_currency = GLOBAL_CONSTANTS.currency_code.USD,
	} = data;

	const handleChange = () => {
		setComparisonRates({});

		const isExistingSchedule = selectedWeek.end_date === data.end_date
		&& selectedWeek.start_date === data.start_date;

		setSelectedWeek(() => {
			if (isExistingSchedule) {
				return {};
			}

			return data;
		});

		setFilters((prev) => ({
			...prev,
			departure_before : !isExistingSchedule ? end_date : undefined,
			departure_after  : !isExistingSchedule ? start_date : undefined,
			page             : 1,
		}));
	};

	return (
		<div
			role="presentation"
			className={cl`${styles.container} ${
				getKey(selectedWeek) === getKey(data) ? styles.active : styles.inactive
			}`}
			onClick={handleChange}
		>
			<span
				className={cl`${styles.week} ${
					getKey(selectedWeek) === getKey(data) ? styles.selected_week : {}
				}`}
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
