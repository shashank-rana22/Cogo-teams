import { Placeholder } from '@cogoport/components';
import React from 'react';

import QuotationCard from './quotationCard/index';
import styles from './styles.module.css';

interface DataProps {
	sell_quotation?:any,
	buy_quotation?:any
}

function Quotation({ data = {}, loading = false }) {
	const { sell_quotation:sellQuotation = {}, buy_quotation:buyQuotation = {} }:DataProps = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.flex}>
					{loading ? (
						<Placeholder height="500px" width="90%" margin="4px 0px 0px 10px" />
					) : (
						<QuotationCard quotation={sellQuotation} />
					)}
					<div className={styles.margin_div} />
				</div>

				<div className={styles.flex}>
					<div className={styles.margin_div} />

					{loading ? (
						<Placeholder height="500px" width="90%" margin="4px 0px 0px 10px" />
					) : (
						<QuotationCard quotation={buyQuotation} isBuyQuotation />
					)}
				</div>
			</div>
		</div>
	);
}
export default Quotation;
