import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMInfo } from '@cogoport/icons-react';
import startCase from '@cogoport/utils';
import { useState } from 'react';

import Filter from '../../../common/Filter';
import FilterContent from '../../../common/FilterContentComponents';
import { startDateOfMonth } from '../../../utils/startDateOfMonth';

import styles from './styles.module.css';

function SalesOverallHeading({
	setFilters = {},
	dateFilter = false,
	range,
	setRange,
}) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState({});
	const handleApplyFilters = () => {
		const dates = startDateOfMonth(date);
		setFilters((prevFilters) => ({
			...prevFilters,
			...dates,
		}));
	};

	return (
		<div className={styles.header}>
			<div className={styles.heading_container}>
				<div className={styles.heading_text}>
					Sales View As On Date (Freight Force & Air Freight)&nbsp;
					<Tooltip
						content={
							<>All the values are calculated on the basis of action date</>
						}
					>
						<IcMInfo
							style={{
								width  : '14px',
								height : '14px',
							}}
						/>

					</Tooltip>
				</div>
			</div>
			<div>
				<Filter
					setFilters={handleApplyFilters}
					range={range}
					setRange={setRange}
				/>
			</div>

			{/* <div className={styles.filter_container}>
				<div className={styles.filter}>
					{dateFilter && (
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
							<DateFilterWrap
								onClick={() => setOpenCalendar(!openCalendar)}
								id="date_filter_wrap"
							>
								<Flex alignItems="center" marginRight="4px">
									<Pill>{startCase(range)}</Pill>
									<div
										style={{
											borderRight : '1px solid #e0e0e0',
											margin      : '0px 8px',
											height      : '18px',
										}}
									/>

									<div>
										{`${formatDate({
											date       : date?.startDate,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})} - ${formatDate({
											date       : date?.endDate,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}`}
									</div>
								</Flex>

								<IcMArrowRotateDown style={{ width: '2em', height: '2em' }} />
							</DateFilterWrap>
						</FilterContent>
					)}
					&nbsp;&nbsp;
				</div>
			</div> */}
		</div>
	);
}
export default SalesOverallHeading;
