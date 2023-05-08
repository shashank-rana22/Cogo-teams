import { Button, cl, DateRangepicker } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';
import { useContext } from 'react';

import DATE_RANGE_MAPPING from '../../../config/DATE_RANGE_MAPPING';
import KamDeskContext from '../../../context/KamDeskContext';

import styles from './styles.module.css';

const mapping = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

function FilterBy({
	setPopoverFilter = () => {},
	popoverFilter = {},
	setShowPopover = () => {},
}) {
	const { filters = {}, setFilters } = useContext(KamDeskContext);
	const { date_type, dateRange = '', trade_type } = popoverFilter || {};

	const handleCustomDateChange = (val) => {
		const { startDate, endDate } = val;
		setPopoverFilter({ ...popoverFilter, startDate, endDate });
	};

	const handleReset = () => {
		const { startDate, endDate } = DATE_RANGE_MAPPING.today;

		setFilters({
			...filters,
			trade_type : undefined,
			date_type  : undefined,
			dateRange  : 'today',
			startDate,
			endDate,

		});
		setShowPopover(false);
	};

	const trade_date_cond = trade_type || date_type;

	return (
		<div>
			<div className={styles.action_buttons}>
				<Button
					disabled={!trade_date_cond}
					size="sm"
					onClick={handleReset}
					themeType="tertiary"
				>
					<div className={styles.action_text}>Reset</div>
				</Button>

				<Button
					disabled={!trade_date_cond
							|| (dateRange
							&& 	(!popoverFilter?.startDate
							|| !popoverFilter?.endDate))}
					size="sm"
					onClick={() => {
						setFilters({ ...filters, ...popoverFilter });
						setShowPopover(false);
					}}
				>
					<div className={styles.action_text}>Apply</div>
				</Button>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.filter_heading}>Date Type</div>

				<div className={styles.type_container}>
					{['eta', 'etd'].map((type) => (
						<div className={cl`${date_type === mapping[type] ? styles.active : styles.inactive} 
							${styles.filter_by_buttons}`}
						>
							<Button
								onClick={() => setPopoverFilter({
									...popoverFilter,
									date_type : mapping[type],
									dateRange : 'today',
									...DATE_RANGE_MAPPING.today,
								})}
								size="xs"
							>
								{upperCase(type)}
							</Button>
						</div>
					))}
				</div>
			</div>

			{date_type ? (
				<div className={styles.filter_container}>
					<div className={styles.filter_heading}>{upperCase(date_type)}</div>

					<div className={styles.date_range_container}>
						{Object.keys(DATE_RANGE_MAPPING).map((dateKey) => (
							<div className={cl`${dateRange === dateKey ? styles.active : styles.inactive} 
							${styles.filter_by_buttons}`}
							>
								<Button
									onClick={() => setPopoverFilter({
										...popoverFilter,
										dateRange: dateKey,
										...DATE_RANGE_MAPPING[dateKey],
									})}
									size="xs"
								>
									{startCase(dateKey)}
								</Button>
							</div>
						))}
					</div>
				</div>
			) : null}

		</div>
	);
}
export default FilterBy;
