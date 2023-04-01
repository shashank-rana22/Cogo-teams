import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function MailLoading() {
	return (
		<div className={styles.content}>
			<div className={styles.recipient_div}>
				<div className={styles.recipient_left}>
					<Placeholder type="circle" radius="30px" margin="0px 8px 0px 0px" />
				</div>
				<div className={styles.recipient_right}>
					<Placeholder height="20px" width="230px" />
				</div>
			</div>
			<div className={styles.message_div}>
				<div className={styles.subject_container}>
					<Placeholder height="12px" width="180px" margin="0px 0px 6px 8px" />
				</div>
				<div className={styles.message_content}>
					<Placeholder height="10px" width="110px" margin="0px 0px 0px 8px" />
				</div>
			</div>
		</div>
	);
}
export default MailLoading;
