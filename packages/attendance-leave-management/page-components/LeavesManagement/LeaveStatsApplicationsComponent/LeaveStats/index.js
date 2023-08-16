import { getDates } from '../../../../utils/getDates';

import styles from './styles.module.css';

function LeaveStats() {
	const datesArr = getDates();
	return (
		<div className={styles.container}>
			<div className={styles.header_ctn}>
				<div className={styles.text1}>Leaves Stats</div>
				<div className={styles.text2}> 5 Absents</div>
			</div>

			<div className={styles.month_styles}>
				{datesArr.map((item) => (
					<div key={item} className={styles.month_dates}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}

export default LeaveStats;
