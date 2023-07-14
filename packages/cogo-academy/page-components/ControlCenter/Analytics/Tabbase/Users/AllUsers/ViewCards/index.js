import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 12 ? `${str.substring(0, 10)}...` : str);
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_content}>
					<div className={styles.right_stat_label}>
						{cardHeading}
					</div>
				</div>
				<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
					<div>
						<div className={styles.sub_heading_context}>
							<Tooltip content={subHeading[0]?.name} placement="right">
								<div>{truncate(subHeading[0]?.name)}</div>
							</Tooltip>
						</div>
						{subHeading[0]?.views}
						{' '}
						Views
						,
						{subHeading[0]?.view_percentage}
						%
					</div>
					<div>
						<div className={styles.sub_heading_context}>
							<Tooltip content={subHeading[1]?.name} placement="right">
								<div>{truncate(subHeading[1]?.name)}</div>
							</Tooltip>

						</div>
						{subHeading[1]?.views}
						{' '}
						Views
						,
						{subHeading[1]?.view_percentage}
						%

					</div>
				</div>

			</div>
		</div>

	);
}

export default ViewCards;
