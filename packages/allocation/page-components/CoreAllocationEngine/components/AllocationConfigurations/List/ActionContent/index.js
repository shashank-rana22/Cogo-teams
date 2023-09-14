import { IcMDelete, IcMDoubleTick, IcMEdit, IcMEyeopen, IcMListView, IcMScreenShare } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ActionContent({
	status,
	onClickCta,
}) {
	const { t } = useTranslation(['allocation']);

	const WORKFLOW_CTA_MAPPING = {
		draft: (
			<>
				<div
					className={styles.workflow_cta}
					onClick={() => onClickCta('edit')}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMEdit width={16} height={16} style={{ marginRight: '10px' }} />
						{t('allocation:edit_button')}
					</div>
				</div>
				<div
					className={styles.workflow_cta}
					onClick={() => onClickCta('check')}
					role="presentation"
				>
					<div className={styles.cta_text}>
						<IcMDoubleTick width={16} height={16} style={{ marginRight: '10px' }} />
						{t('allocation:check_button')}
					</div>
				</div>
			</>
		),

		publishable: (
			<div
				className={styles.workflow_cta}
				onClick={() => onClickCta('publish')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMScreenShare width={16} height={16} style={{ marginRight: '10px' }} />
					{t('allocation:publish_button')}
				</div>
			</div>
		),

		not_publishable: (
			<div
				className={styles.workflow_cta}
				onClick={() => onClickCta('view')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMEyeopen width={16} height={16} style={{ marginRight: '10px' }} />
					{t('allocation:view_button')}
				</div>
			</div>
		),

		active: (
			<div
				className={styles.workflow_cta}
				onClick={() => onClickCta('instances')}
				role="presentation"
			>
				<div className={styles.cta_text}>
					<IcMListView width={16} height={16} style={{ marginRight: '10px' }} />
					{t('allocation:instances_label')}
				</div>
			</div>
		),
	};

	return (
		<div className={styles.action_container}>
			{WORKFLOW_CTA_MAPPING[status]}

			<div
				className={styles.workflow_cta_last}
				onClick={() => onClickCta('delete')}
				role="presentation"

			>
				<div className={styles.cta_text}>
					<IcMDelete width={16} height={16} style={{ marginRight: '10px' }} />
					{status === 'active' ? t('allocation:deactivate_button') : t('allocation:delete_button') }
				</div>
			</div>
		</div>
	);
}

export default ActionContent;
