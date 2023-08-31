import { Avatar, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import MailDetails from '../../../../common/CommonMailModules/MailDetails';
import getUserNameFromEmail from '../../../../helpers/getUserNameFromEmail';

import MailSideBar from './MailSideBar';
import styles from './styles.module.css';
import SwitchMail from './SwitchMail';

function OutlookList(mailprops) {
	const {
		setActiveMail = () => {},
		activeMail = {},
		activeMailAddress = '',
		viewType = '',
		userEmailAddress = '',
		setActiveMailAddress = () => {},
	} = mailprops;

	const [activeFolder, setActiveFolder] = useState('inbox');
	const [appliedFilters, setAppliedFilters] = useState(null);
	const [showPopover, setShowPopover] = useState(false);

	const { shortName, userName } = getUserNameFromEmail({ query: activeMailAddress });

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
						setActiveMail={setActiveMail}
						setShowPopover={setShowPopover}
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
						personName={shortName}
					/>
					<span className={styles.mail_address}>
						{userName}
					</span>
					<IcMArrowRotateDown className={styles.arrow_right} />
				</div>
			</Tooltip>

			<div className={styles.list_mails}>
				<MailSideBar
					activeFolder={activeFolder}
					setActiveFolder={setActiveFolder}
					setAppliedFilters={setAppliedFilters}
				/>

				<MailDetails
					activeFolder={activeFolder}
					setActiveMail={setActiveMail}
					activeMail={activeMail}
					activeMailAddress={activeMailAddress}
					appliedFilters={appliedFilters}
					setAppliedFilters={setAppliedFilters}
				/>
			</div>
		</div>
	);
}

export default OutlookList;
