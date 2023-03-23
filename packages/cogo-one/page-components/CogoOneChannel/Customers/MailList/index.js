// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import GmailOption from './GmailOptions';
import styles from './styles.module.css';

function MailList({ setActiveMail = () => {}, activeMail, emailAddress }) {
	// const { emailAddress } = useSelector(({ profile }) => ({
	// 	emailAddress: profile?.user?.email,
	// }));

	const [activeSelect, setActiveSelect] = useState('');
	const [showContent, setShowContent] = useState(false);
	// const [mailValue, setMailValue] = useState('');

	const handleClick = (val) => {
		setActiveSelect(val);
		// setMailValue(email);
		setShowContent(true);
	};

	return (
		<div className={styles.container}>
			{!showContent ? (
			// <>
			// 	{email.map((item) => (
				<GmailOption
					handleClick={handleClick}
					activeSelect={activeSelect}
					showContent={showContent}
				/>
			// 	))}
			// </>
			) : (
				<MailDetails
					activeSelect={activeSelect}
					setShowContent={setShowContent}
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
