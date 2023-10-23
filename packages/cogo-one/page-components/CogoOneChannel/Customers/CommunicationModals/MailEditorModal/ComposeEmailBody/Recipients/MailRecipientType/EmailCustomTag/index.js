import { IcMCross } from '@cogoport/icons-react';

import { EMAIL_TAGS_COLOR } from '../../../../../../../../../constants/mailConstants';
import hideDetails from '../../../../../../../../../utils/hideDetails';

import styles from './styles.module.css';

function EmailCustomTag({
	email = '',
	handleDelete = () => {},
	type = '',
	restrictMailToSingle = false,
}) {
	const {
		bgColor = '#FEF199',
		subDivBgColor = '#FFFCE6',
	} = EMAIL_TAGS_COLOR[type] || {};

	return (
		<div className={styles.email_tag_container}>
			<div
				className={styles.input_container}
				style={{
					background   : bgColor,
					borderRadius : restrictMailToSingle ? '6px' : 'unset',
				}}
			>
				{restrictMailToSingle ? hideDetails({ type: 'mail', data: email }) : email}
			</div>

			{restrictMailToSingle
				? null
				: (
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
