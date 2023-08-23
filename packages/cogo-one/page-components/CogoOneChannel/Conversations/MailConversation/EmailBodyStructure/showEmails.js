import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const NO_OF_MAILS_TO_BE_SHOWN = 3;
const INDEX_STEP = 1;

function TooltipContainer({ popoverMails = [] }) {
	return (
		<div className={styles.popover_mails_text}>
			{(popoverMails || [])?.map(
				(itm, index) => (
					<div
						key={itm}
						className={styles.email_element}
					>
						{itm}
						{index !== (popoverMails || []).length - INDEX_STEP
							? ','
							: ''}
					</div>
				),
			)}
		</div>
	);
}

function ShowEmails({ emailsData = [] }) {
	const toBeShownEmails = emailsData?.slice(
		GLOBAL_CONSTANTS.zeroth_index,
		NO_OF_MAILS_TO_BE_SHOWN,
	) || [];

	const popoverMails = emailsData?.slice(NO_OF_MAILS_TO_BE_SHOWN) || [];

	return (
		<div className={styles.name_div}>
			{toBeShownEmails?.join(', ')}

			{popoverMails?.length
				? (
					<Tooltip
						placement="bottom"
						interactive
						className={styles.tooltip_container}
						content={(
							<TooltipContainer
								popoverMails={popoverMails}
							/>
						)}
					>
						<div className={styles.more_text}>
							+
							{popoverMails?.length}
							{' '}
							more
						</div>
					</Tooltip>
				) : null}
		</div>
	);
}

export default ShowEmails;
