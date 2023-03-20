import { Tooltip } from '@cogoport/components';
import { IcMLike, IcMDislike, IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ViewCardsList({ state = '', cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${str.substring(0, 26)}...` : str);
	function Icon(item) {
		if (state === 'Viewed_Question') {
			return (
				<div style={{ marginRight: '0.25rem' }}>
					{item?.questions_views}
					<IcMEyeopen style={{ marginTop: '0.15rem', marginLeft: '0.1rem' }} />

				</div>

			);
		}
		if (state === 'Liked_Question') {
			return (
				<div style={{ marginRight: '0.25rem' }}>
					{item?.likes}
					<IcMLike style={{ marginTop: '0.15rem', marginLeft: '0.1rem' }} />
				</div>
			);
		}
		if (state === 'Disliked_Question') {
			return (
				<div style={{ marginRight: '0.25rem' }}>
					{item?.dislikes}
					<IcMDislike style={{ marginTop: '0.15rem', marginLeft: '0.1rem' }} />
				</div>

			);
		}
	}

	if ((contentQuestion || []).length === 0) {
		return (
			<div className={styles.primary_right}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>
				<div className={styles.sub_heading} style={{ textAlign: 'center' }}>No Data Available</div>
			</div>
		);
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
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div style={{ margin: '3px 0 0 -8px' }}>
								<Tooltip content={item?.question_abstract} placement="right">
									<div className={styles.question_line}>
										<div style={{ width: 12 }}>
											{index + 1}
											.
										</div>
										{truncate(item?.question_abstract)}
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
