import { Tabs } from '@cogoport/components';
import React from 'react';

function UserTabs({
	children,
	handleChange,
	activeTab,
	defaultActiveTab,
	suffix,
}) {
	return (
		<div>

			<Tabs
				onChange={handleChange}
				activeTab={activeTab}
				defaultActiveTab={defaultActiveTab}
				suffix={suffix}
			>
				{children}
			</Tabs>

		</div>
	);
}

export default UserTabs;
