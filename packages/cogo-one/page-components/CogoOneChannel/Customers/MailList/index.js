/* eslint-disable max-len */
import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

// import CogoportMail from './CogoportMail';
import GmailOption from './GmailOptions';
// import MailOption from './MailBoxes';
import styles from './styles.module.css';

function MailList({ setActiveMail = () => {}, activeMail }) {
	const [activeSelect, setActiveSelect] = useState('');
	const [showContent, setShowContent] = useState(false);
	const [mailValue, setMailValue] = useState('');

	const handleClick = (val, email) => {
		setActiveSelect(val);
		setMailValue(email);
		setShowContent(true);
	};

	// const MAIL_MAPPING = {

	// }
	const email = ['dinesh@c.com', 'rh@c.com'];
	return (
		<div className={styles.container}>
			{!showContent ? (
				<>
					{email.map((item) => (
						<GmailOption
							handleClick={handleClick}
							activeSelect={activeSelect}
							showContent={showContent}
							email={item}
						/>
					))}
				</>
			) : (
				<MailDetails
					activeSelect={activeSelect}
					setShowContent={setShowContent}
					setActiveSelect={setActiveSelect}
					setActiveMail={setActiveMail}
					activeMail={activeMail}
					senderMail={mailValue}
				/>
			)}
		</div>
	);
}
export default MailList;
