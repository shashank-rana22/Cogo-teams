// import { Button } from '@cogoport/components';
import { Placeholder } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header(props) {
	const { audit_data, levelLoading } = props;
	return (
		<div className={styles.container}>
			<div className={styles.config_basic_details}>

				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						Currently Editing :
						{' '}
					</div>
					{!levelLoading ? (<b>Saved Draft</b>)
						: (<Placeholder height="20px" width="120px" />)}

				</div>

				<div className={styles.lower_details}>

					<div style={{ marginRight: '8px' }}>
						Last Modified
						{' '}
						:
					</div>
					{!levelLoading ? (format(audit_data?.updated_at, 'dd-MM-YYYY') || '___')
						: (<Placeholder height="20px" width="120px" />)}

					<div style={{ marginLeft: '36px', display: 'flex' }}>

						<div style={{ marginRight: '8px' }}>
							Last Edit By
							{' '}
							:
							{' '}
						</div>

						{!levelLoading ? (<b>{startCase(audit_data?.name || '___')}</b>)
							: (<Placeholder height="20px" width="120px" />)}

					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
