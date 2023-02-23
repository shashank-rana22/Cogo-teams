/* eslint-disable no-mixed-spaces-and-tabs */
import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

// eslint-disable-next-line import/named
import { bestPerformanceTabsData, worstPerformanceTabsData } from '../../../../configurations/dummyPerformanceTabsData';
import LoaderPerformance from '../LoaderPerformance';

import styles from './styles.module.css';

function PerformanceTab({ loading = false }) {
	const [activeTab, setActiveTab] = useState('best_performance');
	console.log('loading', loading);
	const data = activeTab === 'best_performance' ? bestPerformanceTabsData : worstPerformanceTabsData;
	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment

		<div className={styles.main_box}>
			<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab} className={styles.tab_custom_style}>
				<TabPanel name="best_performance" title="Best Performance" />
				<TabPanel name="worst_performance" title="Worst Performance" />
			</Tabs>

			<div className={styles.performance_tab_container}>
				{
				loading
					? (
						<LoaderPerformance />
					)
					: (

						<div className={styles.performance_tab_lists}>
							{(data || []).map((item) => {
                	            const { picture, name } = item;
								return (
									<div className={styles.performance_list}>
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

					)
			}

			</div>
		</div>

	);
}

export default PerformanceTab;
