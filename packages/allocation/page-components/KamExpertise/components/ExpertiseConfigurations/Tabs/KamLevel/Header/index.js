import { Placeholder } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header(props) {
	const { audit_data, levelLoading } = props;

	if (levelLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.config_basic_details}>
					<div className={styles.draft_name}>
						<div style={{ marginRight: '8px' }}>
							Currently Editing :
							{' '}
						</div>
						<Placeholder height="20px" width="120px" />

					</div>

					<div className={styles.lower_details}>
						<div className={styles.lower_info} style={{ marginRight: '8px' }}>

							<div>
								Last Modified
								{' '}
								:
							</div>

							<span>
								<Placeholder height="20px" width="120px" />
							</span>
						</div>

						<div className={styles.lower_info} style={{ marginLeft: '36px' }}>
							<div style={{ marginRight: '8px' }}>
								Last Edit By
								{' '}
								:
								{' '}
							</div>
							<Placeholder height="20px" width="120px" />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.config_basic_details}>
				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						Currently Editing :
						{' '}
					</div>
					<b>Saved Draft</b>
				</div>
				<div className={styles.lower_details}>
					<div className={styles.lower_info} style={{ marginRight: '8px' }}>
						<div>
							Last Modified
							{' '}
							:
						</div>
						<span>
							{ (format(audit_data?.updated_at, 'dd-MM-YYYY') || '--')}
						</span>
					</div>

					<div className={styles.lower_info} style={{ marginLeft: '36px' }}>
						<div style={{ marginRight: '8px' }}>
							Last Edit By
							{' '}
							:
							{' '}
						</div>
						<b>{startCase(audit_data?.name || '----')}</b>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
