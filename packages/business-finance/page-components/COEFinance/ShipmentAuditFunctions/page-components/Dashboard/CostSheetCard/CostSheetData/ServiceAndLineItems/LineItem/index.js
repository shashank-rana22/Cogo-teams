import React from 'react';

import LineItemDeviation from './LineItemDeviation';
import styles from './styles.module.css';

function LineItem({
	lineItem = {},
}) {
	const {
		sellQuotationLineItemTotal = '', buyQuotationLineItemTotal = '', sellQuotationLineItemCurrency = '',
		invoiceLineItemTotal = '', billLineItemTotal = '', invoiceCurrency = '', billCurrency = '',
		buyQuotationLineItemCurrency = '', percentageDeviationBuy = '', percentageDeviationSell = '',
	} = lineItem || {};

	return (
		<div className={styles.item_container}>
			<div className={styles.line_item_sub_container}>{`${lineItem?.name || ''} (${lineItem?.code || ''})`}</div>
			<div className={styles.line_item_sub_container}>
				<LineItemDeviation
					currency={invoiceCurrency}
					quotationCurrency={sellQuotationLineItemCurrency}
					sellOrBuyQuotTotal={sellQuotationLineItemTotal}
					invOrBillTotal={invoiceLineItemTotal}
					deviation={percentageDeviationSell}
				/>
			</div>
			<div className={styles.line_item_sub_container}>
				<LineItemDeviation
					currency={billCurrency}
					quotationCurrency={buyQuotationLineItemCurrency}
					sellOrBuyQuotTotal={buyQuotationLineItemTotal}
					invOrBillTotal={billLineItemTotal}
					deviation={percentageDeviationBuy}
				/>
			</div>

		</div>
	);
}

export default LineItem;
