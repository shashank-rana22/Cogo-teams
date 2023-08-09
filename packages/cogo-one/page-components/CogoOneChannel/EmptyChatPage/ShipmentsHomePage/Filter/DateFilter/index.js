import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { startDateOfMonth } from '../../../../../../utils/startDateOfMonth';
import FilterContent from '../../FilterContentComponents';

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
		<div>
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
					<div>
						{`${formatDate({
							date       : date.startDate,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						})} - ${formatDate({
							date       : date.endDate,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						})}`}
					</div>
					<IcMArrowRotateDown />
				</div>
			</FilterContent>
		</div>
	);
}

export default DateFilter;
