import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

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
					{	formatDate({
						date       : updatedAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'dateTime',
						timeFormat : GLOBAL_CONSTANTS.formats.date['hh:mm a'],
					})}
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
