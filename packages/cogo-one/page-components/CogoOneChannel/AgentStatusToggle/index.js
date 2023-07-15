import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import AgentModal from '../AgentModal';

import styles from './styles.module.css';

function AgentStatusToggle({ firestore }) {
	const [agentDetails, setAgentDetails] = useState(false);

	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setAgentDetails(true)}
			/>
			<AgentModal
				agentDetails={agentDetails}
				setAgentDetails={setAgentDetails}
				firestore={firestore}
			/>
		</>
	);
}
export default AgentStatusToggle;
