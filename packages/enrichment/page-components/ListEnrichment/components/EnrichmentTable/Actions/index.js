import { IcMUpload, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({ onClickCta }) {
	return (
		<div className={styles.action_container}>

			<div
				className={styles.workflow_cta}
				onClick={() => {
					onClickCta({ type: 'manual' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMEdit width={14} height={14} style={{ marginRight: '8px' }} />
					Manual
				</div>
			</div>

			<div
				className={styles.workflow_cta_last}
				onClick={() => {
					onClickCta({ type: 'upload' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMUpload width={14} height={14} style={{ marginRight: '8px' }} />
					Upload
				</div>
			</div>

		</div>
	);
}

export default ActionContent;
