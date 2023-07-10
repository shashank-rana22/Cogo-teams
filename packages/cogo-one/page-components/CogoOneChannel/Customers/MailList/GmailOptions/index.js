import { Avatar, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import { GMAIL_OPTIONS_CONFIG } from '../../../../../configurations/mail-configuration';

import styles from './styles.module.css';
import SwitchMail from './SwitchMail';

function GmailOption({
	setActiveSelect = () => {},
	viewType = '',
	userEmailAddress = '',
	activeMailAddress = '',
	setActiveMailAddress = () => {},
}) {
	const [showPopover, setShowPopover] = useState(false);

	const userName = activeMailAddress.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ');

	return (
		<div className={styles.mail_container}>
			<div className={styles.title}>
				Outlook
			</div>

			<Tooltip
				interactive
				caret={false}
				placement="bottom"
				visible={showPopover}
				className={styles.styled_popover}
				onClickOutside={() => setShowPopover((prev) => !prev)}
				content={(
					<SwitchMail
						viewType={viewType}
						userEmailAddress={userEmailAddress}
						activeMailAddress={activeMailAddress}
						setActiveMailAddress={setActiveMailAddress}
					/>
				)}
			>
				<div
					role="presentation"
					className={styles.user_mail_address}
					onClick={() => setShowPopover((prev) => !prev)}
				>
					<Avatar
						size="40px"
						personName={userName}
					/>
					<span className={styles.mail_address}>
						{userName}
					</span>
					<IcMArrowRotateDown className={styles.arrow_right} />
				</div>
			</Tooltip>

			<div className={styles.gmail_container}>
				{GMAIL_OPTIONS_CONFIG.map(
					({ label, icon, value }) => (
						<div
							key={value}
							role="presentation"
							className={styles.content}
							onClick={() => setActiveSelect(value)}
						>
							<div className={styles.left_div}>
								<div className={styles.icon_div}>{icon}</div>
								<div className={styles.name}>{label}</div>
							</div>
							<div className={styles.right_arrow}>
								<IcMArrowRight fill="#BDBDBD" />
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
export default GmailOption;
