import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../../../../utils/getValue';

import styles from './styles.module.css';

function Item({
	item = {},
	isTotalRow = false,
	fields,
	loading = false,
	disabled = false,
	isLast = false,
}) {
	const STYLES_COL = { padding: '0px 4px' };

	return (
		<div
			style={{
				opacity      : disabled ? '0.4' : '1',
				cursor       : disabled ? 'not-allowed' : 'pointer',
				borderBottom : isLast ? 'none' : null,
				borderRadius : isLast ? '0px 0px 4px 4px' : null,
			}}
			className={cl`${item.expired ? styles.expired : ''} ${
				item.isDuplicates ? styles.duplicate : ''
			} ${styles.card_container_styles}`}
		>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<div
						style={singleItem.hasStyle ? singleItem.styles : STYLES_COL}
						key={singleItem?.key}
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}
						{!isTotalRow ? (
							<div>
								{singleItem?.render && !loading
									? singleItem.render(item)
									: null}
							</div>
						) : (
							<div className={styles.total}>{item[singleItem?.name]}</div>
						)}

						{!loading && !singleItem.render ? (
							<div className={styles.title_black}>
								{getValue(item, singleItem, false, {}) || '-'}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default Item;
