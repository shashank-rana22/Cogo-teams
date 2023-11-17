import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const columns = [
	{ Header: 'Shipment Period' },
	{ Header: 'Container Count' },
];

function ShipmentPlan({ value }) {
	const {
		shipment_frequency = '', sailing_period_start_date = '',
		sailing_period_end_date = '', rfq_shipment_plan_details = [],
	} = value || {};

	function formatSailingDateRange(startDate, endDate) {
		const formattedStartDate = formatDate({
			date       : startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
			formatType : 'date',
		});
		const formattedEndDate = formatDate({
			date       : endDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
			formatType : 'date',
		});
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
								Sailing Period :
								{' '}
								<span className={styles.value}>
									{formatSailingDateRange(sailing_period_start_date, sailing_period_end_date)}
								</span>
							</div>
						</>
					)}
				</div>
				{!isEmpty(rfq_shipment_plan_details)
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
								{rfq_shipment_plan_details?.map((data) => (
									<div className={styles.details} key={data?.id}>
										<div className={styles.head}>
											<div className={styles.head}>
												{formatSailingDateRange(
													data?.sailing_start_date,
													data?.sailing_end_date,
												)}
											</div>
										</div>
										<div>
											{data?.containers_count || 0}
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
