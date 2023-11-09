import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const columns = [
	{ Header: 'Shipment Period' },
	{ Header: 'Container Count' },
];

function ShipmentPlan({ selectedCard = [] }) {
	const {
		shipment_frequency = '', sailing_period_start_date = '',
		sailing_period_end_date = '', shipment_plan = [],
	} = selectedCard || {};

	function formatSailingDateRange(startDate, endDate) {
		const formattedStartDate = formatDate(startDate, GLOBAL_CONSTANTS.formats.date['MMM, yyyy'], 'date');
		const formattedEndDate = formatDate(endDate, GLOBAL_CONSTANTS.formats.date['MMM, yyyy'], 'date');
		return `${formattedStartDate} - ${formattedEndDate}`;
	}
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.content}>
					<div className={styles.title}>
						Shipment Frequency:
						<span className={styles.value}>
							{' '}
							{shipment_frequency || 0}
							{' '}
							Days
						</span>
					</div>

					{!isEmpty(sailing_period_start_date) && !isEmpty(sailing_period_end_date)
					&& (
						<>
							<div className={styles.border} />
							<div className={styles.title}>
								Sailing Period:
								<span className={styles.value}>
									{sailing_period_start_date}
									{' '}
									<span className={styles.title}>to</span>
									{' '}
									{sailing_period_end_date}
								</span>
							</div>
						</>
					)}
				</div>
				{!isEmpty(shipment_plan)
					&& (
						<div className={styles.table}>
							<div className={styles.header}>
								{columns?.map((label) => (
									<div key={label} className={styles.head}>
										{label?.Header}
									</div>
								))}
							</div>

							<div className={styles.row}>
								{shipment_plan?.map((value) => (
									<div className={styles.details} key={value}>
										<div className={styles.head}>
											<div className={styles.head}>
												{formatSailingDateRange(
													value?.sailing_start_date,
													value?.sailing_end_date,
												)}
											</div>
										</div>
										<div>
											{value?.containers_count || '-'}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
			</div>
		</div>
	);
}

export default ShipmentPlan;
