import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ORGANIZATION_NAME_LENGTH = 16;
const SUBSTRING_END_LENGNTH = 16;

function OrganizationName({ itemData }) {
	const { advanceDocumentSellerAddress } = itemData || {};
	const { organizationName = '' } = advanceDocumentSellerAddress || {};
	const nameLength = organizationName.length > ORGANIZATION_NAME_LENGTH;
	return (
		<div className={styles.container}>
			{nameLength
				? (
					<Tooltip
						interactive
						placement="top"
						content={organizationName}
					>
						<text>

							{`${organizationName.substring(
								0,
								SUBSTRING_END_LENGNTH,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default OrganizationName;
