import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../../../../utils/getValue';

import styles from './styles.module.css';

function Item({ item, fields, handleClick, loading = false }) {
	const stylesCol = { padding: '0 4px' };

	return (
		<div
			onClick={handleClick}
			tabIndex="0"
			className={cl` ${item.expired ? styles.expired : ''} ${styles.row}`}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
			role="button"
		>
			{fields.map((singleItem) => (
				<div
					style={singleItem.hasStyle ? singleItem.styles : stylesCol}
					key={singleItem?.key}
				>
					{loading && <Placeholder width="100%" height="20px" />}
					<div className={styles.label}>{singleItem.label}</div>
					{singleItem.render && !loading ? singleItem.render(item) : null}
					{!loading && !singleItem.render ? (
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
