import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../../../../utils/getValue';

import styles from './styles.module.css';

// const { Col } = Grid;

function Item({ item, fields, handleClick, loading = false }) {
	const stylesCol = { padding: '0px 4px' };

	const stylesRow = {
		borderBottom   : '1px solid #e0e0e0',
		borderRadius   : '0px',
		margin         : 0,
		display        : 'flex',
		flexDirection  : 'row',
		justifyContent : 'space-between',
	};

	return (
		<div
			style={stylesRow}
			onClick={handleClick}
			tabIndex="0"
			className={cl` ${item.expired ? 'expired' : ''} ${styles.row}`}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
			role="button"
		>
			{fields.map((singleItem) => (
				<div
					// xs={6}
					// sm={6}
					// md={singleItem.span}
					// lg={singleItem.span}
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
