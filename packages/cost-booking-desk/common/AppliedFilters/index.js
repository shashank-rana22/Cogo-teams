import { Button, Pill } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { format, startCase, upperCase } from '@cogoport/utils';
import { useContext } from 'react';

import DATE_RANGE_MAPPING from '../../config/DATE_RANGE_MAPPING';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';

import styles from './styles.module.css';

function AppliedFilters() {
	const { filters = {}, setFilters } = useContext(CostBookingDeskContext);

	const { date_type, dateRange, startDate, endDate } = filters || {};

	const onCancel = (resetKeys = {}) => {
		setFilters({ ...filters, ...(resetKeys || {}) });
	};

	const { startDate:todayStartDate, endDate:todayEndDate } = DATE_RANGE_MAPPING.today;

	return (
		<div className={styles.container}>

			{(date_type && dateRange && startDate) ? (
				<Pill>
					<div className={styles.pill_content}>
						<div className={styles.pill_text}>
							{`${upperCase(date_type)} : 
							${dateRange === 'custom' ? `${format(startDate, 'dd MMM yy')} -
							${format(endDate, 'dd MMM yy')}` : startCase(dateRange)}`}
						</div>
						<div className={styles.pill_cross}>
							<Button
								size="xs"
								onClick={() => onCancel({
									date_type : undefined,
									dateRange : 'today',
									startDate : todayStartDate,
									endDate   : todayEndDate,
								})}
								themeType="tertiary"
							>
								<IcMCross fill="#6fa5ab" />
							</Button>
						</div>
					</div>
				</Pill>
			) : null}
		</div>
	);
}

export default AppliedFilters;
