import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import { startDateOfMonth } from '../../../utils/startDateOfMonth';
import FilterContent from '../../FilterContentComponents';

import styles from './styles.module.css';

function DateFilter({ setFilters, range = 'current_month', setRange }) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState({});

	const handleApplyFilters = (key, val) => {
		const dates = startDateOfMonth(date);
		setFilters((prevFilters) => ({
			...prevFilters,
			...dates,
			[key] : val,
			page  : 1,
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
				<div className={styles.dateFilterWrap} onClick={() => setOpenCalendar(!openCalendar)}>

					<div className={styles.pill}>{startCase(range)}</div>
					<div className={styles.border_right} />
					<div>
						{`${format(
							date.startDate,
							'MMM dd yyyy',
						)} - ${format(date.endDate, 'MMM dd yyyy')}`}

					</div>

					<IcMArrowRotateDown />
				</div>
			</FilterContent>
		</div>
	);
}

export default DateFilter;
