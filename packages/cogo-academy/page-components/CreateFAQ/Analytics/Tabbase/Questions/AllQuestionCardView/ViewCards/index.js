import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 14 ? `${str.substring(0, 12)}...` : str);

	return (
		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_content}>
					{cardHeading}
				</div>

				<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
					<div>
						<div className={styles.sub_heading_context}>
							<Tooltip content={subHeading[0]?.name} placement="right">
								<div>{truncate(subHeading[0]?.display_name || subHeading[0]?.name)}</div>
							</Tooltip>
						</div>
						{subHeading[0]?.view_count ? subHeading[0]?.view_count || 0 : subHeading[0]?.views || 0}
						{' '}
						Views,
						{' '}
						{subHeading[0]?.view_percentage || 0}
						%
					</div>

					<div>
						<div className={styles.sub_heading_context}>
							<Tooltip content={subHeading[1]?.name} placement="right">
								<div>{truncate(subHeading[1]?.display_name || subHeading[1]?.name)}</div>
							</Tooltip>
						</div>
						{subHeading[1]?.view_count ? subHeading[1]?.view_count || 0 : subHeading[1]?.views || 0}
						{' '}
						Views,
						{' '}
						{subHeading[1]?.view_percentage || 0}
						%
					</div>
				</div>
			</div>
		</div>

	);
}

export default ViewCards;
