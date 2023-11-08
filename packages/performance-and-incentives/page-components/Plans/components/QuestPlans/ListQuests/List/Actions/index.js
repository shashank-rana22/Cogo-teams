import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Actions({
	quest_id = '',
	handleUpdate = () => {},
	status = 'active',
}) {
	const { push } = useRouter();

	return (
		<div className={styles.action_container}>
			<div
				role="presentation"
				className={styles.workflow_cta}
				onClick={() => push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${quest_id}`)}
			>
				<div className={styles.cta_text}>
					<IcMEdit width={20} height={20} style={{ marginRight: '8px' }} />
					Edit
				</div>
			</div>

			{status === 'active'
				? (
					<div
						role="presentation"
						className={styles.workflow_cta}
						onClick={() => handleUpdate({ id: quest_id, status: 'inactive' })}
					>
						<div className={styles.cta_text}>
							<IcMCross width={24} height={24} style={{ marginRight: '8px' }} />
							De-activate
						</div>
					</div>
				) : null }
		</div>
	);
}

export default Actions;
