import { Avatar, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getUserNameFromEmail from '../../../../../helpers/getUserNameFromEmail';

import ChangeMail from './changeMail';
import styles from './styles.module.css';

function SwitchMail({
	mailProps = {},
	mailsToBeShown = [],
}) {
	const {
		setActiveMail = () => {},
		activeMailAddress = '',
		setActiveMailAddress = () => {},
	} = mailProps;
	const [showPopover, setShowPopover] = useState(false);

	const { shortName, userName } = getUserNameFromEmail({ query: activeMailAddress });

	return (
		<Tooltip
			interactive
			caret={false}
			placement="bottom"
			visible={showPopover}
			className={styles.styled_popover}
			onClickOutside={() => setShowPopover((prev) => !prev)}
			content={(
				<ChangeMail
					setActiveMail={setActiveMail}
					setShowPopover={setShowPopover}
					activeMailAddress={activeMailAddress}
					setActiveMailAddress={setActiveMailAddress}
					mailsToBeShown={mailsToBeShown}
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
					personName={shortName}
				/>
				<span className={styles.mail_address_name}>
					{userName}
				</span>
				<IcMArrowRotateDown className={styles.arrow_right} />
			</div>
		</Tooltip>
	);
}

export default SwitchMail;
