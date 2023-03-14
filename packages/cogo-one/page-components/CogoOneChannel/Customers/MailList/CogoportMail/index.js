import { IcMArrowRight } from '@cogoport/icons-react';

import { CogoportOption } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';

function CogoportMail({ handleClick }) {
	return (
		<>
			<div className={styles.title}>Cogoport</div>
			<div className={styles.company_container}>
				{CogoportOption.map(({ label, icon, value }) => (
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
export default CogoportMail;
