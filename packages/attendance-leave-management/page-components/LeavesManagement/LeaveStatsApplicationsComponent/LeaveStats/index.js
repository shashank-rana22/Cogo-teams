import useGetLeaveStats from '../../../../hooks/useGetleaveStats';
import { getDates } from '../../../../utils/getDates';

import styles from './styles.module.css';

function LeaveStats() {
	const datesArr = getDates();
	const { data } = useGetLeaveStats() || {};
	const { leave_dates } = data || [];
	const NUM = 1;
	const numbersToCheck = leave_dates;
	return (
		<div className={styles.container}>
			<div className={styles.header_ctn}>
				<div className={styles.text1}>Leaves Stats</div>
				<div className={styles.text2}>
					{numbersToCheck?.length}
					{' '}
					{numbersToCheck?.length === NUM ? 'Absent' : 'Absents'}
				</div>
			</div>

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
		</div>
	);
}

export default LeaveStats;
