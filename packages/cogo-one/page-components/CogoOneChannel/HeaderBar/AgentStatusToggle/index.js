import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import AgentModal from './AgentModal';
import styles from './styles.module.css';

function AgentStatusToggle({ firestore = {} }) {
	const [showAgentDetails, setShowAgentDetails] = useState(false);

	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setShowAgentDetails(true)}
			/>
			{showAgentDetails && (
				<AgentModal
					showAgentDetails={showAgentDetails}
					setShowAgentDetails={setShowAgentDetails}
					firestore={firestore}
				/>
			)}
		</>
	);
}
export default AgentStatusToggle;
