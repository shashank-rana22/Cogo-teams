import { IcAWhitePapers } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import ACTION_ICON_MAPPING from '../../../../constants/ACTION_ICON_MAPPING';

import styles from './styles.module.css';

function QuickActions({ openNewTab = () => {} }) {
	// const partnerId = useSelector((s) => s?.profile?.partner?.id);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Recently used Quick actions</div>
			<div className={styles.header}>
				<div
					className={styles.recent_icon}
					role="presentation"
					// onClick={() => {
					// 	// eslint-disable-next-line no-undef
					// 	window.open(`/${partnerId}/invoice-approvals`, '_blank');
					// }}
				>
					<IcAWhitePapers width={50} height={50} />
					<div className={styles.name}>Invoicing</div>
				</div>
			</div>
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
								// window.open(`/${partnerId}/${item?.href}`, '_blank');
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
