import { IcMCross } from '@cogoport/icons-react';

import { EMAIL_TAGS_COLOR } from '../../../constants/mailConstants';

import styles from './styles.module.css';

function EmailCustomTag({
	email = '',
	handleDelete = () => {},
	type = '',
	isDisabled = false,
}) {
	const {
		bgColor = '#FEF199',
		subDivBgColor = '#FFFCE6',
	} = EMAIL_TAGS_COLOR[type] || {};

	return (
		<div className={styles.email_tag_container}>
			<div
				className={styles.input_container}
				style={{ background: bgColor, borderRadius: isDisabled ? '4px' : '6px 0 0 6px' }}
			>
				{email}
			</div>
			{!isDisabled && (
				<div
					className={styles.cross_icon}
					style={{ background: subDivBgColor }}
				>
					<IcMCross
						onClick={() => handleDelete({ val: email, emailType: type })}
					/>
				</div>
			)}
		</div>
	);
}

export default EmailCustomTag;
