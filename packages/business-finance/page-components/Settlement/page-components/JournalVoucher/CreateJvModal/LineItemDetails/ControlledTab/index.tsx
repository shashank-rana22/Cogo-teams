import { Tabs, TabPanel } from '@cogoport/components';
import { Controller } from '@cogoport/forms';
import React from 'react';

function TabController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, value: newValue } }) => (
				<Tabs
					{...rest}
					activeTab={newValue}
					themeType="tertiary"
					onChange={onChange}
				>
					<TabPanel name="CREDIT" title="Credit" />
					<TabPanel name="DEBIT" title="Debit" />
				</Tabs>

			)}
		/>
	);
}
export default TabController;
