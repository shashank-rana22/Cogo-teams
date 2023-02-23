import ACTION_ICON_MAPPING from '../../../../constants/ACTION_ICON_MAPPING';

import styles from './styles.module.css';

function QuickActions({ openNewTab = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.bottom}>
				<div className={styles.title}>Quick Actions</div>
				<div className={styles.row}>
					{(ACTION_ICON_MAPPING || []).map((item) => (
						<div
							key={item.name}
							className={styles.recent_icon}
							role="presentation"
							onClick={() => {
								// eslint-disable-next-line no-undef
								openNewTab(item?.redirecting);
							}}
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
