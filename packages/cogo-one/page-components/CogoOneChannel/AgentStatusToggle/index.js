import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import AgentModal from '../AgentModal';

import styles from './styles.module.css';

function AgentStatusToggle() {
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
			/>
		</>
	);
}
export default AgentStatusToggle;
