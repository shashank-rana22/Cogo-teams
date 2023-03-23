import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const VIEW_CARD__PERCENT_MAPPING = {
	viewed   : 'view_percentage',
	liked    : 'like_percentage',
	disliked : 'dislike_percentage',
};

const VIEW_CARD_MAPPING = {
	viewed   : 'view_count',
	liked    : 'total_likes',
	disliked : 'total_dislikes',
};

const VIEW_CARD_TEXT_MAPPING = {
	viewed   : 'Views, ',
	liked    : 'Likes, ',
	disliked : 'Dislikes, ',
};

function ViewCards({ state = '', cardHeading = '', subHeading = [] }) {
	const MAPPING = [subHeading?.[0], subHeading?.[1]];

	const truncate = (str) => (str?.length > 10 ? `${startCase(str.substring(0, 11))}...` : startCase(str));

	function sidetext(value, item) {
		const key = VIEW_CARD__PERCENT_MAPPING[value];
		const token = VIEW_CARD_MAPPING[value];
		return (
			<div>
				{item?.[token] ? item?.[token] || 0 : item?.views || 0}
				{' '}
				{VIEW_CARD_TEXT_MAPPING[value]}
				{' '}
				{item?.[key] || 0}
				%
			</div>
		);
	}

	return (
		<div className={styles.primary_right}>
			<div>
				<div className={styles.right_stat_content}>
					{cardHeading}
				</div>

				<div className={styles.sub_heading}>
					{
						MAPPING.map((element) => {
							const { display_name = '', name = '', topic_name } = element || {};
							const tooltipContent = display_name || name || topic_name || 'No Data Available';

							return (
								<div>
									<div className={styles.sub_heading_context}>
										<Tooltip
											content={tooltipContent}
											placement="right"
										>
											<div>

												{truncate(display_name || name || topic_name || '-')}

											</div>
										</Tooltip>
										{sidetext(state, element)}
									</div>
								</div>
							);
						})
					}

				</div>
			</div>
		</div>

	);
}

export default ViewCards;
