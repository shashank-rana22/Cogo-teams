import { IcMTick, IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({ onClickCta }) {
	return (
		<div className={styles.action_container}>
			<div
				className={styles.workflow_cta}
				onClick={() => {
					onClickCta({ status: 'approved' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMTick width={20} height={20} style={{ marginRight: '6px' }} />
					Approve
				</div>
			</div>

			<div
				className={styles.workflow_cta_last}
				onClick={() => {
					onClickCta({ status: 'rejected' });
				}}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMCross width={16} height={16} style={{ marginRight: '10px' }} />
					Reject
				</div>
			</div>
		</div>
	);
}

export default ActionContent;
