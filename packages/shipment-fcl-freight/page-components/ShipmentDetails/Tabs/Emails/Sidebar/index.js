import { Button } from '@cogoport/components';
import React from 'react';

import sideBarConfigs from '../constants/configs';

import styles from './styles.module.css';

function Sidebar({
	onCompose = () => {},
	composingEmail,
	activeBox,
	setActiveBox,
	source,
}) {
	const SIDE_BAR_ITEMS = sideBarConfigs[source];
	return (
		<div className={styles.container}>
			<div className={styles.action}>
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
						key={item.name}
						className={` ${activeBox === item.name ? styles.active : ''} ${styles.nav_item}`}
						onClick={() => setActiveBox(item.name)}
						role="button"
						tabIndex={0}
					>
						<div className={`${activeBox === item.name ? styles.active : ''}${styles.item_name}`}>
							{item.label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
