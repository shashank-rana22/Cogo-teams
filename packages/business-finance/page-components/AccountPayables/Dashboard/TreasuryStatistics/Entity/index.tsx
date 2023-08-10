import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	entityCode:string;
}
function Entity({ entityCode }:ItemProps) {
	const { icon : Icon } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{entityCode === 'all' ? 'ALL'
					: (
						<>
							Entity
							{entityCode}
						</>
					)}
			</div>
			<Icon height={20} width={20} />
		</div>
	);
}

export default Entity;
