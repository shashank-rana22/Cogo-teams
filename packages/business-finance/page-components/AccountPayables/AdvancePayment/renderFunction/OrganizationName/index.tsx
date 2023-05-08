import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface OrganizationTypes {
	organizationName:string,
}

interface PropsType {
	advanceDocumentSellerAddress:OrganizationTypes,
}

interface ItemPropsType {
	itemData:PropsType
}

function OrganizationName({ itemData }:ItemPropsType) {
	const { advanceDocumentSellerAddress } = itemData || {};
	const { organizationName = '' } = advanceDocumentSellerAddress || {};
	const nameLength = organizationName.length > 20;
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
								20,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default OrganizationName;
