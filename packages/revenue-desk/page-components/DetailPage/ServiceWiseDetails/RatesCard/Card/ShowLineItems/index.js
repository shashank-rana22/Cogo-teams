import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const columns = ['code', 'price', 'unit'];

function ShowLineItems({
	serviceType = '',
	lineItems = [],
	originLocalLineItems = [],
	destinationLocalLineItems = [],
}) {
	const HEADINGS = {};
	if (!isEmpty(lineItems)) {
		HEADINGS[serviceType] = lineItems;
	}
	if (!isEmpty(originLocalLineItems)) {
		HEADINGS.origin_local_line_items = originLocalLineItems;
	}
	if (!isEmpty(destinationLocalLineItems)) {
		HEADINGS.destination_local_line_items = destinationLocalLineItems;
	}
	return Object.keys(HEADINGS).map((key) => (
		<>
			<div className={styles.heading_text}>{startCase(key)}</div>
			<div style={{ display: 'flex' }}>
				{columns.map((item) => (
					<p key={item} className={styles.labelText}>{startCase(item)}</p>
				))}
			</div>
			<div className={styles.table}>
				{
					(HEADINGS[key]).map((lineItem) => (
						<div key={lineItem?.code} style={{ display: 'flex' }}>
							{
								columns.map((col) => (
									<p key={col} className={styles.valueText}>
										{(col === 'price') ? formatAmount({
											amount   : lineItem?.[col],
											currency : lineItem?.currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										}) : startCase(lineItem?.[col])}
									</p>
								))
							}
						</div>
					))
				}
			</div>
		</>
	));
}
export default ShowLineItems;
