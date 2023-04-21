import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function OrganizationName({ itemData }) {
	const { advanceDocumentSellerAddress } = itemData || {};
	const { organizationName } = advanceDocumentSellerAddress || {};
	return (
		<div className={styles.container}>
			{organizationName?.length > 20
				? (
					<Tooltip
						placement="top"
						content={organizationName}
					>
						<text>

							{`${organizationName.substring(
								0,
								20,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default OrganizationName;
