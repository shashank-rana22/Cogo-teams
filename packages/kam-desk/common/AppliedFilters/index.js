import { Button, Pill } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase, upperCase, format, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import DATE_RANGE_MAPPING from '../../config/DATE_RANGE_MAPPING';
import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

function AppliedFilters() {
	const { setFilters, filters } = useContext(KamDeskContext);

	const {
		date_type, dateRange, startDate, endDate, pending_invoice,
	} = filters || {};

	const onCancel = (resetKeys = {}) => {
		setFilters({ ...filters, ...(resetKeys || {}) });
	};

	const removeKeyFromFilter = (key) => {
		const finalFilters = {};
		Object.keys(filters || {}).forEach((i) => {
			if (i !== key) finalFilters[i] = filters[i];
		});

		setFilters(finalFilters);
	};

	const currentFilters = [];

	['source', 'payment_term', 'tags'].forEach((key) => {
		if (!isEmpty(filters?.[key])) { currentFilters.push({ label: startCase(filters?.[key]), value: key }); }
	});

	if (pending_invoice) {
		currentFilters.push({ label: 'Pending Invoice', value: 'pending_invoice' });
	}

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

			{currentFilters?.map((item) => (
				<Pill key={item.value}>
					<div className={styles.pill_content} key={item.value}>
						<div className={styles.pill_text}>
							{item.label}
						</div>

						<div className={styles.pill_cross}>
							<Button
								size="xs"
								onClick={() => removeKeyFromFilter(item.value)}
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
