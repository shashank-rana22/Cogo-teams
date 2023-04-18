import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function OrganizationName({ itemData }) {
	const { organizationName } = itemData || {};
	return (
		<div className={styles.container}>
			{organizationName?.length > 22
				? (
					<Tooltip
						placement="top"
						content={organizationName}
					>
						<text>

							{`${organizationName.substring(
								0,
								22,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default OrganizationName;
