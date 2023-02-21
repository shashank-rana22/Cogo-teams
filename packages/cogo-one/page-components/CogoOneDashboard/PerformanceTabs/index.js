/* eslint-disable no-mixed-spaces-and-tabs */
import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

// eslint-disable-next-line import/named
import { bestPerformanceTabsData, worstPerformanceTabsData } from '../../../configurations/dummyPerformanceTabsData';

import styles from './styles.module.css';

function PerformanceTab() {
	const [activeTab, setActiveTab] = useState('local_rates');
	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<div style={{ margin: '20px 0px' }}>
				<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
					<TabPanel name="best_performance" title="Best Performance">
						<div className={styles.performance_tab_container}>
							<div className={styles.performance_tab_lists}>
								{bestPerformanceTabsData.map((item) => {
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
					</TabPanel>

					<TabPanel name="worst_performance" title="Worst Performance">
						<div className={styles.performance_tab_container}>
							<div className={styles.performance_tab_lists}>
								{worstPerformanceTabsData.map((item) => {
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
					</TabPanel>
				</Tabs>
			</div>
		</>
	);
}

export default PerformanceTab;
