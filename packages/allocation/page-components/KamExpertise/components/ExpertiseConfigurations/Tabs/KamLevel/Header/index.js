import { Placeholder } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header(props) {
	const { auditData, levelLoading } = props;

	if (levelLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.config_basic_details}>
					<div className={styles.draft_name}>
						<div className={styles.audit_label}>
							Currently Editing :
							{' '}
						</div>
						<Placeholder height="20px" width="120px" />
					</div>
					<div className={styles.lower_details}>
						<div className={styles.lower_info}>
							<div>
								Last Modified
								{' '}
								:
							</div>
							<span>
								<Placeholder height="20px" width="120px" />
							</span>
						</div>

						<div className={styles.lower_info}>
							<div className={styles.audit_label}>
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
					<div className={styles.audit_label}>
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
							:
						</div>
						<span>
							{ auditData?.updated_at ? format(auditData?.updated_at, 'dd-MM-YYYY') : ''}
						</span>
					</div>

					<div className={styles.lower_info}>
						<div className={styles.audit_label}>
							Last Edit By
							{' '}
							:
							{' '}
						</div>
						<b>{startCase(auditData.name || '')}</b>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
