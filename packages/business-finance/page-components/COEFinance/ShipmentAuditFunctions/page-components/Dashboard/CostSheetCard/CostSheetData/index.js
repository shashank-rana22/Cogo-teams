import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../../commons/EmptyStateDocs';

import ServiceAndLineItems from './ServiceAndLineItems';
import styles from './styles.module.css';
import Total from './Total';

const TOTALS_AND_DEVIATIONS = ['billTotal', 'invoiceTotal', 'invoiceTotalDeviation', 'billTotalDeviation'];

function CostSheetData({
	costViewData = {},
	costViewDataLoading = false,
}) {
	if (costViewDataLoading) {
		return (
			<div className={styles.loader_main}>
				<Loader className={styles.loader} />
			</div>
		);
	}
	if (isEmpty(costViewData)) {
		return <EmptyStateDocs />;
	}

	const {
		billTotal = '',
		invoiceTotal = '',
		invoiceTotalDeviation = '',
		billTotalDeviation = '',
	} = costViewData || {};

	return (
		<div className={styles.card}>
			<div className={styles.header_container}>
				<div className={styles.header_sub_container} />
				<div className={styles.header_sub_container}>Sell</div>
				<div className={styles.header_sub_container}>Buy</div>
			</div>
			<div className={styles.cost_sheet}>
				<div className={styles.header} />
				{Object.keys(costViewData)?.map((service) => (
					!TOTALS_AND_DEVIATIONS.includes(service) ? (
						<ServiceAndLineItems
							service={service}
							key={service}
							serviceDetails={costViewData[service]}
						/>
					) : null
				))}
				<Total
					billTotal={billTotal}
					invoiceTotal={invoiceTotal}
					invoiceTotalDeviation={invoiceTotalDeviation}
					billTotalDeviation={billTotalDeviation}
				/>
			</div>
		</div>
	);
}

export default CostSheetData;
