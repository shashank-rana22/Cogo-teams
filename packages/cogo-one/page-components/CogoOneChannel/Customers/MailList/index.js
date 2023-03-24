import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import GmailOption from './GmailOptions';
import styles from './styles.module.css';

function MailList({ setActiveMail = () => {}, activeMail, emailAddress }) {
	const [activeSelect, setActiveSelect] = useState(null);

	const handleClick = (val) => {
		setActiveSelect(val);
	};

	return (
		<div className={styles.container}>
			{!activeSelect ? (
				<GmailOption
					handleClick={handleClick}
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
