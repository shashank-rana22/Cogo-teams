import { Placeholder } from '@cogoport/components';
import React from 'react';

import QuotationCard from './quotationCard/index';
import styles from './styles.module.css';

interface DataProps {
	sell_quotation?:Object,
	buy_quotation?:Object
}

interface QuotationParams {
	data?: DataProps,
	loading?: boolean
}

function Quotation({ data = {}, loading = false }: QuotationParams) {
	const { sell_quotation:sellQuotation = {}, buy_quotation:buyQuotation = {} } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.flex_quotation}>
					{loading ? (
						<Placeholder height="600px" width="300px" />
					) : (
						<QuotationCard quotation={sellQuotation} isBuyQuotation={false} />
					)}
					<div className={styles.margin_div} />
				</div>

				<div className={styles.flex_quotation}>
					<div className={styles.margin_div} />

					{loading ? (
						<Placeholder height="600px" width="300px" />
					) : (
						<QuotationCard quotation={buyQuotation} isBuyQuotation />
					)}
				</div>
			</div>
		</div>
	);
}
export default Quotation;
