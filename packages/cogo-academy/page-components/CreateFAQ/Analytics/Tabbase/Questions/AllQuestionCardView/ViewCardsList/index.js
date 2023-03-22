import { Tooltip } from '@cogoport/components';
import { IcMDislike, IcMLike, IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const VIEW_CARD_MAPPING = {
	viewed_question   : 'view_count',
	liked_question    : 'upvote_count',
	disliked_question : 'downvote_count',
};

function ViewCardsList({ state = '', cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${startCase(str.substring(0, 26))}...` : startCase(str));

	const VIEW_CARD_ICON_MAPPING = {
		viewed_question   : <IcMEyeopen style={{ marginTop: '0.15rem', marginLeft: '0.2rem' }} />,
		liked_question    : <IcMLike style={{ marginTop: '0.15rem', marginLeft: '0.2rem' }} />,
		disliked_question : <IcMDislike style={{ marginTop: '0.15rem', marginLeft: '0.2rem' }} />,
	};

	function icon(value, item) {
		const key = VIEW_CARD_MAPPING[value];
		return (
			<div style={{ marginRight: '0.25rem', display: 'flex' }}>
				{item?.[key] || 0}
				<div>{VIEW_CARD_ICON_MAPPING[value]}</div>
			</div>

		);
	}

	function null_handle(value) {
		const key = VIEW_CARD_MAPPING[value];

		if (!contentQuestion[0]?.question_abstract || contentQuestion[0]?.[key] === 0) {
			return <div style={{ textAlign: 'center', paddingBottom: '66px' }}>No Data Available</div>;
		}

		return (
			<div>
				{(contentQuestion || []).map((item, index) => {
					if (index > 3 || item?.[key] === 0) return null;
					return (
						<div className={styles.quest}>
							<div className={styles.margin}>
								<Tooltip content={item?.question_abstract} placement="right">
									<div className={styles.question_line}>
										<div style={{ width: 12 }}>
											{index + 1}
											.
										</div>
										{truncate(item?.question_abstract || '-')}
									</div>
								</Tooltip>
							</div>

							<div style={{ display: 'flex' }}>
								{icon(value, item)}
							</div>
						</div>
					);
				})}

			</div>

		);
	}
	return (
		<div className={styles.primary_right}>
			<div className={styles.right_stat_label}>
				{cardHeading}
			</div>

			<div className={styles.sub_heading}>
				{null_handle(state)}
			</div>
		</div>

	);
}

export default ViewCardsList;
