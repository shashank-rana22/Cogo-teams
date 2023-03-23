import { IcMArrowRight } from '@cogoport/icons-react';

import { Gmailoptions } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function GmailOption({ handleClick = () => {} }) {
	return (
		<>
			<div className={styles.title}>Gmail</div>
			<div className={styles.gmail_container}>
				{Gmailoptions.map(({ label, icon, value }) => (
					<div className={styles.content} onClick={() => handleClick(value)} role="presentation">
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
