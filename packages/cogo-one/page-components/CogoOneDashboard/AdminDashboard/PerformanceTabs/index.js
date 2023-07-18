// import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

// import { PERFORMANCE_BUTTON_MAPPING } from '../../constants';

import LoaderPerformance from './LoaderPerformance';
import styles from './styles.module.css';

function PerformanceTab({ loading = false, agentsPerformance = {} }) {
	// const { best_performance = [], worst_performance = [] } = agentsPerformance;
	// const [activeTab, setActiveTab] = useState('best_performance');
	// const data = activeTab === 'best_performance' ? best_performance : worst_performance;

	return (
		<div className={styles.main_box}>
			{/* <div className={styles.performance_btn_box}> */}
			{/* {PERFORMANCE_BUTTON_MAPPING.map((item) => (
					<button
						key={item.key}
						className={cl`${styles.performance_btn}
							${activeTab === item.key ? styles.active_box : ''}`}
						onClick={() => setActiveTab(item.key)}
					>
						<div
							className={cl`${styles.performance_label}
							${activeTab === item.key ? styles.active_label : ''}`}
						>
							{item.label}

						</div>
					</button>
				))} */}
			{/* </div> */}

			<div className={styles.performance_tab_container}>
				<div>Leaderboard</div>
				{loading && <LoaderPerformance />}
				{(isEmpty(agentsPerformance)) && !loading
					? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.empty_chart}
							alt="Empty Performance"
							width={150}
							height={150}
							className={styles.empty_performance_picture}
						/>
					)
					: (
						null
						// <div className={styles.performance_tab_lists}>
						// 	{(data || []).map((item) => {
						// 		const { agent_name = '', agents_performance = 0, role } = item;
						// 		return (
						// 			<div className={styles.performance_list} key={agent_name}>
						// 				<div className={styles.picture_name_kam_box}>
						// 					<div className={styles.agent_picture}>
						// 						<Image
						// 							src={GLOBAL_CONSTANTS.image_url.agent_avatar_icon}
						// 							alt="Agent Avatar"
						// 							width={30}
						// 							height={30}
						// 						/>
						// 					</div>
						// 					<div className={styles.agent_name}>{agent_name}</div>

				// 					<Tooltip
				// 						content={<div>{role?.[GLOBAL_CONSTANTS.zeroth_index].name}</div>}
				// 						placement="bottom"
				// 					>
				// 						<div className={styles.job_role}>
				// 							{role?.[GLOBAL_CONSTANTS.zeroth_index].name}
				// 						</div>
				// 					</Tooltip>
				// 				</div>
				// 				<div className={styles.notification_nos}>
				// 					{agents_performance}
				// 				</div>
				// 			</div>
				// 		);
				// 	})}
				// </div>
					)}
			</div>
		</div>
	);
}

export default PerformanceTab;
