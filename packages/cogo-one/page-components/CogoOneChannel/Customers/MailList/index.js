import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import GmailOption from './GmailOptions';
import styles from './styles.module.css';

function MailList(emailprops) {
	const { setActiveMail = () => {}, activeMail, emailAddress } = emailprops;
	const [activeSelect, setActiveSelect] = useState(null);

	return (
		<div className={styles.container}>
			{!activeSelect ? (
				<GmailOption
					setActiveSelect={setActiveSelect}
				/>
			) : (
				<MailDetails
					activeSelect={activeSelect}
					setActiveSelect={setActiveSelect}
					setActiveMail={setActiveMail}
					activeMail={activeMail}
					senderMail={emailAddress}
				/>
			)}
		</div>
	);
}
export default MailList;
