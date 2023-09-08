import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import LeaveStats from './LeaveStats';
import styles from './styles.module.css';

function LeaveStatsApplicationsComponent({ selectedMonth = '', executeScroll = () => {} }) {
	const { month, value } = selectedMonth || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_ctn}>
				<div>
					<div className={styles.header_text1}>{startCase(month)}</div>
					<div className={styles.header_text2}>Insights about your leaves</div>
				</div>
				<div>
					<Button size="md" themeType="tertiary" className={styles.button_styles} onClick={executeScroll}>
						Detailed View
						{' '}
						<IcMArrowNext />
					</Button>
				</div>
			</div>
			<div className={styles.leave_stats_style}>
				<LeaveStats cycle_id={value} />
			</div>
		</div>
	);
}
export default LeaveStatsApplicationsComponent;
