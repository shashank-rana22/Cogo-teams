import { cl } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../../../../utils/getValue';

import styles from './styles.module.css';

function Item({ item = {}, fields = [] }) {
	const stylesCol = { padding: '0 4px' };

	return (
		<div className={cl`${item.expired ? styles.expired : ''} ${styles.row}`}>
			{fields.map((singleItem) => (
				<div
					key={singleItem?.key}
					style={singleItem.hasStyle ? singleItem.styles : stylesCol}
				>
					<div className={styles.label}>{singleItem.label}</div>

					{singleItem.render ? singleItem.render(item) : null}

					{!singleItem.render ? (
						<div className={styles.title_black}>
							{getValue(item, singleItem, false, {}) || '-'}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
}

export default Item;
