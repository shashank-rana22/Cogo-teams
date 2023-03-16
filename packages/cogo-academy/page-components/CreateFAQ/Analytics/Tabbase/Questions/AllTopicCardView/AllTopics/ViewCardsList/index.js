import { IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ViewCardsList({ cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${str.substring(0, 26)}...` : str);
	if (!contentQuestion[0]) {
		return (
			<div className={styles.primary_right}>
				<div className={styles.active_users}>
					<div className={styles.right_stat_label}>
						{cardHeading}
					</div>
					<div className={styles.sub_heading} style={{ textAlign: 'center' }}>No Data Available</div>
				</div>
			</div>
		);
	}
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>
				<div className={styles.sub_heading}>
					{(contentQuestion[0])
						? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								1.
								<div style={{ marginLeft: '-9px' }}>
									{truncate(contentQuestion[0]?.question_abstract)}
								</div>
								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '0.25rem' }}>{contentQuestion[0]?.view_count}</div>
									<IcMEyeopen style={{ marginTop: '0.15rem' }} />
								</div>

							</div>
						) : null}

					{(contentQuestion[1])
						? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								2.
								<div style={{ marginLeft: '-9px' }}>

									{truncate(contentQuestion[1]?.question_abstract)}
								</div>
								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '0.25rem' }}>{contentQuestion[1]?.view_count}</div>
									<IcMEyeopen style={{ marginTop: '0.15rem' }} />
								</div>

							</div>
						) : null}
					{(contentQuestion[2])
						? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								2.
								<div style={{ marginLeft: '-9px' }}>

									{truncate(contentQuestion[2]?.question_abstract)}
								</div>
								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '0.25rem' }}>{contentQuestion[2]?.view_count}</div>
									<IcMEyeopen style={{ marginTop: '0.15rem' }} />
								</div>

							</div>
						) : null}
					{(contentQuestion[3])
						? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								2.
								<div style={{ marginLeft: '-9px' }}>

									{truncate(contentQuestion[3]?.question_abstract)}
								</div>
								<div style={{ display: 'flex' }}>
									<div style={{ marginRight: '0.25rem' }}>{contentQuestion[3]?.view_count}</div>
									<IcMEyeopen style={{ marginTop: '0.15rem' }} />
								</div>

							</div>
						) : null}

				</div>

			</div>
		</div>

	);
}

export default ViewCardsList;
