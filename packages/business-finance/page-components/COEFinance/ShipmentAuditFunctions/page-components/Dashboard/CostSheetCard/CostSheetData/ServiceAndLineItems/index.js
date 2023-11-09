import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import LineItem from './LineItem';
import styles from './styles.module.css';

function ServiceAndLineItems({
	service = '',
	serviceDetails = {},
}) {
	const {
		lineItems = [], invoiceLineItemTotalByService = '', billLineItemTotalCurrencyByService = '',
		billLineItemTotalByService = '', invoiceLineItemTotalCurrencyByService = '',
	} = serviceDetails || {};
	return (
		<div className={styles.container}>
			<div className={styles.service_name}>
				<div className={styles.sub_content}>{startCase(service)}</div>
				<div className={styles.sub_content}>
					{formatAmount({
						amount   : invoiceLineItemTotalByService,
						currency : invoiceLineItemTotalCurrencyByService || 'INR',
						options  : {
							currencyDisplay : 'code',
							style           : 'currency',
						},
					})}
				</div>
				<div className={styles.sub_content}>
					{formatAmount({
						amount   : billLineItemTotalByService,
						currency : billLineItemTotalCurrencyByService || 'INR',
						options  : {
							currencyDisplay : 'code',
							style           : 'currency',
						},
					})}
				</div>
			</div>
			{lineItems?.map((item) => (
				<LineItem
					lineItem={item}
					key={item?.id}
				/>
			))}
			<div className={styles.line} />
		</div>
	);
}

export default ServiceAndLineItems;
