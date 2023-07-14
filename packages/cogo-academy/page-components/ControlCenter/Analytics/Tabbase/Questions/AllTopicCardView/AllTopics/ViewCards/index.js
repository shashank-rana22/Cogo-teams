import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ViewCards({ cardHeading = '', subHeading = [] }) {
	const truncate = (str) => (str?.length > 12 ? `${startCase(str.substring(0, 10))}...` : startCase(str));

	const MAPPING = [subHeading?.[0], subHeading?.[1]];

	return (
		<div className={styles.primary_right}>
			<div className={styles.right_stat_content}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>
			</div>

			<div className={styles.sub_heading} style={{ color: '#6FA5AB' }}>
				{
					MAPPING.map((element) => {
						const { audience_name = '', name = '', total_views, view_percentage } = element || {};
						const tooltipContent = audience_name || name || 'No Data Available';

						return (
							<div>
								<div className={styles.sub_heading_context}>
									<Tooltip
										content={tooltipContent}
										placement="right"
									>
										<div>{truncate(audience_name || name || '-')}</div>
									</Tooltip>

								</div>
								{total_views || 0}
								{' '}
								Views,
								{' '}
								{view_percentage || 0}
								%
							</div>
						);
					})

				}

			</div>
		</div>

	);
}

export default ViewCards;
