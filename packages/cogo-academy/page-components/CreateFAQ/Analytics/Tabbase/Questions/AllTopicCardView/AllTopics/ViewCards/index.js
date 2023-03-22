// eslint-disable-next-line import/no-unresolved
import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils/src/utilities/startCase';

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
						<Tooltip
							content={subHeading[0]?.audience_name
								|| subHeading[0]?.name
								|| 'No Data Available'}
							placement="right"
						>
							<div>{truncate(subHeading[0]?.audience_name || subHeading[0]?.name || '-')}</div>
						</Tooltip>

					</div>
					{subHeading[0]?.total_views || 0}
					{' '}
					Views,
					{' '}
					{subHeading[0]?.view_percentage || 0}
					%
				</div>

				<div>
					<div className={styles.sub_heading_context}>
						<Tooltip
							content={subHeading[1]?.audience_name
								|| subHeading[1]?.name
								|| 'No Data Available'}
							placement="right"
						>
							<div>{truncate(subHeading[1]?.audience_name || subHeading[1]?.name || '-')}</div>
						</Tooltip>
					</div>
					{subHeading[1]?.total_views || 0}
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
