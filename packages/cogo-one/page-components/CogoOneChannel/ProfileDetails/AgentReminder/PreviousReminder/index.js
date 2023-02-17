import { Loader } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function PreviousReminder({ listData = {}, listLoading }) {
	const { list = [] } = listData || {};

	if (listLoading) {
		return (
			<div className={styles.loader_div}>
				<Loader themeType="primary" />
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>Previous Reminders</div>
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
		</div>

	);
}
export default PreviousReminder;
