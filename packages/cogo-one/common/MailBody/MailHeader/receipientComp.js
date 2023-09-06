import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getUserNameFromEmail from '../../../helpers/getUserNameFromEmail';

import styles from './styles.module.css';

const ARRAY_ELEMENT_STEP = 1;
const NO_OF_MAILS_SHOWN = 2;

function PopoverContent({ hiddenMails = [] }) {
	return (
		<div>
			{(hiddenMails || [])?.map(
				(eachEmail, index) => {
					const { userName: senderName } = getUserNameFromEmail({ query: eachEmail });

					return (
						<div
							className={styles.each_receipient}
							key={eachEmail}
						>
							{startCase(senderName)}
							{` <${eachEmail}>`}
							{index !== hiddenMails.length - ARRAY_ELEMENT_STEP ? ', ' : ''}
						</div>
					);
				},
			)}
		</div>
	);
}
function ReceipientComp({ mailsData = [], label = '' }) {
	const shownMails = mailsData?.slice(GLOBAL_CONSTANTS.zeroth_index, NO_OF_MAILS_SHOWN) || [];
	const hiddenMails = mailsData?.slice(NO_OF_MAILS_SHOWN) || [];

	if (isEmpty(mailsData)) {
		return null;
	}

	return (
		<div className={styles.receipients}>
			<div className={styles.label}>
				{label}
				:
			</div>

			{(shownMails || [])?.map(
				(eachEmail, index) => {
					const { userName: senderName } = getUserNameFromEmail({ query: eachEmail });

					return (
						<Tooltip
							placement="bottom"
							key={eachEmail}
							content={eachEmail}
							interactive
							className={styles.tool_tip}
						>
							<div className={styles.each_receipient}>
								{startCase(senderName)}
								{index !== shownMails.length - ARRAY_ELEMENT_STEP ? ', ' : ''}
							</div>
						</Tooltip>
					);
				},
			)}

			{isEmpty(hiddenMails) ? null : (
				<Tooltip
					placement="bottom"
					content={<PopoverContent hiddenMails={hiddenMails} />}
					interactive
					className={styles.tool_tip}
				>
					<div className={styles.each_receipient}>
						{`+${hiddenMails.length} more`}
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export default ReceipientComp;
