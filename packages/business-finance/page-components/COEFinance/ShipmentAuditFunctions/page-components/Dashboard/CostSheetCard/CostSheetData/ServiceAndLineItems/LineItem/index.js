import React from 'react';

import LineItemDeviation from './LineItemDeviation';
import styles from './styles.module.css';

function LineItem({
	lineItem = {},
}) {
	const {
		sellQuotationTotal = '', buyQuotationTotal = '',
		invoiceTotal = '', billTotal = '', currency = '',
		percentageDeviationBuy = '', percentageDeviationSell = '',
	} = lineItem || {};

	return (
		<div className={styles.item_container}>
			<div className={styles.line_item_sub_container}>{`${lineItem?.name} (${lineItem?.code})`}</div>
			<div className={styles.line_item_sub_container}>
				<LineItemDeviation
					currency={currency}
					sellOrBuyQuotTotal={sellQuotationTotal}
					invOrBillTotal={invoiceTotal}
					deviation={percentageDeviationSell}
				/>
			</div>
			<div className={styles.line_item_sub_container}>
				<LineItemDeviation
					currency={currency}
					sellOrBuyQuotTotal={buyQuotationTotal}
					invOrBillTotal={billTotal}
					deviation={percentageDeviationBuy}
				/>
			</div>

		</div>
	);
}

export default LineItem;
