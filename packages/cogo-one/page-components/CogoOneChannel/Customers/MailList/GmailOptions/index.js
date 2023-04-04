import { IcMArrowRight } from '@cogoport/icons-react';

import { gmailoptions } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function GmailOption({ setActiveSelect = () => {} }) {
	return (
		<>
			<div className={styles.title}>Outlook</div>
			<div className={styles.gmail_container}>
				{gmailoptions.map(({ label, icon, value }) => (
					<div
						className={styles.content}
						onClick={() => setActiveSelect(value)}
						role="button"
						tabIndex={0}
					>
						<div className={styles.left_div}>
							<div className={styles.icon_div}>{icon}</div>
							<div className={styles.name}>{label}</div>
						</div>
						<div className={styles.right_arrow}><IcMArrowRight fill="#BDBDBD" /></div>
					</div>
				))}
			</div>
		</>
	);
}
export default GmailOption;
