import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({ onClickCta }) {
	return (
		<div className={styles.action_container}>
			<div
				className={styles.workflow_cta}
				onClick={() => {
					onClickCta({ type: 'edit' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMEdit width={16} height={16} style={{ marginRight: '10px' }} />
					Edit Quota
				</div>
			</div>

			<div
				className={styles.workflow_cta_last}
				onClick={() => {
					onClickCta({ type: 'delete' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMDelete width={16} height={16} style={{ marginRight: '10px' }} />
					Delete
				</div>
			</div>
		</div>
	);
}

export default ActionContent;
