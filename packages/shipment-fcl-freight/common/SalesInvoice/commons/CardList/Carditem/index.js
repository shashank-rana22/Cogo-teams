import { Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../utils/getValue';

import styles from './styles.module.css';

function Item({
	item,
	fields,
	loading = false,
	disabled = false,
	isLast = false,
}) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<div
			style={{
				opacity      : disabled ? '0.4' : '1',
				cursor       : disabled ? 'not-allowed' : 'pointer',
				borderBottom : isLast ? 'none' : null,
				borderRadius : isLast ? '0px 0px 4px 4px' : null,
			}}
			className={`${item.expired ? styles.expired : ''} ${styles.card_body_row} ${styles.row}`}
		>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<div
						style={singleItem.hasStyle ? singleItem.styles : stylesCol}
						key={singleItem?.key}
						className="card-body-col"
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						<span className={styles.label}>{singleItem?.label}</span>

						{singleItem.render && !loading ? singleItem?.render(item) : null}

						{!loading && !singleItem.render ? (
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
