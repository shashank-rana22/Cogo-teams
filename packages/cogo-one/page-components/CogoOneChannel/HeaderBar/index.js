import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';

import AgentStatusToggle from './AgentStatusToggle';
import FlashRevertLogs from './FlashRevertLogs';
import styles from './styles.module.css';

function HeaderBar({
	firestore = {},
	viewType = '',
}) {
	const {
		flash_revert_logs = false,
		toggle_agent_status = false,
	} = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions || {};

	return (
		<div className={styles.container}>
			{flash_revert_logs ? (
				<FlashRevertLogs />
			) : null}
			{toggle_agent_status ? (
				<AgentStatusToggle
					firestore={firestore}
				/>
			) : null}
		</div>
	);
}

export default HeaderBar;
