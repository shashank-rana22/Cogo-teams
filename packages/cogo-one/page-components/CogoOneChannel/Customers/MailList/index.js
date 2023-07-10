import { useState } from 'react';

import MailDetails from '../../../../common/MailDetails';

import GmailOption from './GmailOptions';
import styles from './styles.module.css';

function MailList(mailprops) {
	const {
		setActiveMail = () => {},
		activeMail,
		activeMailAddress = '',
	} = mailprops;
	const [activeSelect, setActiveSelect] = useState(null);

	if (!activeSelect) {
		return (
			<div className={styles.container}>
				<GmailOption
					{...mailprops}
					setActiveSelect={setActiveSelect}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<MailDetails
				activeSelect={activeSelect}
				setActiveSelect={setActiveSelect}
				setActiveMail={setActiveMail}
				activeMail={activeMail}
				activeMailAddress={activeMailAddress}
			/>

		</div>
	);
}

export default MailList;
