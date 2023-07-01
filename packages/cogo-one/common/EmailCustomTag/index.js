import { IcMCross } from '@cogoport/icons-react';

import EMAIL_TAGS_COLOR from '../../constants/EMAILS_TAGS_COLOR';

import styles from './styles.module.css';

function CustomInput({ email = '', handleDelete = () => {}, type = '' }) {
	const {
		bgColor,
		subDiv,
		crossDiv,
	} = EMAIL_TAGS_COLOR[type];

	return (
		<div className={styles.email_tag_container} key={email}>
			<div className={styles.input_container} style={{ background: bgColor }}>
				{email}
			</div>
			<div className={styles.cross_icon} style={{ background: subDiv }}>
				<IcMCross onClick={() => handleDelete({ val: email, emailType: type })} styles={{ fill: crossDiv }} />
			</div>
		</div>
	);
}
export default CustomInput;
