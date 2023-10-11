import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCCheckIn, IcCCheckOut, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Loader from '../../../../../common/Loader';
import useGetCheckinStats from '../../../../../hooks/useGetCheckinStats';

import CurrentTime from './CurrentTime';
import styles from './styles.module.css';

function TimeSummary() {
	const router = useRouter();
	const { data, loading } = useGetCheckinStats();

	const getTime = (date, isDate = false) => {
		if (!date) {
			return '--';
		}

		return formatDate({
			date,
			dateFormat : isDate ? GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'] : undefined,
			timeFormat : !isDate ? GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'] : undefined,
			formatType : isDate ? 'date' : 'time',
		});
	};

	const { check_in, check_out } = data || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.current_time}>
				<CurrentTime />
			</div>
			<div className={styles.today_date}>
				{getTime(Date(), true)}
			</div>
			<div className={styles.time_log_flex}>
				<div className={styles.time_log}>
					<IcCCheckIn width={20} height={20} style={{ marginRight: 8 }} />
					{getTime(check_in)}
				</div>
				<div className={styles.time_log} style={{ marginLeft: 24 }}>
					<IcCCheckOut width={20} height={20} style={{ marginRight: 8 }} />
					{getTime(check_out)}
				</div>
			</div>
			<div
				className={styles.checkout}
				onClick={() => router.push('/attendance-leave-management')}
				aria-hidden
			>
				<div className={styles.checkout_text}>
					Check Out
					{' '}
				</div>
				<IcMArrowRight />
			</div>
		</div>
	);
}

export default TimeSummary;
