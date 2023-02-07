import { IcMDelete, IcMDoubleTick, IcMEdit, IcMEyeopen, IcMListView, IcMScreenShare } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({ status, setWorkflowName }) {
	const WORKFLOW_CTA_MAPPING = {
		draft: (
			<>
				<div
					className={styles.workflow_cta}
					onClick={() => setWorkflowName('edit')}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMEdit width={16} height={16} style={{ marginRight: '10px' }} />
						Edit
					</div>
				</div>
				<div
					className={styles.workflow_cta}
					onClick={() => setWorkflowName('check')}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMDoubleTick width={16} height={16} style={{ marginRight: '10px' }} />
						Check
					</div>
				</div>
			</>
		),

		publishable: (
			<div
				className={styles.workflow_cta}
				onClick={() => setWorkflowName('publish')}
				role="presentation"
			>
				<IcMScreenShare width={16} height={16} style={{ marginRight: '10px' }} />
				<div className={styles.cta_text}>Publish</div>
			</div>
		),

		not_publishable: (
			<div
				className={styles.workflow_cta}
				onClick={() => setWorkflowName('view')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMEyeopen width={16} height={16} style={{ marginRight: '10px' }} />
					View
				</div>
			</div>
		),

		active: (
			<div
				className={styles.workflow_cta}
				onClick={() => setWorkflowName('instances')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMListView width={16} height={16} />
					Instances
				</div>
			</div>
		),
	};

	return (
		<div className={styles.action_container}>
			{WORKFLOW_CTA_MAPPING[status]}

			<div
				className={styles.workflow_cta}
				onClick={() => setWorkflowName('delete')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMDelete width={16} height={16} style={{ marginRight: '10px' }} />
					{status === 'active' ? 'Deactivate' : 'Delete'}
				</div>
			</div>
		</div>
	);
}

export default ActionContent;
