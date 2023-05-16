import { Tabs, TabPanel } from '@cogoport/components';
import { Controller } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

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
				<div className={styles.tabcontainer}>
					<Tabs
						{...rest}
						activeTab={newValue}
						themeType="primary"
						onChange={onChange}
					>
						<TabPanel name="debit" title="Debit" />
						<TabPanel name="credit" title="Credit" />
					</Tabs>
				</div>

			)}
		/>
	);
}
export default TabController;
