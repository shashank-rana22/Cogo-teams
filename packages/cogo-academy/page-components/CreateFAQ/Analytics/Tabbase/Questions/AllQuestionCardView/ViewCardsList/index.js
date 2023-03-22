import { Tooltip } from '@cogoport/components';
import { IcMDislike, IcMLike, IcMEyeopen } from '@cogoport/icons-react';
import startCase from '@cogoport/utils/src/utilities/startCase';

import styles from './styles.module.css';

function ViewCardsList({ state = '', cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${startCase(str.substring(0, 26))}...` : startCase(str));
	function Icon(item) {
		if (state === 'Viewed_Question') {
			return (
				<div style={{ marginRight: '0.25rem' }}>
					{item?.view_count || 0}
					<IcMEyeopen style={{ marginTop: '0.15rem', marginLeft: '0.25rem', paddingTop: '1px' }} />
				</div>
			);
		}
		if (state === 'Liked_Question') {
			return (
				<div style={{ marginRight: '0.25rem' }}>
					{item?.upvote_count || 0}
					<IcMLike style={{ marginTop: '0.15rem', marginLeft: '0.2rem' }} />
				</div>
			);
		}
		if (state === 'Disliked_Question') {
			return (
				<div style={{ marginRight: '0.25rem', display: 'flex' }}>
					{item?.downvote_count || 0}
					<div><IcMDislike style={{ marginTop: '0.15rem', marginLeft: '0.2rem' }} /></div>
				</div>
			);
		}
	}

	return (
		<div className={styles.primary_right}>
			<div className={styles.right_stat_label}>
				{cardHeading}
			</div>

			<div className={styles.sub_heading}>
				{(contentQuestion || []).map((item, index) => {
					if (index > 3) return null;
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
								{Icon(item)}
							</div>
						</div>
					);
				})}
			</div>
		</div>

	);
}

export default ViewCardsList;
