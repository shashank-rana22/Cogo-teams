import { startCase } from '@cogoport/utils';
import converter from 'number-to-words';
import React from 'react';

import styles from './styles.module.css';

function TotalAfterTax({ payableAmount, invoiceCurrency }) {
	const getValue = (value) => {
		if (Number.isNaN(value)) {
			return '---';
		}
		return parseFloat(value).toFixed(2);
	};
	return (
		<div>
			<div className={styles.tat}>
				<div>
					<span className={styles.label}>Total Payable :</span>
				</div>
				<span className={styles.value}>
					{invoiceCurrency}
					{' '}
					{getValue(payableAmount)}
				</span>
			</div>
			{payableAmount > 0 && invoiceCurrency ? (
				<div className={styles.words}>
					{startCase(converter.toWords(payableAmount))}
					{' '}
					{invoiceCurrency}
					{' '}
					Only
				</div>
			) : null}
		</div>
	);
}

export default TotalAfterTax;
