import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross } from '@cogoport/icons-react';
import { startCase, upperCase, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import DATE_RANGE_MAPPING from '../../config/DATE_RANGE_MAPPING';
import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

const FILTER_KEYS = ['source', 'payment_term', 'tags'];

function AppliedFilters() {
	const { setFilters = () => {}, filters = {} } = useContext(KamDeskContext);

	const { date_type, dateRange, startDate, endDate, triggered_pending_invoices } = filters || {};

	const onCancel = (resetKeys = {}) => {
		setFilters({ ...filters, ...(resetKeys || {}) });
	};

	const removeKeyFromFilter = (key) => {
		const FINAL_FILTERS = {};
		Object.keys(filters || {}).forEach((i) => {
			if (i !== key) FINAL_FILTERS[i] = filters[i];
		});

		setFilters(FINAL_FILTERS);
	};

	const CURRENT_FILTERS = [];

	FILTER_KEYS.forEach((key) => {
		if (!isEmpty(filters?.[key])) { CURRENT_FILTERS.push({ label: startCase(filters?.[key]), value: key }); }
	});

	if (triggered_pending_invoices) {
		CURRENT_FILTERS.push({ label: 'Pending Invoice', value: 'triggered_pending_invoices' });
	}

	const { startDate:todayStartDate, endDate:todayEndDate } = DATE_RANGE_MAPPING.today;

	return (
		<div className={styles.container}>

			{(date_type && dateRange && startDate) ? (
				<Pill>
					<div className={styles.pill_content}>
						<div className={styles.pill_text}>
							{`${upperCase(date_type)} : 
							${dateRange === 'custom' ? ` ${formatDate({
								date       : startDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}  -
							${formatDate({
								date       : endDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}` : startCase(dateRange)}`}
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

			{CURRENT_FILTERS?.map((item) => (
				<Pill key={item?.value}>
					<div className={styles.pill_content} key={item?.value}>
						<div className={styles.pill_text}>
							{item?.label}
						</div>

						<div className={styles.pill_cross}>
							<Button
								size="xs"
								onClick={() => removeKeyFromFilter(item?.value)}
								themeType="tertiary"
							>
								<IcMCross fill="#6fa5ab" />
							</Button>
						</div>
					</div>
				</Pill>
			))}

		</div>
	);
}

export default AppliedFilters;
