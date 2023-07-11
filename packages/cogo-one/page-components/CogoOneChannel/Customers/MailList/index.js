import { Avatar, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import MailSideBar from './MailSideBar';
import styles from './styles.module.css';
import SwitchMail from './SwitchMail';

function MailList(mailprops) {
	const {
		setActiveMail = () => {},
		activeMail,
		activeMailAddress = '',
		viewType = '',
		userEmailAddress = '',
		setActiveMailAddress = () => {},
	} = mailprops;

	const [activeSelect, setActiveSelect] = useState('inbox');
	const [showPopover, setShowPopover] = useState(false);

	const userName = activeMailAddress.split('@')[GLOBAL_CONSTANTS.zeroth_index].replace('.', ' ');

	return (
		<div className={styles.container}>
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
						setShowPopover={setShowPopover}
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

			<div className={styles.list_mails}>
				<MailSideBar
					activeSelect={activeSelect}
					setActiveSelect={setActiveSelect}
				/>

				<MailDetails
					activeSelect={activeSelect}
					setActiveSelect={setActiveSelect}
					setActiveMail={setActiveMail}
					activeMail={activeMail}
					activeMailAddress={activeMailAddress}
				/>
			</div>
		</div>

	);
}

export default MailList;
