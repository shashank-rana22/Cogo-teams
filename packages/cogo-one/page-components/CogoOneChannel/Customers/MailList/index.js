import { cl } from '@cogoport/components';
import { useState } from 'react';

import OutlookMails from '../../../../common/MailDetails';

import FirebaseEmails from './FirebaseEmails';
import MailSideBar from './MailSideBar';
import styles from './styles.module.css';
import SwitchMail from './SwitchMail';

const COMPONENTS_MAPPING = {
	outlook         : OutlookMails,
	firebase_emails : FirebaseEmails,
};

function MailsList({
	mailProps = {},
	mailsToBeShown = [],
	activeTab = {},
	...rest
}) {
	const {
		setActiveMail = () => {},
		activeMail = {},
		activeMailAddress = '',
	} = mailProps;

	const [activeFolder, setActiveFolder] = useState('inbox');
	const [appliedFilters, setAppliedFilters] = useState(null);

	const ActiveComponent = COMPONENTS_MAPPING?.[activeTab?.tab] || null;

	if (!ActiveComponent) {
		return null;
	}

	return (
		<div className={styles.container}>
			{activeTab?.tab === 'outlook' ? (
				<SwitchMail
					mailsToBeShown={mailsToBeShown}
					mailProps={mailProps}
				/>
			) : null}

			<div className={cl`${styles.list_mails} 
				${activeTab?.tab === 'outlook'
				? styles.switch_mail_present : styles.no_switch_mail}`}
			>
				<MailSideBar
					activeFolder={activeFolder}
					setActiveFolder={setActiveFolder}
					setAppliedFilters={setAppliedFilters}
					activeTab={activeTab?.tab}
				/>

				<ActiveComponent
					{...rest}
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

export default MailsList;
