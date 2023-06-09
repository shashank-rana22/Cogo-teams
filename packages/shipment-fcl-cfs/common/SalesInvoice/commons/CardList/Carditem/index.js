import { Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../utils/getValue';

import styles from './styles.module.css';

const SPAN_COUNT = 12;
const MULTIPLIER = 12;

function Item({
	item,
	fields,
	loading = false,
}) {
	return (
		<div className={styles.row}>
			{fields?.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				const { span, render = () => {}, label } = singleItem;
				const widthVal = (span / SPAN_COUNT) * MULTIPLIER;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={label}
						className={styles.column}
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						{render && !loading ? render(item) : null}

						{loading && !render ? (
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
