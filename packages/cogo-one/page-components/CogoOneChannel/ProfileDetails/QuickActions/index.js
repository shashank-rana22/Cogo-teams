import { cl } from '@cogoport/components';

import ACTION_ICON_MAPPING from '../../../../constants/ACTION_ICON_MAPPING';

import styles from './styles.module.css';

function QuickActions({ openNewTab = () => {}, disableQuickActions = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.bottom}>
				<div className={styles.title}>Quick Actions</div>
				<div className={styles.row}>
					{(ACTION_ICON_MAPPING || []).map((item) => (
						<div
							key={item.name}
							className={cl`${styles.recent_icon} ${disableQuickActions ? styles.icon_disabled : ''}`}
							role="presentation"
							onClick={() => openNewTab(item?.redirecting)}
						>
							<div className={styles.icon}>{item?.icon}</div>
							<div className={styles.name}>{item?.title}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default QuickActions;
