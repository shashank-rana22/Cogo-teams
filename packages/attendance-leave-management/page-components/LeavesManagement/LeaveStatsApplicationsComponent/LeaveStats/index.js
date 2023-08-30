import { Placeholder } from '@cogoport/components';

import useGetLeaveStats from '../../../../hooks/useGetleaveStats';
import { getDates } from '../../../../utils/getDates';

import styles from './styles.module.css';

function LeaveStats({ cycle_id }) {
	console.log('cycle_id_qqqq', cycle_id);

	const datesArr = getDates();
	const { data, loading } = useGetLeaveStats(cycle_id);
	const { leave_dates } = data || [];
	const NUM = 1;
	const numbersToCheck = leave_dates;
	return (
		<div className={styles.container}>
			{loading ? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" /> : (
				<div className={styles.header_ctn}>
					<div className={styles.text1}>Leaves Stats</div>
					<div className={styles.text2}>
						{numbersToCheck?.length}
						{' '}
						{numbersToCheck?.length === NUM ? 'Absent' : 'Absents'}
					</div>
				</div>
			)}

			{loading ? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" /> : (
				<div className={styles.month_styles}>
					{datesArr.map((item) => (
						<div
							key={item}
							className={numbersToCheck?.includes(item) ? styles.month_dates : styles.month_dates_absent}
						>
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LeaveStats;
