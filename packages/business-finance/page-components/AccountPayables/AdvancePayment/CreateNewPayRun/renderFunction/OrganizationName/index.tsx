import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function OrganizationName({ itemData }) {
	const { advanceDocumentSellerAddress, organizationName:businessName } = itemData || {};
	const { organizationName } = advanceDocumentSellerAddress || {};
	return (
		<div className={styles.container}>
			{businessName?.length || organizationName?.length > 20
				? (
					<Tooltip
						interactive
						placement="top"
						content={businessName || organizationName}
					>
						<text>

							{`${(businessName || organizationName).substring(
								0,
								20,
							)}...`}

						</text>
					</Tooltip>
				) : businessName || organizationName}
		</div>

	);
}

export default OrganizationName;
