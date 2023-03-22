import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ViewCardsTags({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 11 ? `${startCase(str.substring(0, 12))}...` : startCase(str));

	return (
		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_content}>
					{cardHeading}
				</div>

				<div className={styles.sub_heading}>
					<div>
						<div className={styles.sub_heading_context}>
							<Tooltip
								content={subHeading[0]?.display_name
								|| subHeading[0]?.name || subHeading[0]?.topic_name
								|| 'No Data Available'}
								placement="right"
							>
								<div>
									{truncate(subHeading[0]?.display_name
									|| subHeading[0]?.name || subHeading[0]?.topic_name || '-')}

								</div>
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
							<Tooltip
								content={subHeading[1]?.display_name
								|| subHeading[1]?.name || subHeading[1]?.topic_name
								|| 'No Data Available'}
								placement="right"
							>

								{truncate(subHeading[1]?.display_name
									|| subHeading[1]?.name || subHeading[1]?.topic_name || '-')}

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

export default ViewCardsTags;
