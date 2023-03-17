import { Tooltip } from '@cogoport/components';
import { IcMDislike, IcMLike, IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ViewCardsList({ state = '', cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${str.substring(0, 26)}...` : str);

	function Icon() {
		if (state === 'Viewed_Question') {
			return <IcMEyeopen style={{ marginTop: '0.15rem' }} />;
		}
		if (state === 'Liked_Question') {
			return <IcMLike style={{ marginTop: '0.15rem' }} />;
		}
		if (state === 'Disliked_Question') {
			return <IcMDislike style={{ marginTop: '0.15rem' }} />;
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
								<div style={{ marginRight: '0.25rem' }}>{item?.view_count}</div>
								{Icon()}
							</div>
						</div>
					);
				})}
			</div>
		</div>

	);
}

export default ViewCardsList;
