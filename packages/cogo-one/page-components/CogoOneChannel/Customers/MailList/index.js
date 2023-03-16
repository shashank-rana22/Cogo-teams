import { Button } from '@cogoport/components';
import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import CogoportMail from './CogoportMail';
import GmailOption from './GmailOptions';
import MailOption from './MailBoxes';
import MailModal from './MailModal';
import styles from './styles.module.css';

function MailList({ setActiveMail = () => {} }) {
	const [activeSelect, setActiveSelect] = useState('');
	const [showContent, setShowContent] = useState(false);
	const [showMailModal, setShowMailModal] = useState(false);

	const handleClick = (val) => {
		setActiveSelect(val);
		setShowContent(true);
	};

	return (
		<div className={styles.container}>
			{!showContent ? (
				<>
					<MailOption handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} />
					<GmailOption handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} />
					<CogoportMail handleClick={handleClick} activeSelect={activeSelect} showContent={showContent} />
					<div className={styles.button_div}>
						<Button size="md" themeType="primary" onClick={() => setShowMailModal(true)}>+</Button>
					</div>
				</>
			) : (
				<MailDetails
					activeSelect={activeSelect}
					setShowContent={setShowContent}
					setActiveSelect={setActiveSelect}
					setActiveMail={setActiveMail}
				/>
			)}

			{showMailModal && (
				<MailModal
					showMailModal={showMailModal}
					setShowMailModal={setShowMailModal}
				/>
			)}
		</div>
	);
}
export default MailList;
