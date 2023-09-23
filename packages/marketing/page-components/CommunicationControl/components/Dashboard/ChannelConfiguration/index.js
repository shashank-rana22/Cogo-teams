import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import EmailConfig from './EmailConfig';
import styles from './styles.module.css';
import WhatsappConfig from './WhatsappConfig';

const TABS_MAPPING = [
	{
		label     : 'WhatsApp Config',
		name      : 'whatsapp_config',
		component : WhatsappConfig,
	},
	{
		label     : 'Email Config',
		name      : 'email_config',
		component : EmailConfig,
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
					const Component = item.component;
					return (
						<TabPanel
							name={item.name}
							title={item.label}
							key={item?.id}
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
