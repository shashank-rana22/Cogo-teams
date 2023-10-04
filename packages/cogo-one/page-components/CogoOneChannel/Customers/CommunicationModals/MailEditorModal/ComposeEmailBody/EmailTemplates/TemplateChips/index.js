import { cl, Tooltip } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function TemplateChips({
	items = [],
	selectedItems = '',
	onItemChange = () => {},
}) {
	return (
		<div className={styles.chips_container}>
			{items.map((itm) => (
				<button
					type="button"
					key={itm?.key}
					className={cl`${styles.ui_chip_container} 
                        ${selectedItems === itm?.value ? styles.active_chip : ''}`}
					onClick={() => onItemChange(itm?.value)}
				>
					{selectedItems === itm?.value ? (
						<div className={styles.select}>
							<IcMTick />
						</div>
					) : null}
					<div className={styles.all_children}>
						<Tooltip content={itm?.children} placement="bottom">
							<div className={styles.children}>
								{itm?.children}
							</div>
						</Tooltip>
					</div>
				</button>
			))}
		</div>
	);
}

export default TemplateChips;
