import { IcMCross } from '@cogoport/icons-react';

import { EMAIL_TAGS_COLOR } from '../../../constants/mailConstants';

import styles from './styles.module.css';

function EmailCustomTag({
	email = '',
	handleDelete = () => {},
	type = '',
}) {
	const {
		bgColor = '#FEF199',
		subDivBgColor = '#FFFCE6',
	} = EMAIL_TAGS_COLOR?.[type] || {};

	return (
		<div className={styles.email_tag_container}>
			<div
				className={styles.input_container}
				style={{ background: bgColor }}
			>
				{email}
			</div>
			<div
				className={styles.cross_icon}
				style={{ background: subDivBgColor }}
			>
				<IcMCross
					onClick={() => handleDelete({ val: email, emailType: type })}
				/>
			</div>
		</div>
	);
}

export default EmailCustomTag;
