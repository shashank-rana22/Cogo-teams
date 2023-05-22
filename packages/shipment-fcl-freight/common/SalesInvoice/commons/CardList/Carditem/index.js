import { Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../utils/getValue';

import styles from './styles.module.css';

function Item({
	item,
	fields,
	loading = false,
}) {
	return (
		<div className={styles.row}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				const { span } = singleItem;
				const widthVal = (span / 12) * 100;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={singleItem?.key}
						className={styles.column}
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						{singleItem.render && !loading ? singleItem?.render(item) : null}

						{loading && !singleItem.render ? (
							<span className={styles.title_black}>
								{getValue(item, singleItem, false, {}) || '-'}
							</span>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default Item;
