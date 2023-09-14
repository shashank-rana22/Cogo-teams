import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import Call from '../../OutstandingFilter/CallPriorityModal/Call';
import Email from '../../OutstandingFilter/CallPriorityModal/Email';
import Meeting from '../../OutstandingFilter/CallPriorityModal/Meeting';

import styles from './styles.module.css';

const TAB_OPTIONS = [
	{
		key       : 'Email',
		name      : 'Email',
		component : Email,
	},
	{
		key       : 'Call',
		name      : 'Call',
		component : Call,
	},
	{
		key       : 'Meeting',
		name      : 'Meeting',
		component : Meeting,
	},
];

function Communication({ orgData = {} }) {
	const [activeTab, setActiveTab] = useState('Email');

	return (
		<div className={styles.communication_container}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="tertiary"
			>
				{(TAB_OPTIONS).map(
					({ key, name, component: Component }) => (
						<TabPanel key={key} name={key} title={name}>
							{activeTab && (
								<Component
									orgData={orgData}
									communication_type={name === 'Call' ? 'call' : 'meeting'}
								/>
							)}
						</TabPanel>
					),
				)}
			</Tabs>
		</div>
	);
}

export default Communication;
