import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CompanyName({ itemdata }) {
	const { data } = itemdata || {};
	const { organization } = data || {};
	const { businessName } = organization || {};
	const varlength = 20;
	return (
		<div className={styles.container}>
			{businessName?.length > varlength ? (
				<Tooltip interactive theme="light" placement="top" content={businessName}>
					<div>{`${businessName.substring(0, varlength)}...`}</div>
				</Tooltip>
			) : (
				<div>{businessName}</div>
			)}
		</div>
	);
}

export default CompanyName;
