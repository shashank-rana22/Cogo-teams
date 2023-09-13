import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import RoleWiseFlashAgentChat from '../RoleWiseFlashAgentChat';
import RoleWiseLockScreen from '../RoleWiseLockScreen';

import styles from './styles.module.css';

const TABS_MAPPING = [
	{
		name      : 'lock_configuration',
		title     : 'Lock Configuration',
		component : RoleWiseLockScreen,
	},
	{
		name      : 'claim_chat_configuration',
		title     : 'Claim Chat Configuration',
		component : RoleWiseFlashAgentChat,
	},
];

function FireBaseConfiguration({
	setActiveCard = () => {},
	firestore = {},
	handleClose = () => {},
}) {
	const [activeConfigurationTab, setActiveConfigurationTab] = useState('lock_configuration');

	const COMPONENT_PROPS = {
		lock_configuration: {
			setActiveCard,
			firestore,

		},
		claim_chat_configuration: {
			setActiveCard,
			firestore,
			handleClose,
		},
	};

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeConfigurationTab}
				onChange={setActiveConfigurationTab}
				fullWidth
				className={styles.tab_hide}
				themeType="secondary"
			>
				{TABS_MAPPING.map((tabItem) => {
					const { name, title, component: Component } = tabItem;

					if (!Component) {
						return null;
					}

					return (
						<TabPanel key={name} name={name} title={title}>
							<Component
								key={activeConfigurationTab}
								{...COMPONENT_PROPS[activeConfigurationTab]}
							/>
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default FireBaseConfiguration;
