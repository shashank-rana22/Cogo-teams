import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../../commons/EmptyStateDocs';

import ServiceAndLineItems from './ServiceAndLineItems';
import styles from './styles.module.css';
import Total from './Total';

const BILL_AND_INVOICE_TOTAL = ['billTotal', 'invoiceTotal'];

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

	const { billTotal = '', invoiceTotal = '' } = costViewData || {};

	return (
		<div>
			<div className={styles.header} />
			{Object.keys(costViewData)?.map((service) => (
				!BILL_AND_INVOICE_TOTAL.includes(service) ? (
					<ServiceAndLineItems
						service={service}
						key={service}
						serviceDetails={costViewData[service]}
					/>
				) : null
			))}

			<Total billTotal={billTotal} invoiceTotal={invoiceTotal} />
		</div>
	);
}

export default CostSheetData;
