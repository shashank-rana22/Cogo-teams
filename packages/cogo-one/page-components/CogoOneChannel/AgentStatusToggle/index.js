import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import AgentModal from '../AgentModal';

import styles from './styles.module.css';

function AgentStatusToggle() {
	const [showAgentDetails, setShowAgentDetails] = useState(false);

	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setShowAgentDetails(true)}
			/>
			<AgentModal
				showAgentDetails={showAgentDetails}
				setShowAgentDetails={setShowAgentDetails}
			/>
		</>
	);
}
export default AgentStatusToggle;
