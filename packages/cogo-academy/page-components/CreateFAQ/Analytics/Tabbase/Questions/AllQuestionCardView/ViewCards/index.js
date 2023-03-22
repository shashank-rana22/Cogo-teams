import { Tooltip } from '@cogoport/components';
import startCase from '@cogoport/utils/src/utilities/startCase';

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
							{sidetext(state, subHeading[0])}
						</div>
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

							{sidetext(state, subHeading[1])}

						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default ViewCards;
