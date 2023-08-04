import { getDates } from '../../../../utils/getDates';

import styles from './styles.module.css';

// const list = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
// 	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function LeaveStats() {
	const datesArr = getDates();
	return (
		<div className={styles.container}>
			<div className={styles.header_ctn}>
				<div className={styles.text1}>Leaves Stats</div>
				<div className={styles.text2}> 5 Absents this months</div>
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
