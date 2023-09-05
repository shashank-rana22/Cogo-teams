import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { startDateOfMonth } from '../../../../../../utils/startDateOfMonth';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function DateFilter({ setDateFilters = () => {}, range = '', setRange = () => {} }) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState({});

	const handleApplyFilters = () => {
		const dates = startDateOfMonth({ date });
		setDateFilters((prevFilters) => ({
			...prevFilters,
			...dates,
		}));
	};

	return (
		<FilterContent
			applyFilters={handleApplyFilters}
			setOpen={setOpenCalendar}
			open={openCalendar}
			type="date-range"
			date={date}
			setDate={setDate}
			range={range}
			setRange={setRange}
		>
			<div
				className={styles.date_filter_wrap}
				role="presentation"
				onClick={() => setOpenCalendar((prev) => !prev)}
			>
				<div className={styles.pill}>{startCase(range)}</div>
				<div className={styles.border_right} />
				{`${formatDate({
					date       : date.startDate || new Date(),
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				})} - ${formatDate({
					date       : date.endDate || new Date(),
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				})}`}
				<IcMArrowRotateDown />
			</div>
		</FilterContent>
	);
}

export default DateFilter;
