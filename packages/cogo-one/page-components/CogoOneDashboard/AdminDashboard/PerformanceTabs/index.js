/* eslint-disable no-mixed-spaces-and-tabs */
import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

// eslint-disable-next-line import/named
import { performanceBtnMapping } from '../../configurations/dashboard';
import { emptyPerformance, agentAvatar } from '../../constants';

import LoaderPerformance from './LoaderPerformance';
import styles from './styles.module.css';

function PerformanceTab({ loading = false, agentsPerformance = {} }) {
	const { best_performance = [], worst_performance = [] } = agentsPerformance;
	const [activeTab, setActiveTab] = useState('best_performance');
	const data = activeTab === 'best_performance' ? best_performance : worst_performance;

	return (
		<div className={styles.main_box}>
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
				{(isEmpty(agentsPerformance?.[activeTab])) && !loading
					? (
						<img
							src={emptyPerformance}
							alt="Empty Performance"
							width="150px"
							height="150px"
							className={styles.empty_performance_picture}
						/>
					)
					: (
						<div className={styles.performance_tab_lists}>
							{(data || []).map((item) => {
                	            const { agent_name = '', agents_performance = 0, role } = item;
								return (
									<div className={styles.performance_list}>
										<div className={styles.picture_name_kam_box}>
											<div className={styles.agent_picture}>
												<img src={agentAvatar} alt="Agent Avatar" />
											</div>
											<div className={styles.agent_name}>{agent_name}</div>

											<Tooltip
												content={<div>{role?.[0].name}</div>}
												placement="bottom"
											>
												<div className={styles.job_role}>{role?.[0].name}</div>
											</Tooltip>
										</div>
										<div className={styles.notification_nos}>
											{agents_performance}
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
