import { IcMSettings } from '@cogoport/icons-react';
import { useState } from 'react';

import ConfigModal from './ConfigModal';
import styles from './styles.module.css';

function AgentConfig({
	firestore = {},
	initialViewType = '',
	viewType = '',
	configurationsToBeShown = [],
	setViewType = () => {},
}) {
	const [showAgentDetails, setShowAgentDetails] = useState(false);
	const [activeCard, setActiveCard] = useState('');

	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setShowAgentDetails(true)}
			/>
			<ConfigModal
				key={activeCard}
				showAgentDetails={showAgentDetails}
				setShowAgentDetails={setShowAgentDetails}
				firestore={firestore}
				configurationsToBeShown={configurationsToBeShown}
				initialViewType={initialViewType}
				viewType={viewType}
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setViewType={setViewType}
			/>
		</>
	);
}
export default AgentConfig;
