import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import getDateParams from '../../../utils/get-date-params';

import Header from './Header';
import KamData from './KamData';
import styles from './styles.module.css';

function Global() {
	const [activeTab, setActiveTab] = useState('this_week');

	const TAB_PANEL_MAPPING = getDateParams();
	return (
		<>
			<Header />
			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', params = {} } = item;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<KamData date_params={params} />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</>
	);
}

export default Global;
