import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import RoleWiseFlashAgentChat from '../RoleWiseFlashAgentChat';
import RoleWiseLockScreen from '../RoleWiseLockScreen';

import styles from './styles.module.css';

function FireBaseConfiguration({
	setActiveCard = () => {},
	firestore = {},
}) {
	const [activeConfigurationTab, setActiveConfigurationTab] = useState('lock_configuration');

	const TABS_MAPPING = [
		{
			name      : 'lock_configuration',
			title     : 'Lock Configuration',
			component : RoleWiseLockScreen,
			props     : {
				setActiveCard,
				firestore,
			},
		},
		{
			name      : 'flash_agent_chats',
			title     : 'Flash Agent Chats',
			component : RoleWiseFlashAgentChat,
			props     : {
				setActiveCard,
				firestore,
			},
		},
	];

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeConfigurationTab}
				onChange={setActiveConfigurationTab}
				fullWidth
				className={styles.tab_hide}
				themeType="main_tabs"
			>
				{TABS_MAPPING.map((tabItem) => {
					const { name, title, component: Component, props } = tabItem;

					return (
						<TabPanel key={name} name={name} title={title}>
							<Component {...props} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default FireBaseConfiguration;
