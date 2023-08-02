import { Avatar, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import { BUTTON_MAPPING } from '../../../constants/mailConstants';
import getUserNameFromEmail from '../../../helpers/getUserNameFromEmail';

import styles from './styles.module.css';

function ReceipientComp({ array = [], label = '' }) {
	if (isEmpty(array)) {
		return null;
	}

	return (
		<div className={styles.receipients}>
			<div className={styles.label}>
				{label}
				:
			</div>
			{array?.map((eachEmail) => {
				const { userName:senderName } = getUserNameFromEmail({ query: eachEmail });
				return (
					<Tooltip
						placement="bottom"
						key={eachEmail}
						content={eachEmail}
						interactive
					>
						<div className={styles.each_receipient}>{senderName}</div>
					</Tooltip>
				);
			})}
		</div>
	);
}

function MailHeader({ eachMessage = {}, setMailActions = () => {}, hasPermissionToEdit = false }) {
	const { response, send_by = '', conversation_type = '' } = eachMessage || {};

	const {
		cc_mails = [],
		bcc_mails = [],
		sender = '',
		to_mails = [],
		received_time = '',
	} = response || {};

	const { userName } = getUserNameFromEmail({ query: sender });

	const senderName = conversation_type === 'sent' ? userName : send_by || userName;

	const RECEIPIENT_MAPPING = [
		{ label: 'To', array: to_mails },
		{ label: 'Cc', array: cc_mails },
		{ label: 'Bcc', array: bcc_mails },
	];

	return (
		<div className={styles.header_flex}>
			<div className={styles.left_container}>
				<Avatar personName={senderName} className={styles.avatar} />
				<div>
					<div className={styles.sender_name}>{startCase(senderName)}</div>
					{RECEIPIENT_MAPPING.map((item) => <ReceipientComp {...item} key={item?.label} />)}
				</div>
			</div>
			<div>
				<div className={styles.icon_flex}>
					{BUTTON_MAPPING.map((item) => {
						const { key, icon:Icon } = item || {};

						if (!Icon || !hasPermissionToEdit) {
							return null;
						}

						return (
							<Icon
								key={key}
								className={styles.icon_styles}
								onClick={() => setMailActions({ actionType: key, data: eachMessage })}
							/>
						);
					})}
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
