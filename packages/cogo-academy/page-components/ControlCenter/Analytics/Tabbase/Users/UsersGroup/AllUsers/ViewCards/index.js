import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 12 ? `${startCase(str.substring(0, 10))}...` : startCase(str));

	return (
		<div className={styles.primary_right}>
			<div className={styles.right_stat_content}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>
			</div>

			<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
				<div>
					<div className={styles.sub_heading_context}>
						<Tooltip content={subHeading[0]?.topic_name || 'No Data Available'} placement="right">
							<div>{truncate(subHeading[0]?.topic_name) || '-'}</div>
						</Tooltip>
					</div>
					{subHeading[0]?.topic_views || 0}
					{' '}
					Views,
					{' '}
					{subHeading[0]?.view_percentage || 0}
					%
				</div>

				<div>
					<div className={styles.sub_heading_context}>
						<Tooltip content={subHeading[1]?.topic_name || 'No Data Available'} placement="right">
							<div>{truncate(subHeading[1]?.topic_name) || '-'}</div>
						</Tooltip>
					</div>
					{subHeading[1]?.topic_views || 0}
					{' '}
					Views,
					{' '}
					{subHeading[1]?.view_percentage || 0}
					%
				</div>
			</div>
		</div>

	);
}

export default ViewCards;
