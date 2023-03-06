import React from 'react';

import styles from '../styles.module.css';

function TotalColumn({ append, totalAmountBeforeTax, totalTax, totalAmountAfterTax, totalPayable }) {
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
				<div className={`${styles.col} ${styles.total}`} style={{ width: '42%' }}>
					<span>
						Total amount before tax
					</span>
					<span>
						{ getValue(totalAmountBeforeTax)}
					</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '16%' }}>
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
				<div className={`${styles.col}`} style={{ width: '20%' }}>
					TDS
					<span>200000</span>
				</div>
				<div className={`${styles.col}`} style={{ width: '24%' }}>
					Payable
					<span>{ getValue(totalPayable)}</span>
				</div>
			</div>
		</>
	);
}

export default TotalColumn;
