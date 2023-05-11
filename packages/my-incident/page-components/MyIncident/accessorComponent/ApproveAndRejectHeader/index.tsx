import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

interface RowInterface {
	status?:string,
	updatedBy?:{ name?:string },
	remark?:string,
	updatedAt?:Date
}
interface Props {
	row?:RowInterface,
}
function ApproveAndRejectHeader({ row }:Props) {
	const { status, updatedBy, updatedAt, remark } = row || {};

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
				<div>
					{status === 'APPROVED'
						? 'Approved By :' : 'Rejected By :'}
					{startCase(updatedBy?.name || '-')}
					{' '}
					At :
					{format(updatedAt, 'dd MMM YYYY hh:mm a', {}, false)}
					{' '}
				</div>
			</div>
			<div className={status === 'APPROVED' ? styles.hr : styles.rejected_hr} />
			<div className={status === 'APPROVED' ? styles.remarks : styles.rejected_remarks}>
				<div>
					Remarks :
				</div>

				<div style={{ marginLeft: '8px' }}>
					{remark}
				</div>
			</div>
		</div>
	);
}
export default ApproveAndRejectHeader;
