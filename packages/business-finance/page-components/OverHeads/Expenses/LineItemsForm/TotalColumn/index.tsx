import React from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import styles from '../styles.module.css';

function TotalColumn({ append, totalAmountBeforeTax, totalTax, totalAmountAfterTax, payableAmount, totalTds }) {
	const getValue = (value) => {
		if (Number.isNaN(value)) {
			return '---';
		}
		return parseFloat(value).toFixed(2);
	};
	return (
		<>
			<div className={styles.flexend}>
				<div
					onClick={() => append({ new: true, price: 0, quantity: 0 })}
					role="presentation"
					className={styles.add}
				>
					+ Add item
				</div>
			</div>
			<div className={styles.flex}>
				<div className={`${styles.col} ${styles.total}`} style={{ width: '36%' }}>
					<span>
						Total amount before tax
					</span>
					<span>
						{ getValue(totalAmountBeforeTax)}
					</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '14%' }}>
					Tax
					<span>
						{ getValue(totalTax)}
						%
					</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '18%' }}>
					Amount after Tax
					<span>
						{ getValue(totalAmountAfterTax)}
					</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '10%' }}>
					TDS
					<span>{totalTds ? showOverflowingNumber(totalTds, 4) : null}</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '10%' }}>
					Payable
					<span>{ getValue(payableAmount)}</span>
				</div>
			</div>
		</>
	);
}

export default TotalColumn;
