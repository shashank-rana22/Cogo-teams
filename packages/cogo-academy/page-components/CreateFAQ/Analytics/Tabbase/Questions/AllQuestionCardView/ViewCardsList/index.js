import { IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ViewCardsList({ cardHeading = '', contentQuestion = '' }) {
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>

				<div className={styles.sub_heading}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>{contentQuestion}</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>45</div>
							<IcMEyeopen style={{ marginTop: '0.15rem' }} />
						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>{contentQuestion}</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>45</div>
							<IcMEyeopen style={{ marginTop: '0.15rem' }} />
						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>{contentQuestion}</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>45</div>
							<IcMEyeopen style={{ marginTop: '0.15rem' }} />
						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>{contentQuestion}</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>45</div>
							<IcMEyeopen style={{ marginTop: '0.15rem' }} />
						</div>

					</div>
				</div>

			</div>
		</div>

	);
}

export default ViewCardsList;
