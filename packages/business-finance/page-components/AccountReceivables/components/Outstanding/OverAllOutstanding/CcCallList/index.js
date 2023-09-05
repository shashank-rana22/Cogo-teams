import { Loader, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, isEmpty, startOfMonth } from '@cogoport/utils';
import { useState } from 'react';

import ccCallListTable from '../../../../configs/CC_Call_List_Table';
import EmptyStateOutStanding from '../../EmptyStateOutStanding';

import DateFilter from './DateFilter';
import styles from './styles.module.css';

const DATE_FACTOR = 1;
const HOUR_FACTOR = 0;
function CcCallList({
	data = [],
	loading = false,
	setDateFilter = () => {},
	range = '',
	setRange = () => {},
	dateFilter = {},
}) {
	const [date, setDate] = useState({
		startDate : startOfMonth(new Date()),
		endDate   : new Date(new Date().getFullYear(), new Date().getMonth() + DATE_FACTOR, HOUR_FACTOR),
	});

	const [openCalendar, setOpenCalendar] = useState(false);

	const handleApplyFilters = () => {
		setDateFilter({ ...date });
	};

	const cancelApplyFilters = () => {
		setDate({ ...dateFilter });
	};

	return (
		<>
			<div className={styles.flex}>
				<div className={styles.main_heading}>CC Call Stats</div>
				<div
					className={styles.date_filter_wrap}
					onClick={() => setOpenCalendar(!openCalendar)}
					role="presentation"
				>
					<div className={styles.date_container}>
						<div className={styles.pill}>{startCase(range)}</div>
						<div className={styles.vertical_line} />
						<div>
							{`${formatDate({
								date       : date?.startDate,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})} - ${formatDate({
								date       : date?.endDate,
								formatType : 'date',
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							})}`}
						</div>
					</div>
					<IcMArrowRotateDown />
				</div>

				<DateFilter
					applyFilters={handleApplyFilters}
					setOpen={setOpenCalendar}
					openCalendar={openCalendar}
					type="date-range"
					date={date}
					setDate={setDate}
					range={range}
					setRange={setRange}
					cancelApplyFilters={cancelApplyFilters}
				/>
			</div>
			{!loading ? (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{
						(isEmpty(data) && !loading)
							? <EmptyStateOutStanding smallCard="kamWiseCard" /> : (
								<Table
									columns={ccCallListTable()}
									data={data}
									loading={loading}
								/>
							)
					}
				</div>
			) : (
				<div className={styles.loader}><Loader themeType="primary" style={{ height: 60, width: 60 }} /></div>
			)}
		</>
	);
}
export default CcCallList;
