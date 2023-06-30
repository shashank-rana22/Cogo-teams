import { IcMShip } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function MovingIcon() {
	return (
		<div className={styles['moving-icon']}>
			<IcMShip className={styles.icon} />
		</div>
	);
}

export default MovingIcon;
