import { format, isEmpty } from '@cogoport/utils';

// import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function PreviousReminder({ listData = {} }) {
	const { list = [] } = listData || {};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Previous Reminders</div>
			{isEmpty(listData) ? (
				<div>
					No Data Found...
				</div>
			) : (
				<div className={styles.wrap}>
					{(list || []).map((item) => {
						const { communication_summary, title, reminder_date } = item || {};
						return (
							<div className={styles.content}>
								<div className={styles.top}>
									<div className={styles.purpose}>{title}</div>
									<div className={styles.time}>{format(reminder_date, 'dd MMM')}</div>
								</div>
								<div className={styles.top}>
									<div className={styles.task}>{communication_summary || '-'}</div>
									<div className={styles.time}>{format(reminder_date, 'HH:mm a')}</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>

	);
}
export default PreviousReminder;
