import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ApproveAndReject({ row }) {
	const { status, updatedBy } = row || {};
	const { t } = useTranslation(['incidentManagement']);
	return (
		<div className={status === 'APPROVED' ? styles.approve_container : styles.reject_container}>
			<div className={styles.flex}>
				<div className={styles.remark_flex}>
					<div className={styles.icon}>
						{status === 'APPROVED' ? <IcCFtick width="22px" height="22px" />
							: <IcCFcrossInCircle width="22px" height="22px" />}
					</div>
					<div>{startCase(status)}</div>
				</div>

				<div className={styles.remark_flex}>
					<div className={styles.approve}>
						{status === 'APPROVED'
							? t('incidentManagement:approved_by') : t('incidentManagement:rejected_by')}

					</div>
					{startCase(updatedBy?.name || '-')}
				</div>
			</div>
		</div>
	);
}
export default ApproveAndReject;
