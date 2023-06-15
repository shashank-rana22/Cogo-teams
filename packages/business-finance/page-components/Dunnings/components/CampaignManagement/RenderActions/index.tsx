import { Toggle } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RenderActions() {
	return (
		<div style={{ display: 'flex' }}>
			<Toggle name="isActive" size="md" showOnOff disabled={false} checked />
			<button className={styles.btn} aria-label="edit">
				<IcMEdit
					height={15}
					width={15}
				/>

			</button>
			<button className={styles.btn} aria-label="delete">
				<IcMDelete
					height={15}
					width={15}
				/>

			</button>
		</div>
	);
}

export default RenderActions;
