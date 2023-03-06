import { Placeholder } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function PreviousReminder({ listData = {}, listLoading, handleScroll }) {
	const { list = [] } = listData || {};

	if (isEmpty(list) && !listLoading) {
		return (
			<div className={styles.empty}>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reminder-empty.svg" alt="" />
				<div className={styles.text}>No Data Found</div>
			</div>
		);
	}
	const loader = (
		<div className={styles.content}>
			<div className={styles.top}>
				<div className={styles.purpose}>
					<Placeholder height="12px" width="120px" />
				</div>
				<div className={styles.time}><Placeholder height="12px" width="40px" /></div>
			</div>
			<div className={styles.top}>
				<div className={styles.task}>
					<Placeholder height="12px" width="100px" />
				</div>
				<div className={styles.time}>
					<Placeholder height="12px" width="70px" margin="4px 0 0 0" />
				</div>
			</div>
		</div>
	);
	return (
		<div className={styles.container}>
			<div className={styles.title}>Previous Reminders</div>

			<div
				className={styles.wrap}
				onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
			>
				{(list || []).map((item) => {
					const { communication_summary, title, reminder_date } = item || {};
					return (
						<div className={styles.content}>
							<div className={styles.top}>
								<div className={styles.purpose}>{title}</div>
								<div className={styles.task}>{communication_summary || '-'}</div>
							</div>
							<div className={styles.right}>
								<div className={styles.time}>{format(reminder_date, 'dd MMM')}</div>
								<div className={styles.time}>{format(reminder_date, 'HH:mm a')}</div>
							</div>
						</div>
					);
				})}
				{listLoading && loader}
			</div>

		</div>

	);
}
export default PreviousReminder;
