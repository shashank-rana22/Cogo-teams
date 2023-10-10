import { Tabs, TabPanel } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

const TABS_MAPPING = [
	{
		label     : 'WhatsApp Config',
		name      : 'whatsapp_config',
		component : dynamic(() => import('./WhatsappConfig'), {
			ssr     : false,
			loading : () => <div>Loading WhatsappConfig...</div>,
		}),
	},
	{
		label     : 'Email Config',
		name      : 'email_config',
		component : dynamic(() => import('./EmailConfig'), {
			ssr     : false,
			loading : () => <div>Loading EmailConfig...</div>,
		}),
	},
];

function ChannelConfiguration() {
	const [activeTab, setActiveTab] = useState('whatsapp_config');
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{TABS_MAPPING.map((item) => {
					const { label, name, component:Component } = item;
					return (
						<TabPanel
							name={name}
							title={label}
							key={name}
						>
							<Component />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}
export default ChannelConfiguration;
