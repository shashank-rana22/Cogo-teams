import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import TAB_OPTION_MAPPING from '../../utils/tab_options_mapping';

import styles from './styles.module.css';

function MainData({
	data = {},
	refetchVendorInfo = () => {},
}) {
	const [activeTab, setActiveTab] = useState('profile');
	const options = Object.values(TAB_OPTION_MAPPING);

	return (
		<div className={styles.main}>
			<Tabs
				activeTab={activeTab}
				themeType="primary-vertical"
				onChange={setActiveTab}
				className={styles.main_tab_container}
			>
				{(options || []).map((option) => {
					const { key = '', title = '', containerComponent: ContainerComponent = null } = option;

					if (!ContainerComponent) return null;

					return (
						<TabPanel
							name={key}
							key={key}
							title={title}
						>
							<ContainerComponent
								data={data}
								refetchVendorInfo={refetchVendorInfo}
							/>
						</TabPanel>
					);
				})}

			</Tabs>
		</div>
	);
}

export default MainData;
