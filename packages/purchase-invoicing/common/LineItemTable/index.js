import React from 'react';

import { lineItemConfig } from '../../configurations/purchaselineItems';

import SingleColumn from './SingleColumn';
import styles from './styles.module.css';

function LineItemTable({ lineItems = [] }) {
	return (
		<div className={styles.servicecontainer}>
			<div className={styles.tableheader}>
				{(lineItemConfig || []).map((field) => (
					<div
						style={{
							flex  : (field.span || 1),
							width : `${((field.span || 1) * (100 / 12))}px`,
						}}
						className={styles.fieldstyle}
						key={field.key || field.label}
					>
						{field.label}
					</div>
				))}
			</div>
			{(lineItems || []).map((lineitem) => (
				<SingleColumn lineitem={lineitem} fields={lineItemConfig} key={lineitem.code} />
			))}
		</div>
	);
}

export default LineItemTable;
