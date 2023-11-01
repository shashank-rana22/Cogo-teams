import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import getUserNameFromEmail from '../../../helpers/getUserNameFromEmail';

import ReceipientComp from './receipientComp';
import RightButtonsMapping from './RightButtonsMapping';
import styles from './styles.module.css';

function MailHeader({
	eachMessage = {},
	handleClick = () => {},
	handleExpandClick = () => {},
	hasPermissionToEdit = false,
	isDraft = false,
	emailStatus = '',
	loading = false,
}) {
	const {
		response, send_by = '',
		conversation_type = '', last_draft_saved_on = '',
		communication_id = '',
	} = eachMessage || {};

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

	const lastDraftDate = typeof last_draft_saved_on === 'number' ? new Date(last_draft_saved_on) : null;

	const rightTime = isDraft
		? lastDraftDate
		: received_time;

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
						{' '}
						{isDraft ? <span>[DRAFT]</span> : null}
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
				{hasPermissionToEdit ? (
					<div className={styles.icon_flex}>
						<RightButtonsMapping
							isDraft={isDraft}
							handleClick={handleClick}
							emailStatus={emailStatus}
							isDraftAlreadySent={!!communication_id}
							loading={loading}
						/>
					</div>
				) : null}

				<div className={styles.time_stamp}>
					{isDraft ? <span>Saved: </span> : null}
					{formatDate({
						date       : rightTime,
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
