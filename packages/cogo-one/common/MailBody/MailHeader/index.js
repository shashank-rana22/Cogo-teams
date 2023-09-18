import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { BUTTON_MAPPING } from '../../../constants/mailConstants';
import getUserNameFromEmail from '../../../helpers/getUserNameFromEmail';

import ReceipientComp from './receipientComp';
import styles from './styles.module.css';

function MailHeader({
	eachMessage = {},
	handleClick = () => {},
	handleExpandClick = () => {},
	hasPermissionToEdit = false,
}) {
	const { response, send_by = '', conversation_type = '' } = eachMessage || {};

	const {
		cc_mails = [],
		bcc_mails = [],
		sender = '',
		to_mails = [],
		received_time = '',
	} = response || {};

	const { userName } = getUserNameFromEmail({ query: sender });

	const senderName = conversation_type === 'sent' ? userName : (send_by || userName);

	const RECEIPIENT_MAPPING = [
		{ label: 'To', mailsData: to_mails },
		{ label: 'Cc', mailsData: cc_mails },
		{ label: 'Bcc', mailsData: bcc_mails },
	];

	return (
		<div
			className={styles.header_flex}
			onClick={handleExpandClick}
			role="presentation"
		>
			<div className={styles.left_container}>
				<Avatar
					personName={senderName}
					className={styles.avatar}
				/>

				<div>
					<div className={styles.sender_name}>
						{startCase(senderName)}
					</div>

					{RECEIPIENT_MAPPING.map((item) => (
						<ReceipientComp
							{...item}
							key={item.label}
						/>
					))}
				</div>
			</div>

			<div>
				<div className={styles.icon_flex}>
					{BUTTON_MAPPING.map(
						(item) => {
							const { key = '', icon = '' } = item || {};

							if (!icon || !hasPermissionToEdit) {
								return null;
							}

							return (
								<div
									role="presentation"
									key={key}
									className={styles.icon_styles}
									onClick={(e) => {
										e.stopPropagation();
										handleClick(key);
									}}
								>
									{icon}
								</div>

							);
						},
					)}
				</div>

				<div className={styles.time_stamp}>
					{formatDate({
						date       : received_time,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' | ',
					})}
				</div>
			</div>
		</div>
	);
}

export default MailHeader;
