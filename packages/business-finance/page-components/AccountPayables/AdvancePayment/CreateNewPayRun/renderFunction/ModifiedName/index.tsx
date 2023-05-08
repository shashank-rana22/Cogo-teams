import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	organizationName:string,
}

interface PropsType {
	itemData:ItemTypes,
}

function ModifiedName({ itemData }:PropsType) {
	const { organizationName = '' } = itemData || {};
	const nameLength = organizationName.length > 20;
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
								20,
							)}...`}

						</text>
					</Tooltip>
				) : organizationName}
		</div>

	);
}

export default ModifiedName;
