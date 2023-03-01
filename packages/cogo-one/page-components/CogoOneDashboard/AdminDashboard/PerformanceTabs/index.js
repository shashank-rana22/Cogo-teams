/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
// import { Tabs, TabPanel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { configurationData } from '../../../../configurations/configurationData';
// eslint-disable-next-line import/named
// import { bestPerformanceTabsData, worstPerformanceTabsData } from '../../../../configurations/dummyPerformanceTabsData';
import { emptyPerformance } from '../../constants';
import LoaderPerformance from '../LoaderPerformance';

import styles from './styles.module.css';

function PerformanceTab({ loading = false }) {
	const { agents_performance: configAgentPerformance } = configurationData;
	// const { best_performance = [], worst_performance = [] } = agentsPerformance;

	const [activeTab, setActiveTab] = useState('best_performance');
	// const data = activeTab === 'best_performance' ? best_performance : worst_performance;

	const performanceBtnMapping = [
		{
			key   : 'best_performance',
			label : 'Best Performance',
		},
		{
			key   : 'worst_performance',
			label : 'Worst Performance',
		},

	];

	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment

		<div className={styles.main_box}>
			{/* <Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
				<TabPanel name="best_performance" title="Best Performance" />
				<TabPanel name="worst_performance" title="Worst Performance" />
			</Tabs> */}

			<div className={styles.performance_btn_box}>
				{performanceBtnMapping.map((item) => (
					<button
						className={`${styles.performance_btn} 
							${activeTab === item.key ? styles.active_box : ''}`}
						onClick={() => setActiveTab(item.key)}
					>
						<div
							className={`${styles.performance_label} 
							${activeTab === item.key ? styles.active_label : ''}`}
						>
							{item.label}

						</div>
					</button>
				))}
			</div>

			<div className={styles.performance_tab_container}>
				{loading && <LoaderPerformance />}
				{(isEmpty(configAgentPerformance)) && !loading
					? <img src={emptyPerformance} alt="" width="300px" height="250px" />
					: (
						<div className={styles.performance_tab_lists}>
							{Object.keys(configAgentPerformance || {}).map((item) => {
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
					)}
			</div>
		</div>

	);
}

export default PerformanceTab;
