import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../../common/Filter';
import { startDateOfMonth } from '../../../utils/startDateOfMonth';

import styles from './styles.module.css';

function SalesFunnelHeading({
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
					Sales View As On Date&nbsp;
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

		</div>

	);
}
export default SalesFunnelHeading;
