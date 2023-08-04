import { IcMCall } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyCard() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.call_icon}>
				<IcMCall width={20} height={20} fill="#BDBDBD" />
			</div>
			Empty Call Log..
		</div>
	);
}

export default EmptyCard;
