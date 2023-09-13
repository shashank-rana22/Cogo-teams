import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Actions({ activeActionId = '' }) {
	const { push } = useRouter();

	return (
		<div className={styles.action_container}>
			<div
				role="presentation"
				className={styles.workflow_cta}
				onClick={() => push(`/performance-and-incentives/plans?mode=edit&id=${activeActionId}`)}
			>
				<div className={styles.cta_text}>
					<IcMEdit width={20} height={20} style={{ marginRight: '8px' }} />
					Edit
				</div>
			</div>

			<div className={styles.workflow_cta}>
				<div className={styles.cta_text}>
					<IcMCross width={20} height={20} style={{ marginRight: '8px' }} />
					Inactive
				</div>
			</div>
		</div>
	);
}

export default Actions;
