import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import AgentStatusToggle from './AgentStatusToggle';
import FlashRevertLogs from './FlashRevertLogs';
import styles from './styles.module.css';

function HeaderBar({
	firestore = {},
	viewType = '',
}) {
	return (
		<div className={styles.container}>
			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.flash_revert_logs && (
				<FlashRevertLogs />
			)}
			{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.toggle_agent_status && (
				<AgentStatusToggle firestore={firestore} />
			)}
		</div>
	);
}

export default HeaderBar;
