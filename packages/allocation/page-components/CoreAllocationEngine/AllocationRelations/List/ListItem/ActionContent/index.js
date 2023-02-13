import { IcMCross, IcMDelete, IcMDoubleTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({
	activeTab,
	setWorkflowName = () => {},
	setConfirmModalState = () => {}, item = {},
}) {
	const WORKFLOW_CTA_MAPPING = {
		active: (
			<div
				className={styles.workflow_cta}
				role="presentation"
				onClick={() => {
					setWorkflowName('delete');
					setConfirmModalState(() => ({
						type                  : 'delete',
						relationData          : item,
						showConfirmationModal : true,
					}));
				}}
			>
				<div className={styles.cta_text}>
					<IcMDelete width={16} height={16} style={{ marginRight: '10px' }} />
					Delete
				</div>

			</div>
		),
		pending: (
			<>
				<div
					className={styles.workflow_cta}
					role="presentation"
					onClick={() => {
						setWorkflowName('approve');
						setConfirmModalState(() => ({
							type                  : 'approve',
							relationData          : item,
							showConfirmationModal : true,
						}));
					}}
				>
					<div className={styles.cta_text}>
						<IcMDoubleTick width={16} height={16} style={{ marginRight: '10px' }} />
						Approve
					</div>

				</div>
				<div
					className={styles.workflow_cta}
					role="presentation"
					onClick={() => {
						setWorkflowName('reject');
						setConfirmModalState(() => ({
							type                  : 'reject',
							relationData          : item,
							showConfirmationModal : true,
						}));
					}}
				>
					<div className={styles.cta_text}>
						<IcMCross width={16} height={16} style={{ marginRight: '10px' }} />
						Reject
					</div>

				</div>
			</>

		),
	};

	return (
		<div className={styles.action_container}>
			{WORKFLOW_CTA_MAPPING[activeTab]}
		</div>
	);
}

export default ActionContent;
