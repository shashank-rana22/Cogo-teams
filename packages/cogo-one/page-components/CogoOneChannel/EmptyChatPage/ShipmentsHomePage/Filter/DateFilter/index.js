import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import { startDateOfMonth } from '../../../../../../utils/startDateOfMonth';
import FilterContent from '../../FilterContent';

import styles from './styles.module.css';

function DateFilter({ setFilters = () => {}, range = 'current_month', setRange = () => {} }) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState({});

	const handleApplyFilters = () => {
		const dates = startDateOfMonth({ date });
		setFilters((prevFilters) => ({
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
				onClick={() => setOpenCalendar(!openCalendar)}
			>
				<div className={styles.pill}>{startCase(range)}</div>
				<div className={styles.border_right} />
				{`${format(date.startDate, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])} - 
				${format(date.endDate, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}`}
				<IcMArrowRotateDown />
			</div>
		</FilterContent>
	);
}

export default DateFilter;
