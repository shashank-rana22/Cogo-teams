import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ApproveAndReject({ row }:any) {
	const { status, updatedBy } = row || {};

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
					<div className={styles.approve}>{status === 'APPROVED' ? 'Approved by - ' : 'Rejected by - '}</div>
					{startCase(updatedBy?.name || '-')}
				</div>
			</div>
		</div>
	);
}
export default ApproveAndReject;
