import { IcMSettings } from '@cogoport/icons-react';

import ConfigModal from './ConfigModal';
import styles from './styles.module.css';

function AgentConfig({
	firestore = {},
	initialViewType = '',
	viewType = '',
	configurationsToBeShown = [],
	setViewType = () => {},
	activeCard = '',
	setActiveCard = () => {},
}) {
	return (
		<>
			<IcMSettings
				className={styles.settings_icon}
				onClick={() => setActiveCard('config_modal')}
			/>
			<ConfigModal
				key={activeCard}
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
