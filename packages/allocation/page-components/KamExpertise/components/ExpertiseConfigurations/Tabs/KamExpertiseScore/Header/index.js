import { Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ auditData, loading }) {
	const { name, updated_at } = auditData;

	return (
		<div className={styles.container}>
			<div className={styles.config_basic_details}>
				<div className={styles.draft_name}>
					Currently Editing :
				&nbsp;
					{loading ? <Placeholder height="20px" width="120px" /> : <b>Saved Draft</b> }
				</div>

				<div className={styles.lower_details}>
					<div className={styles.last_modified}>
						Last Modified:
						&nbsp;
						{loading ? <Placeholder height="20px" width="120px" /> : format(updated_at, 'dd-MM-YYYY')}
					</div>

					<div className={styles.last_edit}>
						Last Edit By:
						&nbsp;
						{loading ? <Placeholder height="20px" width="120px" /> : <b>{startCase(name)}</b>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
