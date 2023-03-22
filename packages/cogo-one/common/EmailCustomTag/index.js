import { cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import EMAIL_TAGS_COLOR from '../../constants/EMAILS_TAGS_COLOR';

import styles from './styles.module.css';

function CustomInput({ email = '', handleDelete = () => {}, type, checkType }) {
	const {
		mainDiv,
		subDiv,
		crossDiv,
	} = EMAIL_TAGS_COLOR[type];

	return (
		<div className={styles.email_tag_container} key={email}>
			<div className={styles.input_container} style={{ background: mainDiv }}>
				<div className={styles.input_value}>{email}</div>
			</div>
			<div className={cl`${checkType ? styles.disable_icon : styles.cross_icon}`} style={{ background: subDiv }}>
				<IcMCross onClick={() => handleDelete(email, type)} styles={{ fill: crossDiv }} />
			</div>
		</div>
	);
}
export default CustomInput;
