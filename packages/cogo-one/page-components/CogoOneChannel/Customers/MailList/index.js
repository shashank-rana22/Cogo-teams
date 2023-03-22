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

	const handleClick = (val) => {
		setActiveSelect(val);
		setShowContent(true);
	};

	return (
		<div className={styles.container}>
			{!showContent ? (
				<>
					{/* <MailOption handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} /> */}
					<GmailOption handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} />
					{/* <CogoportMail handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} /> */}
				</>
			) : (
				<MailDetails
					activeSelect={activeSelect}
					setShowContent={setShowContent}
					setActiveSelect={setActiveSelect}
					setActiveMail={setActiveMail}
					activeMail={activeMail}
				/>
			)}
		</div>
	);
}
export default MailList;
