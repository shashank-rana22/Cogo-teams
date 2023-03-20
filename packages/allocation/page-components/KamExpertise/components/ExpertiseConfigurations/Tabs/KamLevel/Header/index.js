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
						<div style={{ marginRight: '8px' }}>
							Last Modified
							{' '}
							:
						</div>
						<Placeholder height="20px" width="120px" />
						<div style={{ marginLeft: '36px', display: 'flex' }}>
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
					<div style={{ marginRight: '8px' }}>
						Last Modified
						{' '}
						:
					</div>
					{ (format(audit_data?.updated_at, 'dd-MM-YYYY') || '--')}
					<div style={{ marginLeft: '36px', display: 'flex' }}>
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
