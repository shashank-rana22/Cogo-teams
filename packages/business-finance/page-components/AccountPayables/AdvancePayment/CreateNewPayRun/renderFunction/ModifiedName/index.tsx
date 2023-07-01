import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	organizationName:string,
}

interface PropsType {
	itemData:ItemTypes,
}
const ORGANIZATION_NAME_LENGTH = 16;
const SUBSTRING_END_LENGTH = 16;
function ModifiedName({ itemData }:PropsType) {
	const { organizationName = '' } = itemData || {};
	const nameLength = organizationName.length > ORGANIZATION_NAME_LENGTH;
	return (
		<div className={styles.container}>
			{ nameLength
				? (
					<Tooltip
						interactive
						placement="top"
						content={organizationName}
					>
						<text>

							{`${(organizationName).substring(
								0,
								SUBSTRING_END_LENGTH,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default ModifiedName;
