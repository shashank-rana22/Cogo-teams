import React from 'react';

import { renderPurchaseFunction } from '../../page-components/RenderFunctions/renderPurchaseFunction';

import styles from './styles.module.css';

function SingleColumn({
	lineitem = {},
	fields = [],
}) {
	return (
		<div className={styles.tablecolumn}>
			{fields?.map((field) => (
				<div
					style={{
						flex  : (field.span || 1),
						width : `${((field.span || 1) * (100 / 12))}px`,
					}}
					className={styles.value}
					key={field.label || field.key}
				>
					{renderPurchaseFunction[field?.key] ? renderPurchaseFunction[field?.key](lineitem) : '-'}
				</div>
			))}
		</div>
	);
}

export default SingleColumn;
