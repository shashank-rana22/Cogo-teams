import { IcMArrowRight } from '@cogoport/icons-react';

import { MailOptions } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function MailOption({ handleClick }) {
	return (
		<div>
			<div className={styles.title}>Mailboxes</div>
			<div className={styles.mail_box_container}>
				{MailOptions.map(({ label, icon, value }) => (
					<div className={styles.content} onClick={() => handleClick(value)} role="presentation">
						<div className={styles.left_div}>
							<div className={styles.icon_div}>{icon}</div>
							<div className={styles.name}>{label}</div>
						</div>
						<div className={styles.right_arrow}><IcMArrowRight fill="#BDBDBD" /></div>
					</div>
				))}
			</div>
		</div>
	);
}
export default MailOption;
