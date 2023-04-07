import { Button, cl } from '@cogoport/components';
import React from 'react';

import sideBarConfigs from '../../constants/configs';

import styles from './styles.module.css';

function SideBar({
	onCompose = () => {},
	composingEmail,
	activeBox,
	setActiveBox,
}) {
	const SIDE_BAR_ITEMS = sideBarConfigs;

	return (
		<div className={styles.container}>

			<div className={styles.actions}>
				<Button
					onClick={onCompose}
					disabled={composingEmail}
					style={{ width: '70%' }}
				>
					+ Compose
				</Button>
			</div>

			<div className={styles.items}>
				{SIDE_BAR_ITEMS.map((item) => (
					<div
						role="button"
						tabIndex={0}
						key={item.name}
						className={cl`${styles.item} ${activeBox === item.name ? styles.active : ''}`}
						onClick={() => setActiveBox(item.name)}
					>
						<div className={cl`${styles.item_name} ${activeBox === item.name ? styles.active : ''}`}>
							{item.label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default SideBar;
