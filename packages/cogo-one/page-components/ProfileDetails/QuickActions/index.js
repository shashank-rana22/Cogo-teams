import { IcAWhitePapers } from '@cogoport/icons-react';

import ACTION_ICON_MAPPING from '../../../constants/ACTION_ICON_MAPPING';

import styles from './styles.module.css';

function QuickActions() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Recently used Quick actions</div>
			<div className={styles.header}>
				<div className={styles.recent_icon}>
					<IcAWhitePapers width={50} height={50} />
					<div className={styles.name}>Invoicing</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.title}>Quick Actions</div>
				<div className={styles.row}>
					{(ACTION_ICON_MAPPING || []).map((item) => (
						<div className={styles.recent_icon}>
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
