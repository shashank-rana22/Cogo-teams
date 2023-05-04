import React from 'react';

import { renderPurchaseFunction } from '../../configurations/purchaselineItems';

import styles from './styles.module.css';

function SingleColumn({ lineitem, fields }) {
	return (
		<div className={styles.tablecolumn}>
			{fields.map((field) => (
				<div
					style={{
						flex  : (field.span || 1),
						width : `${((field.span || 1) * (100 / 12))}px`,
					}}
					className={styles.value}
				>
					{renderPurchaseFunction[field?.key] ? renderPurchaseFunction[field?.key](lineitem) : '-'}
				</div>
			))}
		</div>
	);
}

export default SingleColumn;
