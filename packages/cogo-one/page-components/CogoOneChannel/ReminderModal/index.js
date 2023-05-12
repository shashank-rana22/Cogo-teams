import { Button, Modal } from '@cogoport/components';

import { TIPS } from '../../../configurations/shipment-reminder';

import styles from './styles.module.css';

function ReminderModal({ setReminderModal = () => {} }) {
	return (
		<Modal
			className={styles.modal_body}
			size="lg"
			show
			onClickOutside={() => setReminderModal(false)}
			placement="center"
		>
			<div className={styles.reminder_stats}>
				<div className={styles.reminder_heading}>
					No of Chats Assigned to You:
				</div>
				<div className={styles.reminder_summary}>
					<div className={styles.summary_title}>Summary</div>
					<div className={styles.summary_container}>
						<div className={styles.summary}>Today&apos;s Count</div>
						<div className={styles.summary}>This Week</div>
						<div className={styles.summary}>This Month</div>
					</div>
				</div>
				<div className={styles.reminder_tips}>
					<div className={styles.tips_heading}>Tips</div>
					<ul className={styles.reminder_ul}>
						{TIPS.map((item) => <li><div className={styles.tip}>{item?.label}</div></li>)}
					</ul>
				</div>
			</div>
			<div className={styles.reminder_target}>
				<div className={styles.reminder_circle}>3/25</div>
				<Button
					className={styles.reminder_btn}
					onClick={() => setReminderModal(false)}
				>
					I Understand

				</Button>
			</div>

		</Modal>
	);
}

export default ReminderModal;
