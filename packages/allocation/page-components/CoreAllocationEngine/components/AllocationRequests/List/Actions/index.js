import { IcMTick, IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ActionContent({ onClickCta }) {
	const { t } = useTranslation(['allocation']);

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
					{t('allocation:approved_label')}
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
					{t('allocation:rejected_label')}
				</div>
			</div>
		</div>
	);
}

export default ActionContent;
