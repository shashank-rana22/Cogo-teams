import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import AgentModal from './AgentModal';
import styles from './styles.module.css';

function AgentStatusToggle({
	firestore = {},
	viewType = '',
	configurationsToBeShown = [],
}) {
	const [showAgentDetails, setShowAgentDetails] = useState(false);
	const [activeCard, setActiveCard] = useState('');

	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setShowAgentDetails(true)}
			/>
			<AgentModal
				key={activeCard}
				showAgentDetails={showAgentDetails}
				setShowAgentDetails={setShowAgentDetails}
				firestore={firestore}
				configurationsToBeShown={configurationsToBeShown}
				viewType={viewType}
				setActiveCard={setActiveCard}
				activeCard={activeCard}
			/>
		</>
	);
}
export default AgentStatusToggle;
