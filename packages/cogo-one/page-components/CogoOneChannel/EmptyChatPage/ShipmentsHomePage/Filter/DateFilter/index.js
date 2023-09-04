import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, subtractDays } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import { startDateOfMonth } from '../../../../../../utils/startDateOfMonth';
import useGetFormatedPath from '../../../../../../utils/useGetFormatedPath';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

const SUBSTRACT_ONE_DAY = 1;

function DateFilter({
	setDateFilters = () => {}, range = '', setRange = () => {},
}) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const { queryParams } = useGetFormatedPath();
	const [date, setDate] = useState({
		startDate : new Date(queryParams?.start_date),
		endDate   : subtractDays(new Date(queryParams?.end_date), SUBSTRACT_ONE_DAY),
	});

	useEffect(() => {
		const dates = startDateOfMonth({ date });
		setDateFilters((prevFilters) => ({
			...prevFilters,
			...dates,
		}));
	}, [date, setDateFilters]);

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
