/* eslint-disable no-mixed-spaces-and-tabs */
import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

// eslint-disable-next-line import/named
import { bestPerformanceTabsData, worstPerformanceTabsData } from '../../../configurations/dummyPerformanceTabsData';

import styles from './styles.module.css';

function PerformanceTab() {
	const [activeTab, setActiveTab] = useState('best_performance');
	const data = activeTab === 'best_performance' ? bestPerformanceTabsData : worstPerformanceTabsData;
	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment

		<div>
			<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
				<TabPanel name="best_performance" title="Best Performance" />
				<TabPanel name="worst_performance" title="Worst Performance" />
			</Tabs>
			<div className={styles.performance_tab_container}>
				<div className={styles.performance_tab_lists}>
					{(data || []).map((item) => {
                	            const { picture, name } = item;
						return (
							<div className={styles.list}>
								<div className={styles.picture_name_kam_box}>
									<div className={styles.picture}>{picture}</div>
									<div className={styles.name}>{name}</div>
									<div className={styles.kam}>kam</div>
								</div>
								<div className={styles.notification_nos}>
									{' '}

								</div>
							</div>
						);
	   				})}
				</div>
			</div>
		</div>

	);
}

export default PerformanceTab;
