import { Button, cl } from '@cogoport/components';
import React from 'react';

import sideBarConfigs from '../../constants/configs';

import styles from './styles.module.css';

function SideBar({
	onCompose = () => {},
	composingEmail,
	activeBox,
	setActiveBox,
	source,
}) {
	const SIDE_BAR_ITEMS = sideBarConfigs[source];
	return (
		<div className={styles.container}>
			<div className={styles.actions}>
				<Button
					onClick={onCompose}
					disabled={composingEmail}
					style={{ width: '90%' }}
				>
					+ Compose New
				</Button>
			</div>
			<div className={styles.items}>
				{SIDE_BAR_ITEMS.map((item) => (
					<div
						role="button"
						tabIndex={0}
						key={item.name}
						className={` ${styles.item} ${activeBox === item.name ? 'active' : ''}`}
						onClick={() => setActiveBox(item.name)}
					>
						<div className={cl`${styles.item_name} ${activeBox === item.name ? 'active' : ''}`}>
							{item.label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default SideBar;
