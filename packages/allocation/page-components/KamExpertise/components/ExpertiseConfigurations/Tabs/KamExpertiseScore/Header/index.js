import { Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ auditData, loading }) {
	const { name, updated_at } = auditData;

	if (loading) {
		return (
			<div className={styles.main_container}>
				<div className={styles.config_basic_detail}>
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
		<div className={styles.main_container}>
			<div className={styles.config_basic_detail}>
				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						Currently Editing :
						{' '}
					</div>
					<b>Saved Draft</b>
				</div>
				<div className={styles.lower_details}>
					<div className={styles.lower_info}>
						<div>
							Last Modified
							{' '}
							:&nbsp;
						</div>
						<span>
							{ (format(updated_at, 'dd-MM-YYYY') || '--')}
						</span>

					</div>
					<div className={styles.lower_info} style={{ marginLeft: '36px' }}>
						<div>
							Last Edit By
							{' '}
							:
							{' '}
						</div>

						<b>{startCase(name || '----')}</b>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
