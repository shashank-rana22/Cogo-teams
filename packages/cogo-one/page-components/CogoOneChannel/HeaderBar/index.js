import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import AgentStatusToggle from './AgentStatusToggle';
import styles from './styles.module.css';

function HeaderBar({
	firestore = {},
	viewType = '',
}) {
	return VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.toggle_agent_status && (
		<div className={styles.settings_icon}>
			<AgentStatusToggle firestore={firestore} />
		</div>
	);
}

export default HeaderBar;
