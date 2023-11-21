import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMCross,
	IcMTick,
	IcMCalendar,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_COUNT = 1;

function LeaveSubCard({ val = {}, isManager = false, updateLoading = false, handleLeaveUpdate = () => {} }) {
	function getStatusClassName(leaveStatus) {
		if (leaveStatus === 'pending') {
			return 'pending';
		}
		if (leaveStatus === 'accepted') {
			return 'accepted';
		}
		return 'rejected';
	}

	return (
		<div className={styles.details} key={val.id}>
			<div className={styles.design}>
				<div className={styles.img}>
					<IcMCalendar width={18} height={18} />
				</div>
				<div className={styles.sec2}>
					<div className={styles.text1}>
						<span className={styles.text_name}>{val.name}</span>
						{' '}
						requested
						{' '}
						{ startCase(val.leave_type) }
						{' '}
						for
						{' '}
						{val.leave_count}
						{' '}
						{`Day${val.leave_count > DEFAULT_COUNT ? 's' : ''}`}
						, from
						{' '}
						{formatDate({
							date       : val?.leave_start_date ? new Date(val?.leave_start_date) : null,
							dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
							formatType : 'date',
						})}
						{' '}
						-
						{' '}
						{formatDate({
							date       : val?.leave_start_date ? new Date(val?.leave_start_date) : null,
							dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
							formatType : 'date',
						})}
					</div>
					<div className={styles.text2}>{val.leave_reason}</div>
					<div className={styles.leave_details}>
						<div className={styles.name}>
							{val?.created_at
								? formatDistanceToNow(new Date(val?.created_at), { addSuffix: true }) : null}
						</div>
					</div>
				</div>
			</div>
			{isManager ? (
				<div className={styles.yes_no}>
					<div className={styles.deny}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => handleLeaveUpdate(val.id, 'rejected')}
							disabled={updateLoading}
						>
							<div className={styles.reject}>
								<IcMCross width={16} height={22} fill="#BF291E" />
								<span className={styles.rej_content}>Reject</span>
							</div>
						</Button>
					</div>
					<div className={styles.approve}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => handleLeaveUpdate(val.id, 'approved')}
							disabled={updateLoading}
						>
							<div className={styles.accept}>
								<IcMTick width={25} height={22} fill="#849E4C" />
								<span className={styles.acc_content}>Approve</span>
							</div>
						</Button>
					</div>
				</div>
			) : (
				<div className={`${styles[getStatusClassName(val.leave_status)]}`}>
					{startCase(val.leave_status)}
				</div>
			)}
		</div>
	);
}

export default LeaveSubCard;
