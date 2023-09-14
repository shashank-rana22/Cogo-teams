import { Toast } from '@cogoport/components';
import { IcMCross, IcMEdit, IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import usePostAgentScoringConfigAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

import styles from './styles.module.css';

function Actions({ activeActionId = '', refetch = () => {}, setActiveActionId = () => {} }) {
	const { push } = useRouter();

	const { updateScoringAttributes } = usePostAgentScoringConfigAttributes();

	const handleDeactive = async () => {
		await updateScoringAttributes({ configId: activeActionId, status: 'inactive' });

		setActiveActionId(null);

		Toast.success('Deactivated successfully!');

		refetch();
	};

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

			<div role="presentation" className={styles.workflow_cta}>
				<div className={styles.cta_text}>
					<IcMTick width={24} height={24} style={{ marginRight: '8px' }} />
					Activate
				</div>
			</div>

			<div role="presentation" className={styles.workflow_cta} onClick={handleDeactive}>
				<div className={styles.cta_text}>
					<IcMCross width={20} height={20} style={{ marginRight: '8px' }} />
					Inactive
				</div>
			</div>
		</div>
	);
}

export default Actions;
