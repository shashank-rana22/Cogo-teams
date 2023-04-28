import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ModifiedName({ itemData }) {
	const { organizationName } = itemData || {};
	return (
		<div className={styles.container}>
			{ organizationName?.length > 20
				? (
					<Tooltip
						interactive
						placement="top"
						content={organizationName}
					>
						<text>

							{`${(organizationName).substring(
								0,
								20,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default ModifiedName;
