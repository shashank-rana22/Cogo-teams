import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function OrganizationName({ itemData }) {
	const { businessName } = itemData || {};
	return (
		<div className={styles.container}>
			{businessName?.length > 30
				? (
					<Tooltip
						placement="top"
						content={businessName}
					>
						<text>

							{`${businessName.substring(
								0,
								30,
							)}...`}

						</text>
					</Tooltip>
				) : businessName}
		</div>

	);
}

export default OrganizationName;
